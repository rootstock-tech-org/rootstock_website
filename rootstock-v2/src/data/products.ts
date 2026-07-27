export interface Product {
    slug: string;
    title: string;
    industry: string;
    tagline: string;
    description: string;
    features: string[];
    useCases: string[];
    technicalHighlights: string[];
    businessImpact?: string[];
    deploymentApproach?: string;
    ctaTitle?: string;
    ctaDescription?: string;
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
    },
    {
        slug: 'inventoai',
        title: 'InvenSync',
        industry: 'Manufacturing / ERP',
        tagline: 'Stop managing inventory. Start predicting it.',
        description: 'InvenSync is an AI powered inventory assistant that integrates with the client’s ERP and acts as a 24 by 7 intelligent layer over live stock data. It monitors levels, forecasts demand, suggests reorders, and answers team questions in plain language. The goal is to reduce manual stock checking, prevent stockouts, avoid dead inventory, and make inventory decisions faster.',
        features: [
            'Monitors stock levels continuously and sends alerts before shortages happen.',
            'Predicts future demand using historical sales and usage patterns.',
            'Suggests what to order, when to order, and how much to order for every SKU.',
            'Answers plain language inventory questions such as “How much of part X do we have?”',
            'Separates production inventory, service inventory, pipeline inventory, and finished goods.',
            'Sends automated daily reports and exception based alerts.',
            'Works through a simple chat interface so teams do not need complex dashboard training.',
            'Integrates with the existing ERP system and reads live inventory data.'
        ],
        useCases: [
            'Spare parts inventory visibility across locations.',
            'Production material planning.',
            'Service inventory separation.',
            'Dead stock and obsolete component reduction.',
            'Sales team stock availability checks.',
            'Procurement reorder planning.',
            'Multi facility inventory monitoring.',
            'Early shortage detection for supplier planning.'
        ],
        technicalHighlights: [
            'ERP integration layer for live stock data.',
            'Historical inventory and demand analysis.',
            'Forecasting engine for future usage patterns.',
            'SKU level reorder recommendation logic.',
            'Chat based natural language query interface.',
            'Automated alerting and reporting system.',
            'Multi location inventory visibility.',
            'Explainable recommendations for procurement and warehouse teams.'
        ],
        businessImpact: [
            'Save 20 to 30 percent on inventory carrying costs.',
            'Increase product availability and reduce lost sales.',
            'Save 5 to 8 hours per day by reducing manual stock checking.',
            'Reduce dead stock and obsolete inventory risk.',
            'Improve customer experience through instant and accurate stock answers.',
            'Help procurement teams act before shortages affect production.'
        ],
        deploymentApproach: 'RootStock Technology follows a structured 3 month go live approach. The process begins with ERP integration and historical data understanding, then moves into workflow configuration, prediction validation, team onboarding, and final deployment. The focus is to make the solution usable for real teams quickly, without disrupting existing operations.',
        ctaTitle: 'Ready to optimize your inventory?',
        ctaDescription: 'Book a discovery call to see how InvenSync can work with your ERP data, inventory flow, and procurement process.'
    },
    {
        slug: 'costingai',
        title: 'CostEngine',
        industry: 'Manufacturing / ERP',
        tagline: 'From drawing to costing sheet in minutes, not hours.',
        description: 'CostEngine automates component costing for manufactured and purchased parts. Instead of manually reading drawings, listing sub parts, calculating raw material usage, calculating wastage, deriving net weight, applying overheads, and entering everything into Excel, the engineer simply uploads the drawing. CostEngine generates a ready costing sheet in minutes.',
        features: [
            'Allows engineers to upload or scan a component drawing.',
            'Reads component drawings and extracts relevant costing details.',
            'Identifies sub parts, dimensions, quantities, and weights.',
            'Calculates raw material usage for every sub part.',
            'Calculates material wastage for every sub part.',
            'Derives net weight and net cost automatically.',
            'Applies configured overhead rates such as logistics, finishing, assembly, and other cost heads.',
            'Generates a complete costing sheet and exports it to Excel.',
            'Supports instant re costing when a revised drawing is uploaded.',
            'Uses the client’s raw material price database for current cost calculations.'
        ],
        useCases: [
            'Vendor price negotiation.',
            'Component costing for manufactured parts.',
            'Purchased component benchmarking.',
            'Design revision costing.',
            'Engineering costing automation.',
            'Raw material usage and wastage tracking.',
            'Standardized costing across teams.',
            'Faster quotation and procurement decisions.'
        ],
        technicalHighlights: [
            'Drawing to data extraction pipeline.',
            'Component and sub part recognition.',
            'Raw material usage calculation engine.',
            'Material wastage calculation logic.',
            'Net weight and net cost computation.',
            'Raw material pricing database integration.',
            'Configurable overhead rate module.',
            'Excel export workflow.',
            'Revision based re costing.',
            'Validation against existing manual costing sheets.'
        ],
        businessImpact: [
            'Save 2 to 4 hours per component.',
            'Reduce costing errors to near zero.',
            'Respond quickly to design changes.',
            'Create consistent cost benchmarking.',
            'Apply overhead rates uniformly across engineers, batches, and teams.',
            'Use updated material prices for reliable cost sheets.',
            'Build a stronger basis for vendor negotiation.',
            'Reduce repeated Excel based manual work.'
        ],
        deploymentApproach: 'RootStock Technology follows a structured 3 month go live approach. The process starts with connecting the drawing repository, ERP data, costing templates, and raw material price database. The solution is then validated against existing manual costing sheets before being deployed across the component catalogue. The goal is to keep the engineer’s workflow simple: upload the drawing and receive the costing sheet.',
        ctaTitle: 'Ready to automate component costing?',
        ctaDescription: 'Book a discovery call to see how CostEngine can simplify drawing based costing, reduce engineering effort, and improve vendor negotiation accuracy.'
    },
    {
        slug: 'gateai',
        title: 'GateFlow',
        industry: 'Manufacturing / ERP',
        tagline: 'From truck arrival to QC clearance without a single keystroke.',
        description: 'GateFlow replaces manual gate entry with a scan, instant ERP lookup, and printed barcode trail. It reads invoices, ASNs, and purchase orders, verifies important order parameters, and carries verified data from gate clearance to QC and material receipt. The goal is to reduce entry errors, speed up gate clearance, and create traceability for inbound material movement.',
        features: [
            'Reads invoices, ASNs, and purchase orders using a camera or handheld scanner.',
            'Extracts document reference numbers automatically.',
            'Performs instant ERP lookup for linked order details.',
            'Verifies number of items, total value, and taxes.',
            'Allows the operator to approve verified data in one click.',
            'Prints a barcode label automatically after gate verification.',
            'Creates a barcode trail from gate entry to QC and MRN.',
            'Supports both ASN vendors and non ASN purchase order based vendors.',
            'Routes consignments to the correct department.',
            'Reduces manual typing at factory gate points.'
        ],
        useCases: [
            'Factory gate material entry.',
            'ASN vendor verification.',
            'Non ASN purchase order verification.',
            'QC and MRN data preloading.',
            'Barcode based inbound material traceability.',
            'Department wise routing.',
            'Truck queue reduction.',
            'Inbound delivery audit trail.',
            'Faster goods receipt process.',
            'Reduced operator confusion at gate points.'
        ],
        technicalHighlights: [
            'OCR or scanner based document capture.',
            'ERP lookup for ASN and PO records.',
            'Reference number extraction.',
            'Three parameter verification for number of items, total value, and taxes.',
            'Barcode generation and printer integration.',
            'QC and MRN barcode scanning workflow.',
            'Department routing logic.',
            'Unified workflow for ASN and non ASN vendors.',
            'Exception flagging for mismatched data.',
            'End to end inbound material traceability.'
        ],
        businessImpact: [
            'Eliminate manual document number entry errors.',
            'Create one consistent process across ASN and PO vendors.',
            'Remove repeated re verification at QC.',
            'Route consignments faster to the correct department.',
            'Reduce gate clearance time to under 2 minutes.',
            'Shorten truck queues.',
            'Reduce downstream confusion caused by incorrect gate entries.',
            'Create a verified barcode trail from gate to MRN.'
        ],
        deploymentApproach: 'RootStock Technology follows a structured 3 month go live approach. The process begins with scanner or camera setup, barcode printer configuration, and ERP lookup integration. It then moves into live testing with real deliveries, QC and MRN barcode validation, department routing setup, and final deployment across entry gates. The solution should make the gate operator’s job simpler, not more complicated.',
        ctaTitle: 'Ready to make inbound material control faster?',
        ctaDescription: 'Book a discovery call to see how GateFlow can reduce gate entry errors, speed up clearance, and create a verified barcode trail for your inbound material flow.'
    }
];

export function getProductBySlug(slug: string): Product | undefined {
    return products.find(p => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
    return products.map(p => p.slug);
}
