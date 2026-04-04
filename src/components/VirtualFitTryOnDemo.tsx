'use client';

import { useCallback, useEffect, useState } from 'react';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;

function parseErrorDetail(detail: unknown): string {
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail)) {
        return detail
            .map((item) => {
                if (item && typeof item === 'object' && 'msg' in item) {
                    return String((item as { msg: unknown }).msg);
                }
                return String(item);
            })
            .join('; ');
    }
    return 'Request failed';
}

export default function VirtualFitTryOnDemo() {
    const [file, setFile] = useState<File | null>(null);
    const [inputPreview, setInputPreview] = useState<string | null>(null);
    const [size, setSize] = useState<string>('M');
    const [resultUrl, setResultUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const revoke = useCallback((url: string | null) => {
        if (url?.startsWith('blob:')) URL.revokeObjectURL(url);
    }, []);

    useEffect(() => {
        return () => {
            revoke(inputPreview);
            revoke(resultUrl);
        };
    }, [inputPreview, resultUrl, revoke]);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        setFile(f);
        setResultUrl((prev) => {
            revoke(prev);
            return null;
        });
        setError(null);
        setInputPreview((prev) => {
            revoke(prev);
            return f ? URL.createObjectURL(f) : null;
        });
    };

    const generate = async () => {
        if (!file) return;
        setLoading(true);
        setError(null);
        setResultUrl((prev) => {
            revoke(prev);
            return null;
        });
        try {
            const fd = new FormData();
            fd.append('size', size);
            fd.append('garment_image', file);
            const res = await fetch('/api/virtual-fit', {
                method: 'POST',
                body: fd,
            });
            if (!res.ok) {
                const ct = res.headers.get('content-type');
                let msg = `Request failed (${res.status})`;
                if (ct?.includes('application/json')) {
                    const j = (await res.json()) as { error?: string; detail?: unknown };
                    if (j.error) msg = j.error;
                    else if (j.detail !== undefined) msg = parseErrorDetail(j.detail);
                } else {
                    const t = await res.text();
                    if (t) msg = t.slice(0, 400);
                }
                throw new Error(msg);
            }
            const blob = await res.blob();
            if (!blob.type.startsWith('image/')) {
                throw new Error('Unexpected response from try-on service.');
            }
            setResultUrl(URL.createObjectURL(blob));
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Generation failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
            <div className="p-6 md:p-10">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="space-y-5">
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-800">Garment photo</label>
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/webp,image/gif"
                                onChange={onFileChange}
                                className="block w-full cursor-pointer text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-[#415b3e]/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#415b3e] hover:file:bg-[#415b3e]/15"
                            />
                            <p className="mt-2 text-xs text-gray-500">JPEG or PNG (max 20MB). Requires size model images in the project (see deployment notes).</p>
                        </div>

                        <div>
                            <label htmlFor="vf-size" className="mb-2 block text-sm font-semibold text-gray-800">
                                Preview size
                            </label>
                            <select
                                id="vf-size"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-900 outline-none ring-[#415b3e] focus:ring-2"
                            >
                                {SIZES.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={() => void generate()}
                            disabled={!file || loading}
                            className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#415b3e] to-[#2d4030] px-6 py-3.5 font-semibold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg
                                        className="h-5 w-5 animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        aria-hidden
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Generating preview…
                                </span>
                            ) : (
                                'Generate preview'
                            )}
                        </button>

                        {error && (
                            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="flex min-h-[280px] flex-col gap-4">
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Your garment</p>
                            <div className="flex aspect-[3/4] max-h-80 items-center justify-center overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200/80">
                                {inputPreview ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={inputPreview} alt="Uploaded garment" className="max-h-full max-w-full object-contain" />
                                ) : (
                                    <span className="text-sm text-gray-400">No image selected</span>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Size-matched preview</p>
                            <div className="flex aspect-[3/4] max-h-80 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 ring-1 ring-gray-700/50">
                                {resultUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={resultUrl} alt="Virtual try-on result" className="max-h-full max-w-full object-contain" />
                                ) : (
                                    <span className="px-4 text-center text-sm text-gray-400">
                                        {loading ? 'Rendering…' : 'Result appears here after generation.'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
