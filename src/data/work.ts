// Shipped systems from the "Rootstock Products" proof-of-work deck. Kept client-neutral: no client names in copy, logos blurred in screenshots (public/work/<slug>/).
export type Shot = { src: string; caption: string; width: number; height: number };

export type WorkItem = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  tags: string[];
  sector: string;
  status?: string;
  relatedProduct?: string;
  relatedSolution?: string;
  shots: Shot[];
};


export const workItems: WorkItem[] = [
  {
    slug: 'edustream',
    number: '01',
    title: 'EduStream',
    tagline: 'AI learning platform',
    summary: "A learning platform that adapts to the individual. Assessments are mapped to Bloom's taxonomy, a retrieval-grounded tutor answers from the course material with citations back to the source, and a failed attempt automatically triggers remedial content at the right level.",
    tags: ['Adaptive assessment', 'Cited AI tutor', 'Remedial pathways', 'Proctoring', 'Hindi and English'],
    sector: 'Education',
    relatedProduct: 'edu-stream-pipeline',
    relatedSolution: 'education',
    shots: [
      { src: '/work/edustream/01-pre-question-intake-calibrates-difficulty.webp', caption: 'Pre-question intake calibrates difficulty', width: 1440, height: 1011 },
      { src: '/work/edustream/02-study-material-with-the-tutor-alongside.webp', caption: 'Study material with the tutor alongside', width: 1425, height: 1371 },
      { src: '/work/edustream/03-assessment-at-the-learner-s-current-bloom-level.webp', caption: "Assessment at the learner's current Bloom level", width: 1344, height: 1600 },
      { src: '/work/edustream/04-tutor-answering-with-cited-sources.webp', caption: 'Tutor answering with cited sources', width: 1344, height: 1600 },
      { src: '/work/edustream/05-lecture-locked-after-repeated-failure.webp', caption: 'Lecture locked after repeated failure', width: 1440, height: 911 },
      { src: '/work/edustream/06-ai-coach-on-the-learner-dashboard.webp', caption: 'AI coach on the learner dashboard', width: 1440, height: 900 },
      { src: '/work/edustream/07-ai-question-generation-with-a-review-gate.webp', caption: 'AI question generation with a review gate', width: 1440, height: 901 },
      { src: '/work/edustream/08-assessment-proctoring-review.webp', caption: 'Assessment proctoring review', width: 1440, height: 900 },
    ],
  },
  {
    slug: 'vision-ai',
    number: '02',
    title: 'Rootstock Vision AI',
    tagline: 'Computer vision for safer sites',
    summary: 'Eight AI features watch existing network cameras and record, in plain words, what they found, where and when. Every finding is kept with the picture that proves it, and a feature that cannot see clearly says so rather than reporting a false all-clear.',
    tags: ['8 detection features', 'Works on existing cameras', 'Evidence with every event', 'Drawn restricted areas', 'Attendance and watchlists'],
    sector: 'Manufacturing',
    relatedSolution: 'manufacturing',
    shots: [
      { src: '/work/vision-ai/01-restricted-area-breach-with-the-frame-that-prove.webp', caption: 'Restricted area breach, with the frame that proves it', width: 1500, height: 950 },
      { src: '/work/vision-ai/02-missing-helmet-flagged-on-a-live-feed.webp', caption: 'Missing helmet flagged on a live feed', width: 1500, height: 950 },
      { src: '/work/vision-ai/03-ppe-compliance-helmet-and-hi-vis-vest.webp', caption: 'PPE compliance: helmet and hi-vis vest', width: 1500, height: 950 },
      { src: '/work/vision-ai/04-event-detail-with-the-picture-that-proves-it.webp', caption: 'Event detail with the picture that proves it', width: 1500, height: 950 },
      { src: '/work/vision-ai/05-quality-warning-it-refuses-a-false-all-clear.webp', caption: 'Quality warning: it refuses a false all-clear', width: 1500, height: 950 },
      { src: '/work/vision-ai/06-reports-to-share-with-management.webp', caption: 'Reports to share with management', width: 1500, height: 950 },
    ],
  },
  {
    slug: 'research-assistant',
    number: '03',
    title: 'Grounded Research Assistant',
    tagline: 'Financial research that shows its sources',
    summary: 'A research assistant that answers only from source documents and shows its working. Every answer carries a reference back to the computed figure behind it, so a user can check the result rather than trust it.',
    tags: ['Grounded retrieval', 'Source citations', 'Market terminal', 'Single sign-on'],
    sector: 'Financial services',
    relatedSolution: 'financial-services',
    shots: [
      { src: '/work/research-assistant/01-market-terminal-multi-view-dashboard.webp', caption: 'Market terminal, multi-view dashboard', width: 1600, height: 1150 },
      { src: '/work/research-assistant/02-grounded-answer-with-its-sources.webp', caption: 'Grounded answer with its sources', width: 1600, height: 1150 },
      { src: '/work/research-assistant/03-formula-rendering-with-citations.webp', caption: 'Formula rendering with citations', width: 1440, height: 900 },
      { src: '/work/research-assistant/04-daily-market-story.webp', caption: 'Daily market story', width: 1600, height: 1150 },
      { src: '/work/research-assistant/05-market-breadth-story.webp', caption: 'Market breadth story', width: 1600, height: 1150 },
    ],
  },
  {
    slug: 'virtual-try-on',
    number: '04',
    title: 'Virtual Try-On',
    tagline: 'Size-accurate garment fitting for e-commerce',
    summary: 'Garment fitting generated per size and served straight into Shopify product pages, so a shopper sees the item on a body close to their own rather than on a single studio model.',
    tags: ['Size-matched models', 'Shopify integration', 'Batch generation'],
    sector: 'Retail',
    relatedProduct: 'persona-fit-engine',
    shots: [
      { src: '/work/virtual-try-on/01-base-model-xl.webp', caption: 'Base model, XL', width: 1073, height: 1600 },
      { src: '/work/virtual-try-on/02-generated-fit-xl.webp', caption: 'Generated fit, XL', width: 848, height: 1264 },
      { src: '/work/virtual-try-on/03-generated-fit-xs.webp', caption: 'Generated fit, XS', width: 1024, height: 1024 },
      { src: '/work/virtual-try-on/04-generated-fit-m.webp', caption: 'Generated fit, M', width: 1024, height: 1024 },
      { src: '/work/virtual-try-on/05-generated-fit-l.webp', caption: 'Generated fit, L', width: 1024, height: 1024 },
      { src: '/work/virtual-try-on/06-catalogue-item.webp', caption: 'Catalogue item', width: 1024, height: 1024 },
    ],
  },
  {
    slug: 'waste-segregation',
    number: '05',
    title: 'Waste Segregation AI',
    tagline: 'Municipal waste sorting from a photograph',
    summary: 'Instance segmentation identifies each item in mixed municipal waste, maps it to the correct disposal stream, and produces a written segregation plan. Ships as both a web application and an offline desktop build.',
    tags: ['5 waste classes', 'Instance masks', 'Disposal guidance', 'Web and desktop'],
    sector: 'Public sector',
    shots: [
      { src: '/work/waste-segregation/01-instance-segmentation-output.webp', caption: 'Instance segmentation output', width: 852, height: 604 },
      { src: '/work/waste-segregation/02-multi-class-detection.webp', caption: 'Multi-class detection', width: 852, height: 604 },
      { src: '/work/waste-segregation/03-application-interface.webp', caption: 'Application interface', width: 1600, height: 900 },
    ],
  },
  {
    slug: 'strategy-copilot',
    number: '06',
    title: 'Strategy Co-Pilot',
    tagline: 'Strategy assistant inside a trading platform',
    summary: "Reads a trader's own strategy data and explains it in plain words: why a strategy exited, what is open, how the month went, what a setting does. Every figure is read from the platform and laid out the way its own screens show it. It is read only and never places, edits, starts or stops anything.",
    tags: ['Live deployment', 'Reads your own strategies', 'Cited from platform data', 'English, Hinglish or Hindi', 'Read only by design'],
    sector: 'Financial services',
    status: 'Live in production',
    relatedSolution: 'financial-services',
    shots: [
      { src: '/work/strategy-copilot/01-co-pilot-panel-screen-context-grounding-rules-an.webp', caption: 'Co-pilot panel: screen context, grounding rules and the answer', width: 1280, height: 900 },
    ],
  },
  {
    slug: 'investing-copilot',
    number: '07',
    title: 'Investing Co-Pilot',
    tagline: 'Guided assistant for a momentum-investing platform',
    summary: 'Sits beside a momentum-investing platform, reads the screen the user is on, explains settings in plain words and fills forms for them. It does the clicking right up to the point where money moves, then stops and hands back. It is educational by design and never gives buy, sell or hold advice.',
    tags: ['Screen-aware', 'Fills forms for you', 'Stops before money moves', 'SEBI-compliant by design', 'Embedded in the platform'],
    sector: 'Financial services',
    relatedSolution: 'financial-services',
    shots: [
      { src: '/work/investing-copilot/01-filling-a-strategy-dialog-stopping-at-the-final.webp', caption: 'Filling a strategy dialog, stopping at the final click', width: 1600, height: 1444 },
      { src: '/work/investing-copilot/02-reading-live-positions-on-the-dashboard.webp', caption: 'Reading live positions on the dashboard', width: 1600, height: 1378 },
      { src: '/work/investing-copilot/03-assembling-a-strategy.webp', caption: 'Assembling a strategy', width: 1440, height: 1600 },
      { src: '/work/investing-copilot/04-the-guardrails-it-works-inside.webp', caption: 'The guardrails it works inside', width: 1600, height: 1467 },
    ],
  },
  {
    slug: 'chart-analysis',
    number: '08',
    title: 'Chart Analysis',
    tagline: 'Automated technical charting',
    summary: 'On-demand technical chart generation with indicator overlays, across both global and Indian market instruments.',
    tags: ['Indicator overlays', 'Multi-market', 'On-demand rendering'],
    sector: 'Financial services',
    relatedSolution: 'financial-services',
    shots: [
      { src: '/work/chart-analysis/01-equity-chart-with-indicators.webp', caption: 'Equity chart with indicators', width: 1400, height: 861 },
      { src: '/work/chart-analysis/02-multi-indicator-analysis.webp', caption: 'Multi-indicator analysis', width: 1400, height: 861 },
      { src: '/work/chart-analysis/03-indian-market-instrument.webp', caption: 'Indian market instrument', width: 1406, height: 861 },
    ],
  },
  {
    slug: 'weld-defect-detection',
    number: '09',
    title: 'Weld Defect Detection',
    tagline: 'Radiographic film inspection',
    summary: 'Automated defect detection in radiographic weld film, covering six defect classes on certified reference plates, with preprocessing that masks image-quality indicators so they are not mistaken for flaws.',
    tags: ['6 defect classes', '16-bit radiographs', 'Annotated dataset'],
    sector: 'Manufacturing',
    relatedSolution: 'manufacturing',
    shots: [
      { src: '/work/weld-defect-detection/01-toe-crack.webp', caption: 'Toe crack', width: 1061, height: 603 },
      { src: '/work/weld-defect-detection/02-incomplete-root-penetration-single-vee.webp', caption: 'Incomplete root penetration, single vee', width: 1067, height: 607 },
      { src: '/work/weld-defect-detection/03-incomplete-root-penetration-double-vee.webp', caption: 'Incomplete root penetration, double vee', width: 1059, height: 605 },
      { src: '/work/weld-defect-detection/04-porosity.webp', caption: 'Porosity', width: 1043, height: 597 },
    ],
  },
  {
    slug: 'devanagari-ocr',
    number: '10',
    title: 'Devanagari OCR',
    tagline: 'Hindi document transcription',
    summary: 'Transcribes Hindi documents to text with per-page confidence scoring and a run summary, so low-confidence pages can be reviewed rather than silently trusted.',
    tags: ['Hindi script', 'Confidence scoring', 'Batch reporting'],
    sector: 'Documents',
    shots: [
      { src: '/work/devanagari-ocr/01-source-scan-page-106.webp', caption: 'Input: Hindi source scan, page 106', width: 1127, height: 108 },
      { src: '/work/devanagari-ocr/02-source-scan-page-100.webp', caption: 'Input: Hindi source scan, page 100', width: 1036, height: 107 },
    ],
  },
  {
    slug: 'strategy-log-analyzer',
    number: '11',
    title: 'Strategy Log Analyzer',
    tagline: 'Trade forensics from raw platform logs',
    summary: 'Reads scanner and order-routing logs side by side, reconstructs the full lifecycle of every trade leg, and reports why each position opened and closed. Delivered as a Windows desktop tool and as a service API.',
    tags: ['Dual log correlation', 'Leg lifecycle reconstruction', 'Desktop and API'],
    sector: 'Financial services',
    relatedSolution: 'financial-services',
    shots: [
      { src: '/work/strategy-log-analyzer/01-system-architecture.webp', caption: 'System architecture', width: 1440, height: 900 },
      { src: '/work/strategy-log-analyzer/02-trade-investigation-workflow.webp', caption: 'Trade investigation workflow', width: 1440, height: 900 },
      { src: '/work/strategy-log-analyzer/03-trade-leg-lifecycle.webp', caption: 'Trade leg lifecycle', width: 1440, height: 900 },
    ],
  },
  {
    slug: 'ai-tutor',
    number: '12',
    title: 'Voice AI Tutor and Chip Lab',
    tagline: 'Lessons that speak, draw and let learners build',
    summary: 'A voice tutor that teaches a lecture out loud and builds each slide as it speaks, lighting up every step in time with the narration. Learners can stop it and ask by voice or text at any point. Beside it, a hands-on lab lets them simulate and synthesize Verilog, design a circuit in plain language and see it built on a 3D breadboard, and probe a transistor-level cross-section with live measurements.',
    tags: ['Voice lessons', 'Slides built live', 'Verilog simulation and synthesis', 'Circuit design in 3D', 'Device cross-sections'],
    sector: 'Education',
    relatedSolution: 'education',
    shots: [
      { src: '/work/ai-tutor/01-voice-lesson-builds-the-slide.webp', caption: 'Voice lesson: the tutor speaks and builds the slide as it teaches', width: 1600, height: 806 },
      { src: '/work/ai-tutor/02-voice-lesson-design-flow.webp', caption: 'Each step lights up in sync with the narration', width: 1600, height: 806 },
      { src: '/work/ai-tutor/03-lab-simulation-waveform.webp', caption: 'Chip design lab: simulate Verilog and inspect every signal', width: 1600, height: 848 },
      { src: '/work/ai-tutor/04-lab-synthesis-gates.webp', caption: 'Synthesis: the same design as 26 cells and 5 flip-flops', width: 1600, height: 848 },
      { src: '/work/ai-tutor/06-circuit-studio-schematic.webp', caption: 'Circuit studio: a validated schematic, ready to change in plain language', width: 1600, height: 909 },
      { src: '/work/ai-tutor/07-circuit-studio-3d-breadboard.webp', caption: 'The same circuit built on a 3D breadboard', width: 1600, height: 909 },
      { src: '/work/ai-tutor/08-probe-station-cross-section.webp', caption: 'Probe station: CMOS inverter cross-section with live measurements', width: 1600, height: 928 },
      { src: '/work/ai-tutor/05-lab-workbenches.webp', caption: 'Four workbenches for chip and circuit design', width: 1600, height: 769 },
    ],
  },
];

export const workStats: { figure: string; label: string }[] = [
  { figure: String(workItems.length), label: 'products shipped' },
  { figure: '125', label: 'screens built' },
  { figure: '13', label: 'vision modules' },
  { figure: '6', label: 'trained models' },
];

export const featuredWorkSlugs = ['ai-tutor', 'vision-ai', 'strategy-copilot', 'research-assistant'];

export function getWorkItem(slug: string): WorkItem | undefined {
  return workItems.find(item => item.slug === slug);
}

export function workForSolution(solution: string): WorkItem[] {
  return workItems.filter(item => item.relatedSolution === solution);
}

export function workForProduct(product: string): WorkItem | undefined {
  return workItems.find(item => item.relatedProduct === product);
}
