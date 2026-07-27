'use client';

import { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { UploadCloud, RefreshCw, AlertCircle } from 'lucide-react';

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

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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
        <div className="w-full rounded-[2rem] overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.05)] border border-gray-200/60 bg-white/70 backdrop-blur-3xl">
            <div className="p-8 md:p-12">
                <div className="grid gap-10 lg:grid-cols-2">
                    <div className="space-y-8">
                        <div>
                            <label className="mb-3 block text-sm font-semibold text-[var(--foreground)] tracking-wide uppercase">
                                1. Upload Garment
                            </label>
                            <label className="group flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[var(--color-brand-primary)]/30 rounded-2xl bg-white/50 hover:bg-[var(--color-brand-primary)]/5 transition-all cursor-pointer">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 text-[var(--color-brand-primary)] mb-2 group-hover:scale-110 transition-transform" />
                                    <p className="text-sm text-gray-500 font-medium">
                                        <span className="text-[var(--color-brand-primary)] font-semibold">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">JPEG or PNG (max 20MB)</p>
                                </div>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    onChange={onFileChange}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div>
                            <label htmlFor="vf-size" className="mb-3 block text-sm font-semibold text-[var(--foreground)] tracking-wide uppercase">
                                2. Select Preview Size
                            </label>
                            <select
                                id="vf-size"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                className="w-full rounded-2xl border-2 border-[var(--color-brand-primary)]/10 bg-white px-5 py-4 text-[var(--foreground)] outline-none focus:ring-4 focus:ring-[var(--color-brand-primary)]/20 focus:border-[var(--color-brand-primary)]/40 transition-all font-medium appearance-none cursor-pointer"
                                style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23415b3e%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '0.65rem auto' }}
                            >
                                {SIZES.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={() => void generate()}
                            disabled={!file || loading}
                            className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[var(--color-brand-primary)] px-6 py-4 font-semibold text-white shadow-lg shadow-[var(--color-brand-primary)]/20 hover:-translate-y-0.5 hover:shadow-xl hover:bg-[var(--color-brand-secondary)] focus:outline-none focus:ring-4 focus:ring-[var(--color-brand-primary)]/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 transition-all text-lg"
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    Generating Preview...
                                </>
                            ) : (
                                'Generate Virtual Fit'
                            )}
                        </button>

                        {error && (
                            <div className="flex items-start gap-3 rounded-xl border-l-4 border-red-500 bg-red-50/80 p-4 text-sm text-red-800" role="alert">
                                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                                <span>{error}</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-6 lg:border-l lg:border-[var(--color-brand-primary)]/10 lg:pl-10">
                        <div className="flex-1">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Your Garment</p>
                            <div className="flex h-[200px] items-center justify-center overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-inner">
                                {inputPreview ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={inputPreview} alt="Uploaded garment" className="max-h-full max-w-full object-contain p-2 hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <span className="text-sm font-medium text-gray-300">No image uploaded</span>
                                )}
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-primary)]">AI Preview</p>
                            <div className="flex h-[320px] items-center justify-center overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 shadow-2xl relative group">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
                                {resultUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={resultUrl} alt="Virtual try-on result" className="max-h-full max-w-full object-cover z-0" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center z-0 px-6 text-center">
                                        <SparklesIcon className="w-8 h-8 text-gray-600 mb-3" />
                                        <span className="text-sm font-medium text-gray-400">
                                            {loading ? 'AI is processing your garment...' : 'Your preview will magically appear here.'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M19 17v4" />
            <path d="M3 5h4" />
            <path d="M17 19h4" />
        </svg>
    )
}
