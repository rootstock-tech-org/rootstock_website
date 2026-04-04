import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { existsSync } from 'fs';
import { join } from 'path';

import { analyzeGarment } from '@/lib/virtual-fit/garment-analyzer';
import { generateForSize } from '@/lib/virtual-fit/generate';
import { loadModelImageForSize } from '@/lib/virtual-fit/model-asset';
import {
    MAX_FILE_SIZE_MB,
    normalizeSize,
    VALID_SIZES,
    type ValidSize,
} from '@/lib/virtual-fit/config';

export const runtime = 'nodejs';
/** Long-running Gemini + optional validation; increase on Vercel Pro. */
export const maxDuration = 300;

function jsonError(message: string, status: number) {
    return NextResponse.json({ error: message }, { status });
}

function createGenAI(): GoogleGenAI | null {
    const key = process.env.GEMINI_API_KEY;
    if (!key) return null;
    return new GoogleGenAI({ apiKey: key });
}

export async function POST(request: Request) {
    const ai = createGenAI();
    if (!ai) {
        return jsonError(
            'GEMINI_API_KEY is not set. Add it in .env.local (local) or Vercel project settings.',
            503
        );
    }

    let form: FormData;
    try {
        form = await request.formData();
    } catch {
        return jsonError('Invalid form data', 400);
    }

    const sizeRaw = form.get('size');
    const garmentField = form.get('garment_image');

    if (typeof sizeRaw !== 'string' || !sizeRaw.trim()) {
        return jsonError('Missing size', 400);
    }

    const normalized = normalizeSize(sizeRaw.trim());
    if (!normalized) {
        return jsonError(`Invalid size. Use one of: ${VALID_SIZES.join(', ')}`, 400);
    }
    const size: ValidSize = normalized;

    if (!garmentField || typeof garmentField === 'string') {
        return jsonError('Missing garment_image file', 400);
    }

    const garmentFile = garmentField as File;
    const ab = await garmentFile.arrayBuffer();
    const garmentBytes = Buffer.from(ab);

    if (garmentBytes.length > MAX_FILE_SIZE_MB * 1024 * 1024) {
        return jsonError(`File too large (max ${MAX_FILE_SIZE_MB}MB)`, 400);
    }

    const garmentMime = garmentFile.type || 'image/jpeg';

    const model = loadModelImageForSize(size);
    if (!model) {
        const dirHint = join(process.cwd(), 'public', 'tryon-models');
        return jsonError(
            `No model image found for size ${size}. Add ${size}.png or ${size}.jpg under ${dirHint} (same idea as tryon_api/assets/models).`,
            404
        );
    }

    /** Opt-in: full 3-stage validation like tryon_api (extra latency + Gemini calls). */
    const validate = process.env.TRYON_ENABLE_VALIDATION === '1';
    const checkBody = process.env.TRYON_VALIDATE_BODY !== '0';

    try {
        const profile = await analyzeGarment(ai, garmentBytes, garmentMime);

        const { image, validation } = await generateForSize(
            ai,
            profile,
            model.buffer,
            model.mime,
            garmentBytes,
            garmentMime,
            size,
            { validate, checkBody }
        );

        if (!image?.length) {
            return jsonError('Generation failed after retries', 500);
        }

        return new NextResponse(new Uint8Array(image), {
            status: 200,
            headers: {
                'Content-Type': 'image/png',
                ...(validation && {
                    'X-TryOn-Validation': validation.is_valid ? 'pass' : 'best-effort',
                }),
            },
        });
    } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return jsonError(msg.slice(0, 2000), 500);
    }
}

export async function GET() {
    const keyOk = Boolean(process.env.GEMINI_API_KEY);
    const modelsDir = join(process.cwd(), 'public', 'tryon-models');
    const sample = join(modelsDir, 'M.png');
    const hasModelsDir = existsSync(modelsDir);
    return NextResponse.json({
        status: 'ok',
        service: 'virtual-fit',
        gemini_configured: keyOk,
        tryon_models_dir: modelsDir,
        example_model_present: existsSync(sample),
    });
}
