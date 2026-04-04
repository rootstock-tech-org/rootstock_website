/** Mirrors tryon_api/config.py (subset used by size-based try-on). */

export const GENERATION_MODEL = 'gemini-3-pro-image-preview';
export const GENERATION_MODEL_FALLBACK = 'gemini-3.1-flash-image-preview';
export const ANALYSIS_MODEL = 'gemini-2.5-flash';

export const MAX_GENERATION_RETRIES = 4;
export const RETRY_BASE_DELAY_SEC = 1;

export const VALID_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;
export type ValidSize = (typeof VALID_SIZES)[number];

const SIZE_MAPPING: Record<string, ValidSize> = {
    'X-SMALL': 'XS',
    'EXTRA SMALL': 'XS',
    SXXS: 'XS',
    SMALL: 'S',
    MEDIUM: 'M',
    LARGE: 'L',
    'X-LARGE': 'XL',
    'EXTRA LARGE': 'XL',
    'XX-LARGE': 'XXL',
    '2XL': 'XXL',
    '3XL': 'XXXL',
    '4XL': 'XXXL',
    '34': 'XS',
    '36': 'S',
    '38': 'M',
    '40': 'L',
    '42': 'XL',
    '44': 'XXL',
    '46': 'XXXL',
    '48': 'XXXL',
};

export function normalizeSize(sizeStr: string): ValidSize | null {
    if (!sizeStr?.trim()) return null;
    const text = sizeStr.trim().toUpperCase();

    if (VALID_SIZES.includes(text as ValidSize)) return text as ValidSize;
    if (SIZE_MAPPING[text]) return SIZE_MAPPING[text];

    for (const vs of [...VALID_SIZES].sort((a, b) => b.length - a.length)) {
        const re = new RegExp(`\\b${vs.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`);
        if (re.test(text)) return vs;
    }

    const sortedAliases = Object.entries(SIZE_MAPPING).sort((a, b) => b[0].length - a[0].length);
    for (const [alias, canonical] of sortedAliases) {
        if (!/^\d+$/.test(alias)) {
            const re = new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            if (re.test(text)) return canonical;
        }
    }

    for (const [alias, canonical] of sortedAliases) {
        if (/^\d+$/.test(alias)) {
            const re = new RegExp(`\\b${alias}\\b`);
            if (re.test(text)) return canonical;
        }
    }

    for (const vs of [...VALID_SIZES].sort((a, b) => b.length - a.length)) {
        if (text.includes(vs)) return vs;
    }

    return null;
}

export const SIZE_BODY_PROFILES: Record<
    ValidSize,
    { summary: string; detail: string; fit_note: string }
> = {
    XS: {
        summary: 'very petite and slim',
        detail: 'narrow shoulders, slim arms, flat torso, narrow hips, slender legs, thigh gap visible, very small frame overall',
        fit_note: 'The garment should appear slightly loose or flowing on this very small frame.',
    },
    S: {
        summary: 'slim and slender',
        detail: 'narrow-to-moderate shoulders, slim arms, lean torso, moderate hips, slender legs, small frame',
        fit_note: 'The garment should fit snugly on a lean frame.',
    },
    M: {
        summary: 'medium and balanced',
        detail: 'moderate shoulders, average arms, balanced torso, proportionate hips, average legs, standard frame',
        fit_note: 'The garment should fit as standard sizing.',
    },
    L: {
        summary: 'full-figured and curvy',
        detail: 'broader shoulders, fuller arms, wider torso, wide hips, fuller thighs, visibly curvy silhouette',
        fit_note: 'The garment should stretch and conform to a fuller, curvier figure.',
    },
    XL: {
        summary: 'plus-size and broad',
        detail: 'broad shoulders, full arms, wide torso, very wide hips, full thighs, large frame, significantly wider silhouette than medium',
        fit_note: 'The garment should accommodate a substantially larger, plus-size frame.',
    },
    XXL: {
        summary: 'plus-size, very broad build',
        detail: 'very broad shoulders, heavy arms, wide torso, very wide hips, full thighs, very large frame',
        fit_note: 'The garment should accommodate a very large, full-figured frame.',
    },
    XXXL: {
        summary: 'plus-size, largest frame',
        detail: 'very broad shoulders, heavy arms, very wide torso, very wide hips, full thighs, largest frame',
        fit_note: 'The garment should accommodate the largest body frame.',
    },
};

export const SIZE_TO_BODY_CLASS: Record<ValidSize, string> = {
    XS: 'VERY_SLIM',
    S: 'SLIM',
    M: 'AVERAGE',
    L: 'FULL',
    XL: 'PLUS_SIZE',
    XXL: 'PLUS_SIZE',
    XXXL: 'PLUS_SIZE',
};

export const MAX_FILE_SIZE_MB = 20;
export const MAX_IMAGE_DIMENSION = 8000;
export const MIN_IMAGE_DIMENSION = 100;
