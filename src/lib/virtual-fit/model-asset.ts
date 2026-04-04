import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import type { ValidSize } from './config';

/**
 * Size-matched model photos live under `public/tryon-models/` (e.g. `M.png`, `XL.jpg`).
 * Same role as `tryon_api/assets/models/`.
 */
export function loadModelImageForSize(size: ValidSize): { buffer: Buffer; mime: string } | null {
    const dir = join(process.cwd(), 'public', 'tryon-models');
    const variants: [string, string][] = [
        [`${size}.png`, 'image/png'],
        [`${size}.jpg`, 'image/jpeg'],
        [`${size}.jpeg`, 'image/jpeg'],
        [`${size.toLowerCase()}.png`, 'image/png'],
        [`${size.toLowerCase()}.jpg`, 'image/jpeg'],
        [`${size.toLowerCase()}.jpeg`, 'image/jpeg'],
    ];
    for (const [name, mime] of variants) {
        const p = join(dir, name);
        if (existsSync(p)) {
            return { buffer: readFileSync(p), mime };
        }
    }
    return null;
}
