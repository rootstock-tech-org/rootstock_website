export type Solution = {
  slug: string;
  number: string;
  sector: string;
  title: string;
  summary: string;
  buyer: string;
  accent: string;
  problem: string;
  outcomes: string[];
  capabilities: { title: string; description: string; product?: string }[];
  inputs: string[];
  outputs: string[];
};

export const solutions: Solution[] = [
  {
    slug: 'manufacturing',
    number: '01',
    sector: 'Manufacturing',
    title: 'AI for the work happening on your floor.',
    summary: 'Turn CAD drawings into costing workflows and camera feeds into reviewable safety and vehicle events.',
    buyer: 'For manufacturers and industrial operators',
    accent: 'copper',
    problem: 'Important details are scattered across drawings, systems and sites. Teams need the right information while a process is running, not after the next report.',
    outcomes: ['Faster drawing-to-cost workflows', 'Clearer visibility at gates and on production lines', 'Less manual searching across operational records'],
    capabilities: [
      { title: 'Drawing to cost', description: 'Read component drawings, build a bill of material and examine the effect of design revisions.', product: 'costingai' },
      { title: 'Camera vision', description: 'Use camera feeds to support PPE checks, number plate reading and reviewable operational events.' },
      { title: 'Operations assistants', description: 'Give teams answers grounded in their own production, quality and dispatch data.', product: 'inventoai' },
    ],
    inputs: ['Engineering drawings', 'Existing camera feeds', 'ERP and process data'],
    outputs: ['Costing workflows', 'Compliance events', 'Team-facing answers'],
  },
  {
    slug: 'financial-services',
    number: '02',
    sector: 'Financial services',
    title: 'Trading intelligence grounded in your rules.',
    summary: 'Build trading bots and research assistants that connect market signals with your strategy rules and risk controls.',
    buyer: 'For brokers, research and investment teams',
    accent: 'teal',
    problem: 'Financial teams need fast analysis, but every answer must stay connected to the underlying data and the firm’s own operating principles.',
    outcomes: ['Answers connected to source data', 'More consistent support and research workflows', 'Clearer explanation of strategy logic'],
    capabilities: [
      { title: 'Trading bots', description: 'Evaluate market signals against strategy rules and risk controls before a proposed action.' },
      { title: 'Research and document analysis', description: 'Extract relevant information from reports, charts and other financial material.', product: 'finsight' },
      { title: 'Client support', description: 'Answer recurring questions using approved internal knowledge.' },
    ],
    inputs: ['Market data', 'Reports and documents', 'Firm principles'],
    outputs: ['Traceable answers', 'Research support', 'Strategy workflows'],
  },
  {
    slug: 'education',
    number: '03',
    sector: 'Education & training',
    title: 'AI tutoring through visuals, audio and 3D labs.',
    summary: 'Help learners explore interactive models, ask questions and receive visual and spoken explanations grounded in your material.',
    buyer: 'For institutions and workforce training teams',
    accent: 'blue',
    problem: 'Expert knowledge lives in courses, manuals and people’s heads. Learners need guidance that reflects the institution’s material and language.',
    outcomes: ['Individual guidance from approved material', 'Easier discovery across learning content', 'Training paths that can follow each learner'],
    capabilities: [
      { title: 'Visual AI tutor', description: 'Connect learner questions to highlighted model parts, step-by-step explanations and optional audio.' },
      { title: 'Interactive 3D labs', description: 'Let learners inspect and manipulate lab models across subjects such as circuits and mechanics.' },
      { title: 'Content intelligence', description: 'Ingest documents, audio and video so learners can find relevant knowledge.', product: 'edu-stream-pipeline' },
    ],
    inputs: ['Curriculum and manuals', 'Documents, audio and video', 'Institutional knowledge'],
    outputs: ['Guided learning', 'Searchable content', 'Training records'],
  },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
