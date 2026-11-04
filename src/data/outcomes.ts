// Figures mirror the businessImpact claims on the matching product pages in products.ts; keep them in sync.
export type Outcome = { figure: string; unit: string; label: string; product: string; productSlug: string };

export const outcomes: Outcome[] = [
  { figure: '2–4', unit: 'hrs', label: 'saved on every component costed', product: 'CostEngine', productSlug: 'costingai' },
  { figure: '< 2', unit: 'min', label: 'from truck arrival to gate clearance', product: 'GateFlow', productSlug: 'gateai' },
  { figure: '5–8', unit: 'hrs', label: 'of manual stock checks removed each day', product: 'InvenSync', productSlug: 'inventoai' },
];
