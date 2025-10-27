// INR formatting utilities
// Usage: formatInrLakhCrore(1250000) -> "₹12.5 lakh"

export function formatInrLakhCrore(value: number, options?: { currency?: boolean; maxFractionDigits?: number }) {
  const { currency = true, maxFractionDigits = 1 } = options || {};
  const abs = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  const format = (num: number, suffix?: string) => {
    const fixed = num.toLocaleString('en-IN', {
      maximumFractionDigits: maxFractionDigits,
      minimumFractionDigits: 0,
    });
    const prefixed = currency ? `₹${fixed}` : fixed;
    return suffix ? `${sign}${prefixed} ${suffix}` : `${sign}${prefixed}`;
  };

  if (abs >= 1_00_00_000) {
    return format(abs / 1_00_00_000, 'crore');
  }
  if (abs >= 1_00_000) {
    return format(abs / 1_00_000, 'lakh');
  }
  return format(abs);
}

export function formatINRCurrency(value: number, options?: Intl.NumberFormatOptions) {
  return (value).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    ...options,
  });
}
