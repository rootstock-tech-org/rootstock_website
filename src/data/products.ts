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
        slug: 'finsight',
        title: 'Finsight',
        industry: 'Finance / Fintech',
        tagline: 'AI-powered finance analyzer',
        description: 'Finsight enables users to upload financial inputs in multiple formats, including images, PDFs, stock charts, and financial reports. Using advanced AI models, the platform automatically interprets and analyzes the provided data to deliver deep, actionable insights.',
        features: [
            'Real-time Stock Tracking: Monitor stocks and mutual funds with live price updates',
            'AI-Powered Analysis: Advanced algorithms for financial document analysis',
            'Multi-channel Notifications: WhatsApp, Telegram, SMS, and Email support',
            'Subscription Plans: Tiered pricing with different stock limits'
        ],
        useCases: [
            'Multi-format Input Processing: Supports analysis of stock charts, annual reports, balance sheets, earnings documents, and screenshots.',
            'Automated Insight Generation: Extracts and presents key highlights, important financial metrics, and critical observations from the input data.',
            'Risk Identification: Detects potential financial risks, red flags, and weaknesses in the company or asset.'
        ],
        technicalHighlights: [
            'Trend & Pattern Recognition: Identifies market trends, price patterns, and performance signals from charts and historical data.',
            'Management & Business Analysis: Provides insights into management quality, strategic direction, and operational efficiency based on available data.',
            'Actionable Recommendations: Converts complex financial information into clear, decision-ready insights for investors and analysts.'
        ]
    },
    {
        slug: 'edu-stream-pipeline',
        title: 'EduStream',
        industry: 'Education / Syntex',
        tagline: 'Transform static content into searchable intelligence',
        description: 'A secure, multi-format ingestion pipeline that converts PDFs, audio, and video into searchable, structured knowledge. Built for educational institutions and content platforms that need to make their resources instantly accessible and queryable.',
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
        slug: 'conservatory-grade',
        title: 'MusicGrade',
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
        title: 'SentienceVision',
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
        slug: 'persona-fit-engine',
        title: 'Virtual Fit Studio',
        industry: 'Fashion / Retail',
        tagline: 'Size-accurate AI try-on previews for e-commerce',
        description:
            'Upload a garment once and preview it on size-matched models. Our pipeline analyzes the product image and generates realistic try-on visuals so shoppers can choose the right fit—reducing returns and boosting confidence at checkout.',
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
            'Significant reduction in return rates'
        ]
    }
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
    return products.map(p => p.slug);
}
