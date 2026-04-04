import type { GoogleGenAI } from '@google/genai';
import { HarmBlockThreshold, HarmCategory } from '@google/genai';
import {
    GENERATION_MODEL,
    GENERATION_MODEL_FALLBACK,
    MAX_GENERATION_RETRIES,
    RETRY_BASE_DELAY_SEC,
    type ValidSize,
} from './config';
import type { GarmentProfile } from './garment-analyzer';
import { buildTryOnPrompt } from './prompts';
import { validateImage, type ValidationResult } from './validator';

function sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}

function isCapacityOrOverloadError(err: unknown): boolean {
    const s = String(err).toLowerCase();
    return [
        '503',
        '504',
        '429',
        'unavailable',
        'resource exhausted',
        'resource_exhausted',
        'high demand',
        'over capacity',
        'overloaded',
        'too many requests',
        'try again later',
        'deadline exceeded',
    ].some((x) => s.includes(x));
}

type GenContentResponse = Awaited<ReturnType<GoogleGenAI['models']['generateContent']>>;

function extractImageBytes(response: GenContentResponse): Buffer | null {
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) return null;
    for (const part of parts) {
        const data = part.inlineData?.data;
        if (data) {
            return Buffer.from(data, 'base64');
        }
    }
    return null;
}

const safetySettings = [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
];

async function generateTryOnOnce(
    ai: GoogleGenAI,
    modelId: string,
    prompt: string,
    modelImageB64: string,
    modelMime: string,
    garmentImageB64: string,
    garmentMime: string
): Promise<GenContentResponse> {
    return ai.models.generateContent({
        model: modelId,
        contents: [
            prompt,
            { inlineData: { mimeType: modelMime, data: modelImageB64 } },
            { inlineData: { mimeType: garmentMime, data: garmentImageB64 } },
        ],
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
            safetySettings,
            httpOptions: { timeout: 600_000 },
        },
    });
}

async function generateWithFallback(
    ai: GoogleGenAI,
    prompt: string,
    modelImageB64: string,
    modelMime: string,
    garmentImageB64: string,
    garmentMime: string
): Promise<GenContentResponse> {
    try {
        return await generateTryOnOnce(
            ai,
            GENERATION_MODEL,
            prompt,
            modelImageB64,
            modelMime,
            garmentImageB64,
            garmentMime
        );
    } catch (e) {
        if (
            GENERATION_MODEL_FALLBACK &&
            GENERATION_MODEL_FALLBACK !== GENERATION_MODEL &&
            isCapacityOrOverloadError(e)
        ) {
            return generateTryOnOnce(
                ai,
                GENERATION_MODEL_FALLBACK,
                prompt,
                modelImageB64,
                modelMime,
                garmentImageB64,
                garmentMime
            );
        }
        throw e;
    }
}

export interface GenerateForSizeResult {
    image: Buffer | null;
    validation: ValidationResult | null;
}

export async function generateForSize(
    ai: GoogleGenAI,
    garmentProfile: GarmentProfile,
    modelImageBytes: Buffer,
    modelMime: string,
    garmentImageBytes: Buffer,
    garmentMime: string,
    size: ValidSize,
    options: { validate: boolean; checkBody: boolean }
): Promise<GenerateForSizeResult> {
    const modelB64 = modelImageBytes.toString('base64');
    const garmentB64 = garmentImageBytes.toString('base64');

    let bestImage: Buffer | null = null;
    let bestResult: ValidationResult | null = null;
    let bestHasGarment = false;
    let lastError: unknown;

    for (let attempt = 0; attempt < MAX_GENERATION_RETRIES; attempt++) {
        const prompt = buildTryOnPrompt(garmentProfile, size);
        try {
            const response = await generateWithFallback(
                ai,
                prompt,
                modelB64,
                modelMime,
                garmentB64,
                garmentMime
            );

            if (!response.candidates?.length) {
                continue;
            }

            const imageData = extractImageBytes(response);
            if (!imageData) {
                continue;
            }

            if (!options.validate) {
                return { image: imageData, validation: null };
            }

            const result = await validateImage(ai, imageData, garmentProfile, size, options.checkBody);
            if (result.is_valid) {
                return { image: imageData, validation: result };
            }

            const hasGarment = result.garment_ok;
            if (bestImage === null || (hasGarment && !bestHasGarment)) {
                bestImage = imageData;
                bestResult = result;
                bestHasGarment = hasGarment;
            }
        } catch (e) {
            lastError = e;
            const delay = RETRY_BASE_DELAY_SEC * 1000 * 2 ** attempt;
            await sleep(delay);
        }
    }

    if (bestImage) {
        return { image: bestImage, validation: bestResult };
    }

    if (lastError) throw lastError;
    throw new Error(`All ${MAX_GENERATION_RETRIES} generate attempts failed`);
}
