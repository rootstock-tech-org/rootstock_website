export interface Product {
    slug: string;
    title: string;
    industry: string;
    tagline: string;
    description: string;
    features: string[];
    useCases: string[];
    technicalHighlights: string[];
}

export const products: Product[] = [
    {
        slug: 'edu-stream-pipeline',
        title: 'Edu-Stream Pipeline',
        industry: 'Education / Syntex',
        tagline: 'Transform static content into searchable intelligence',
        description: 'A secure, multi-format injection engine that converts PDFs, audio, and video into searchable, structured knowledge. Built for educational institutions and content platforms that need to make their resources instantly accessible and queryable.',
        features: [
            'Multi-format support (PDF, Audio, Video)',
            'Secure content processing with encryption',
            'Real-time indexing and search',
            'Intelligent content chunking',
            'Semantic search capabilities',
            'API-first architecture'
        ],
        useCases: [
            'Digital libraries and learning management systems',
            'Corporate training platforms',
            'Educational content aggregation',
            'Research paper repositories',
            'Video lecture transcription and search'
        ],
        technicalHighlights: [
            'Advanced NLP for content extraction',
            'Vector embeddings for semantic search',
            'Scalable microservices architecture',
            'Real-time processing pipeline',
            'Multi-language support'
        ]
    },
    {
        slug: 'rt-ocr',
        title: 'RT-OCR',
        industry: 'Enterprise',
        tagline: 'High-accuracy OCR for complex document layouts',
        description: 'Our proprietary OCR-to-Text model designed specifically for high accuracy in complex, non-standard layouts. Perfect for enterprises dealing with diverse document types, from invoices to handwritten notes.',
        features: [
            'High accuracy on complex layouts',
            'Handwriting recognition',
            'Multi-language support (50+ languages)',
            'Table and form extraction',
            'Real-time processing',
            'Cloud and on-premise deployment'
        ],
        useCases: [
            'Invoice and receipt processing',
            'Legal document digitization',
            'Medical records extraction',
            'Form automation',
            'Archive digitization'
        ],
        technicalHighlights: [
            'Custom-trained transformer models',
            'Layout-aware text extraction',
            'Confidence scoring for quality assurance',
            'Batch processing capabilities',
            'RESTful API integration'
        ]
    },
    {
        slug: 'conservatory-grade',
        title: 'Conservatory Grade',
        industry: 'Music / Arts',
        tagline: 'Automated music sheet analysis and grading',
        description: 'Bridge the gap between physical performance and digital assessment with our automated music sheet analysis system. Designed for music schools, conservatories, and online music education platforms.',
        features: [
            'Automated music notation recognition',
            'Performance grading and feedback',
            'Rhythm and pitch accuracy analysis',
            'Progress tracking over time',
            'Customizable grading rubrics',
            'Student performance reports'
        ],
        useCases: [
            'Music conservatories and schools',
            'Online music education platforms',
            'Private music instruction',
            'Music competition judging',
            'Student practice assessment'
        ],
        technicalHighlights: [
            'Computer vision for sheet music analysis',
            'Audio-to-notation alignment',
            'Machine learning-based grading',
            'Real-time feedback generation',
            'Integration with digital audio workstations'
        ]
    },
    {
        slug: 'sentience-vision',
        title: 'Sentience Vision',
        industry: 'General / Security',
        tagline: 'Real-time emotion detection for empathetic AI',
        description: 'Real-time emotion detection from static or live imagery, enabling AI systems to understand and respond to human emotions. Perfect for customer service, security, and human-robot interaction applications.',
        features: [
            'Real-time emotion recognition',
            'Multi-face detection and tracking',
            'Emotion intensity scoring',
            'Age and gender estimation',
            'Attention and engagement metrics',
            'Privacy-preserving processing'
        ],
        useCases: [
            'Customer service sentiment analysis',
            'Security and surveillance',
            'Human-robot interaction',
            'Market research and user testing',
            'Mental health monitoring',
            'Educational engagement tracking'
        ],
        technicalHighlights: [
            'Deep learning facial analysis',
            'Edge computing optimization',
            'Low-latency processing (<100ms)',
            'GDPR-compliant data handling',
            'Multi-platform SDK (iOS, Android, Web)'
        ]
    },
    {
        slug: 'multi-doc-architect',
        title: 'Multi-Doc Architect',
        industry: 'Legal / Enterprise',
        tagline: 'Synthesize insights across hundreds of documents',
        description: 'A unique pipeline that synthesizes information across hundreds of documents simultaneously. Built for legal firms, research institutions, and enterprises that need to extract insights from massive document collections.',
        features: [
            'Cross-document information synthesis',
            'Intelligent document clustering',
            'Automated summarization',
            'Entity and relationship extraction',
            'Contradiction detection',
            'Citation and reference tracking'
        ],
        useCases: [
            'Legal case research and discovery',
            'Due diligence for M&A',
            'Academic literature review',
            'Regulatory compliance analysis',
            'Patent research',
            'Contract analysis and comparison'
        ],
        technicalHighlights: [
            'Large language model integration',
            'Distributed processing architecture',
            'Graph-based knowledge representation',
            'Semantic similarity matching',
            'Scalable to 1000+ documents'
        ]
    },
    {
        slug: 'persona-fit-engine',
        title: 'Persona-Fit Engine',
        industry: 'Fashion / Retail',
        tagline: 'AI-powered virtual try-on for any body type',
        description: 'A virtual try-on solution using AI-generated avatars of any body type or size. Reduces return rates by 40% through precise neural fabric simulation, revolutionizing online fashion retail.',
        features: [
            'AI-generated personalized avatars',
            'Accurate body measurement from photos',
            'Realistic fabric simulation',
            'Multiple clothing item try-on',
            'Size recommendation engine',
            'AR try-on for mobile'
        ],
        useCases: [
            'E-commerce fashion retailers',
            'Custom clothing manufacturers',
            'Fashion marketplaces',
            'Subscription clothing services',
            'Virtual fashion shows',
            'Personal styling apps'
        ],
        technicalHighlights: [
            'Neural rendering for realistic visualization',
            'Physics-based fabric simulation',
            'Body shape estimation from single image',
            'Real-time 3D model generation',
            '40% reduction in return rates'
        ]
    }
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
    return products.map(p => p.slug);
}
