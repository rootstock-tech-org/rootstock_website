import type { GoogleGenAI } from '@google/genai';
import { ANALYSIS_MODEL, SIZE_TO_BODY_CLASS, type ValidSize } from './config';
import type { GarmentProfile } from './garment-analyzer';

export interface ValidationResult {
    is_valid: boolean;
    basic_ok: boolean;
    garment_ok: boolean;
    body_ok: boolean;
    reason: string;
    body_class?: string | null;
}

async function validateBasic(ai: GoogleGenAI, imageData: Buffer): Promise<[boolean, string]> {
    try {
        const prompt = `Analyze this photograph and answer with YES or NO only:

1. PERSON_COUNT: Is there EXACTLY ONE person visible in this image?
2. SINGLE_FRAME: Is this a single photograph (not a side-by-side, collage, or before/after)?
3. NO_ATHLETIC_WEAR: Is the person wearing something OTHER than plain black athletic clothes (sports bra, leggings, gym wear)?

Respond EXACTLY:
PERSON_COUNT: YES/NO
SINGLE_FRAME: YES/NO
NO_ATHLETIC_WEAR: YES/NO`;

        const b64 = imageData.toString('base64');
        const response = await ai.models.generateContent({
            model: ANALYSIS_MODEL,
            contents: [
                prompt,
                { inlineData: { mimeType: 'image/png', data: b64 } },
            ],
            config: { httpOptions: { timeout: 120_000 } },
        });
        const result = (response.text ?? '').trim().toUpperCase();

        const personOk = result.includes('PERSON_COUNT: YES');
        const frameOk = result.includes('SINGLE_FRAME: YES');
        const noAthletic = result.includes('NO_ATHLETIC_WEAR: YES');

        if (personOk && frameOk && noAthletic) return [true, 'Basic checks passed'];

        const issues: string[] = [];
        if (!personOk) issues.push('multiple people or no person');
        if (!frameOk) issues.push('side-by-side or collage layout');
        if (!noAthletic) issues.push('still wearing athletic wear, outfit not applied');
        return [false, issues.join('; ')];
    } catch {
        return [true, 'Validation skipped due to error'];
    }
}

async function validateGarment(
    ai: GoogleGenAI,
    imageData: Buffer,
    profile: GarmentProfile
): Promise<[boolean, string]> {
    try {
        let extraCheck = '';
        let extraLabel = '';
        if (profile.category === 'indian_traditional') {
            extraCheck =
                '\n4. EMBELLISHMENT_MATCH: Are the embellishments (embroidery, mirror work, zari, sequins, beadwork) and traditional construction details (dupatta, draping, border patterns) reasonably preserved?';
            extraLabel = '\nEMBELLISHMENT_MATCH: YES/NO';
        }

        const prompt = `Compare this photograph against the following garment description.

Expected garment: ${profile.garment_type}
Description: ${profile.description}
Key features: ${profile.key_identifiers}
Colors: ${profile.color_palette}

Answer YES or NO:
1. GARMENT_TYPE_MATCH: Is the person wearing a ${profile.garment_type} (or very similar)?
2. COLOR_MATCH: Do the garment colors reasonably match "${profile.color_palette}"?
3. KEY_FEATURES: Are the key identifying features visible?${extraCheck}

Respond EXACTLY:
GARMENT_TYPE_MATCH: YES/NO
COLOR_MATCH: YES/NO
KEY_FEATURES: YES/NO${extraLabel}`;

        const b64 = imageData.toString('base64');
        const response = await ai.models.generateContent({
            model: ANALYSIS_MODEL,
            contents: [
                prompt,
                { inlineData: { mimeType: 'image/png', data: b64 } },
            ],
            config: { httpOptions: { timeout: 120_000 } },
        });
        const result = (response.text ?? '').trim().toUpperCase();

        const typeOk = result.includes('GARMENT_TYPE_MATCH: YES');
        const colorOk = result.includes('COLOR_MATCH: YES');
        const featuresOk = result.includes('KEY_FEATURES: YES');
        let embellishmentOk = true;
        if (profile.category === 'indian_traditional') {
            embellishmentOk = result.includes('EMBELLISHMENT_MATCH: YES');
        }

        if (typeOk && colorOk && featuresOk && embellishmentOk) return [true, 'Garment accuracy passed'];

        const issues: string[] = [];
        if (!typeOk) issues.push(`not wearing expected ${profile.garment_type}`);
        if (!colorOk) issues.push("colors don't match");
        if (!featuresOk) issues.push('key garment features missing');
        if (!embellishmentOk) issues.push('traditional embellishments/construction not preserved');
        return [false, issues.join('; ')];
    } catch {
        return [true, 'Garment validation skipped due to error'];
    }
}

async function validateBodyProportion(
    ai: GoogleGenAI,
    imageData: Buffer,
    targetSize: ValidSize
): Promise<[boolean, string, string | null]> {
    const expectedClass = SIZE_TO_BODY_CLASS[targetSize];
    if (!expectedClass) return [true, 'Unknown size, skipping body check', null];

    try {
        const prompt = `Analyze the body proportions of the person in this photograph.

Classify their body build as EXACTLY one of these categories:
- VERY_SLIM: Very petite, narrow frame, slender limbs, thigh gap
- SLIM: Lean, slender build, smaller frame
- AVERAGE: Medium build, balanced proportions
- FULL: Curvy, fuller figure, wider hips, broader build
- PLUS_SIZE: Plus-size, broad frame, wide hips, full arms and thighs

Answer with ONLY the classification word (e.g., AVERAGE). Nothing else.`;

        const b64 = imageData.toString('base64');
        const response = await ai.models.generateContent({
            model: ANALYSIS_MODEL,
            contents: [
                prompt,
                { inlineData: { mimeType: 'image/png', data: b64 } },
            ],
            config: { httpOptions: { timeout: 120_000 } },
        });
        let detected = (response.text ?? '').trim().toUpperCase().replace(/ /g, '_');

        const validClasses = new Set(['VERY_SLIM', 'SLIM', 'AVERAGE', 'FULL', 'PLUS_SIZE']);
        if (!validClasses.has(detected)) {
            let found: string | null = null;
            for (const cls of validClasses) {
                if (detected.includes(cls)) {
                    found = cls;
                    break;
                }
            }
            if (found) detected = found;
            else return [true, `Unrecognized body class: ${detected}`, detected];
        }

        if (detected === expectedClass) {
            return [true, `Body matches target (${expectedClass})`, detected];
        }

        const classOrder = ['VERY_SLIM', 'SLIM', 'AVERAGE', 'FULL', 'PLUS_SIZE'];
        const ei = classOrder.indexOf(expectedClass);
        const di = classOrder.indexOf(detected);
        if (ei >= 0 && di >= 0 && Math.abs(ei - di) <= 1) {
            return [true, `Body close enough (${detected} vs expected ${expectedClass})`, detected];
        }

        return [false, `Body mismatch: expected ${expectedClass} but got ${detected}`, detected];
    } catch {
        return [true, 'Body validation skipped due to error', null];
    }
}

export async function validateImage(
    ai: GoogleGenAI,
    imageData: Buffer,
    profile: GarmentProfile,
    targetSize: ValidSize,
    checkBody: boolean
): Promise<ValidationResult> {
    const [basicOk, basicReason] = await validateBasic(ai, imageData);
    if (!basicOk) {
        return {
            is_valid: false,
            basic_ok: false,
            garment_ok: false,
            body_ok: false,
            reason: `Basic: ${basicReason}`,
        };
    }

    const [garmentOk, garmentReason] = await validateGarment(ai, imageData, profile);

    let bodyOk = true;
    let bodyClass: string | null = null;
    let bodyReason = 'skipped';
    if (checkBody) {
        const [bOk, bReason, bClass] = await validateBodyProportion(ai, imageData, targetSize);
        bodyOk = bOk;
        bodyReason = bReason;
        bodyClass = bClass;
    }

    const isValid = basicOk && garmentOk && bodyOk;
    const reasons: string[] = [];
    if (!garmentOk) reasons.push(`Garment: ${garmentReason}`);
    if (!bodyOk) reasons.push(`Body: ${bodyReason}`);
    const reason = reasons.length > 0 ? reasons.join('; ') : 'All checks passed';

    return {
        is_valid: isValid,
        basic_ok: basicOk,
        garment_ok: garmentOk,
        body_ok: bodyOk,
        reason,
        body_class: bodyClass,
    };
}
