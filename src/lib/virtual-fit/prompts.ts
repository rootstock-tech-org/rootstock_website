import type { GarmentProfile } from './garment-analyzer';
import type { ValidSize } from './config';
import { SIZE_BODY_PROFILES } from './config';

export function buildTryOnPrompt(profile: GarmentProfile, size: ValidSize): string {
    const body = SIZE_BODY_PROFILES[size];

    let categoryInstructions = '';
    if (profile.category === 'indian_traditional') {
        categoryInstructions = `
INDIAN TRADITIONAL GARMENT — SPECIAL INSTRUCTIONS:
- This is a complex multi-piece Indian outfit. Each piece must be reproduced with care.
- Reproduce ALL embellishments exactly: mirror work, zari embroidery, sequins, beadwork, thread work.
- Match the exact draping style: dupatta placement, pallu fall, pleating pattern.
- Preserve intricate border patterns and their exact width, color, and motif.
- Traditional silhouettes matter: lehenga flare, anarkali flow, saree drape must be authentic.
- Pay close attention to the neckline design, sleeve style, and blouse construction.
`;
    } else if (profile.category === 'fusion') {
        categoryInstructions = `
FUSION GARMENT — SPECIAL INSTRUCTIONS:
- This blends traditional and modern elements. Preserve both aspects accurately.
- Reproduce any traditional embellishment (embroidery, prints) on modern silhouettes precisely.
`;
    }

    return `VIRTUAL CLOTHING TRY-ON

Dress the model in Image 1 with the garment shown in Image 2.

IMAGE 1 (TARGET MODEL): A ${body.summary} woman currently wearing black athletic wear.
- Preserve her EXACT face, skin tone, and body proportions
- Her body type: ${body.detail}
- Her current black clothes must be completely removed and replaced
- DO NOT alter her body shape or proportions in any way

IMAGE 2 (GARMENT REFERENCE): Shows a ${profile.garment_type}
- IGNORE the person in this image entirely — only use the clothing
- Copy the garment design: ${profile.description}

KEY GARMENT FEATURES TO REPRODUCE EXACTLY:
${profile.key_identifiers}

COLOR REQUIREMENTS:
${profile.color_palette}

CONSTRUCTION:
${profile.construction_details}
${categoryInstructions}
OUTPUT REQUIREMENTS:
- Single professional fashion photograph
- EXACTLY one person: the model from Image 1
- She is now wearing the garment from Image 2
- Clean beige/cream studio background
- Full-length standing pose
- ${body.fit_note}

CRITICAL — BODY PROPORTIONS:
The model's ${body.summary} body build MUST be clearly visible in the final image.
Her ${body.detail} must be preserved exactly as shown in Image 1.
DO NOT change her body size, shape, or proportions.

DO NOT:
- Show two people
- Show anyone in black athletic wear
- Create a side-by-side or before/after layout
- Alter the model's body proportions`;
}
