import type { GoogleGenAI } from '@google/genai';
import { ANALYSIS_MODEL } from './config';

export interface GarmentProfile {
    garment_type: string;
    category: string;
    description: string;
    color_palette: string;
    key_identifiers: string;
    construction_details: string;
    success: boolean;
    error_message?: string;
}

const ANALYSIS_PROMPT = `Analyze this clothing image. Describe ONLY the garment(s), completely ignoring any person wearing them.

Answer each section precisely:

1. GARMENT_TYPE: What is this item? (e.g., lehenga set, t-shirt, blazer, jeans, saree, cocktail dress, kurta, gown, suit)

2. CATEGORY: Choose exactly one: indian_traditional | western_casual | western_formal | activewear | fusion

3. CONSTRUCTION: How many pieces? Describe each piece's cut and structure.
   Example: "3-piece set: sweetheart-neck fitted blouse, A-line flared floor-length skirt, sheer dupatta with tassels"

4. COLORS: List ALL colors with exact shades.
   Example: "Primary: champagne gold. Secondary: sage green accents, silver mirror work highlights"

5. KEY_IDENTIFIERS: List the 3-4 most distinctive visual features that make this garment recognizable.
   Example: "1) Dense circular mirror work on bodice 2) Geometric brocade weave on skirt 3) Mint-green tassels on dupatta corners 4) Gold border trim"

6. FULL_DESCRIPTION: Write a 2-3 sentence catalog description capturing the complete look, suitable for reproducing this garment in image generation. Be extremely specific about colors, patterns, and embellishments.

Respond in this EXACT format (use the labels):
GARMENT_TYPE: ...
CATEGORY: ...
CONSTRUCTION: ...
COLORS: ...
KEY_IDENTIFIERS: ...
FULL_DESCRIPTION: ...`;

function parseAnalysis(text: string): GarmentProfile {
    const fields: Record<string, string> = {};
    let currentKey: string | null = null;
    const valueLines: string[] = [];

    const keys = [
        'GARMENT_TYPE',
        'CATEGORY',
        'CONSTRUCTION',
        'COLORS',
        'KEY_IDENTIFIERS',
        'FULL_DESCRIPTION',
    ] as const;

    for (const line of text.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        let matched = false;
        for (const key of keys) {
            const prefix = `${key}:`;
            if (trimmed.toUpperCase().startsWith(prefix)) {
                if (currentKey) {
                    fields[currentKey] = valueLines.join(' ').trim();
                }
                currentKey = key;
                valueLines.length = 0;
                valueLines.push(trimmed.slice(prefix.length).trim());
                matched = true;
                break;
            }
        }
        if (!matched && currentKey) {
            valueLines.push(trimmed);
        }
    }
    if (currentKey) {
        fields[currentKey] = valueLines.join(' ').trim();
    }

    let garment_type = fields.GARMENT_TYPE || 'clothing item';
    let description = fields.FULL_DESCRIPTION || '';
    if (!description) {
        description = text.slice(0, 500);
    }

    return {
        garment_type,
        category: fields.CATEGORY || 'unknown',
        description,
        color_palette: fields.COLORS || '',
        key_identifiers: fields.KEY_IDENTIFIERS || '',
        construction_details: fields.CONSTRUCTION || '',
        success: true,
    };
}

export async function analyzeGarment(
    ai: GoogleGenAI,
    imageBytes: Buffer,
    mimeType: string
): Promise<GarmentProfile> {
    try {
        const b64 = imageBytes.toString('base64');
        const response = await ai.models.generateContent({
            model: ANALYSIS_MODEL,
            contents: [
                ANALYSIS_PROMPT,
                {
                    inlineData: {
                        mimeType: mimeType || 'image/jpeg',
                        data: b64,
                    },
                },
            ],
            config: {
                httpOptions: { timeout: 120_000 },
            },
        });
        const text = (response.text ?? '').trim();
        return parseAnalysis(text);
    } catch (e) {
        return {
            garment_type: 'clothing item',
            category: 'unknown',
            description: 'A clothing item',
            color_palette: 'unknown',
            key_identifiers: 'unknown',
            construction_details: 'unknown',
            success: false,
            error_message: e instanceof Error ? e.message : String(e),
        };
    }
}
