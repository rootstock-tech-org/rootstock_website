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
    summary: 'Connect drawings, operational data and camera feeds to the decisions your production, quality and procurement teams make every day.',
    buyer: 'For manufacturers and industrial operators',
    accent: 'copper',
    problem: 'Important details are scattered across drawings, systems and sites. Teams need the right information while a process is running, not after the next report.',
    outcomes: ['Faster drawing-to-cost workflows', 'Clearer visibility at gates and on production lines', 'Less manual searching across operational records'],
    capabilities: [
      { title: 'Drawing to cost', description: 'Read component drawings, build a bill of material and examine the effect of design revisions.', product: 'costingai' },
      { title: 'Camera vision', description: 'Use existing cameras to support PPE, procedure, vehicle and material checks.', product: 'gateai' },
      { title: 'Operations assistants', description: 'Give teams answers grounded in their own production, quality and dispatch data.', product: 'inventoai' },
    ],
    inputs: ['Engineering drawings', 'Existing camera feeds', 'ERP and process data'],
    outputs: ['Costing workflows', 'Compliance events', 'Team-facing answers'],
  },
  {
    slug: 'financial-services',
    number: '02',
    sector: 'Financial services',
    title: 'Financial intelligence grounded in your rules.',
    summary: 'Build research, strategy and support assistants that work from your market data, documents and internal principles.',
    buyer: 'For brokers, research and investment teams',
    accent: 'teal',
    problem: 'Financial teams need fast analysis, but every answer must stay connected to the underlying data and the firm’s own operating principles.',
    outcomes: ['Answers connected to source data', 'More consistent support and research workflows', 'Clearer explanation of strategy logic'],
    capabilities: [
      { title: 'Strategy assistants', description: 'Help teams explore market information through a firm-specific set of principles.' },
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
    title: 'Learning systems built around your material.',
    summary: 'Turn institutional content into guided learning and individual support for students, faculty and technical teams.',
    buyer: 'For institutions and workforce training teams',
    accent: 'blue',
    problem: 'Expert knowledge lives in courses, manuals and people’s heads. Learners need guidance that reflects the institution’s material and language.',
    outcomes: ['Individual guidance from approved material', 'Easier discovery across learning content', 'Training paths that can follow each learner'],
    capabilities: [
      { title: 'Learning assistants', description: 'Tutor and technician experiences built from your curriculum and reference material.' },
      { title: 'Content intelligence', description: 'Ingest documents, audio and video so learners can find relevant knowledge.', product: 'edu-stream-pipeline' },
      { title: 'Training workflows', description: 'Structure lessons and competency records around the skills you need to teach.' },
    ],
    inputs: ['Curriculum and manuals', 'Documents, audio and video', 'Institutional knowledge'],
    outputs: ['Guided learning', 'Searchable content', 'Training records'],
  },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
