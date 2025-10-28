"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Built-in demo posts. In a real app, fetch by slug from a CMS or filesystem.
const builtin = [
  {
    slug: "ai-human-collaboration",
    title: "AI + Human Collaboration",
    date: "Dec 15, 2024",
    readTime: "4 min",
    content: `
      <h2>The Future of Human-AI Partnerships</h2>
      
      <p>In the rapidly evolving landscape of artificial intelligence, the most promising path forward isn't AI replacing humans—it's AI collaborating with humans. This partnership approach combines the strengths of both: human creativity, ethical judgment, and contextual understanding with AI's processing power, pattern recognition, and tireless consistency.</p>
      
      <p>At RootStock, we've been exploring these partnerships across several domains:</p>
      
      <h3>Decision Support in Finance</h3>
      
      <p>Financial decisions are complex, involving both quantitative analysis and qualitative judgment. Our research shows that when financial advisors work with AI assistants, client outcomes improve by 28% compared to either humans or AI working alone.</p>
      
      <p>The key is in the division of labor: AI systems excel at processing vast amounts of market data, identifying patterns, and generating initial recommendations based on client profiles. Human advisors then apply their emotional intelligence, ethical reasoning, and client relationship skills to contextualize these recommendations.</p>
      
      <h3>Complementary Strengths</h3>
      
      <p>The most effective human-AI partnerships leverage the complementary strengths of each participant:</p>
      
      <ul>
        <li><strong>AI strengths:</strong> Processing speed, pattern recognition in large datasets, consistency, tireless operation, perfect recall of information</li>
        <li><strong>Human strengths:</strong> Creativity, ethical judgment, emotional intelligence, contextual understanding, common sense reasoning</li>
      </ul>
      
      <p>When properly designed, these partnerships create outcomes that neither could achieve alone.</p>
      
      <h3>Building Trust in Collaboration</h3>
      
      <p>For human-AI collaboration to succeed, trust is essential. Our research identifies three key factors that build trust in these partnerships:</p>
      
      <ol>
        <li><strong>Transparency:</strong> Humans need to understand how AI reaches its conclusions</li>
        <li><strong>Control:</strong> Humans must maintain appropriate oversight and decision authority</li>
        <li><strong>Reliability:</strong> AI systems must demonstrate consistent performance within their defined parameters</li>
      </ol>
      
      <p>As we continue to develop these collaborative systems, maintaining focus on these trust factors will be crucial for widespread adoption.</p>
    `,
  },
  {
    slug: "emotional-intelligence-in-ai",
    title: "Emotional Intelligence in AI",
    date: "Dec 10, 2024",
    readTime: "6 min",
    content: `
      <h2>Beyond Logic: Emotional Intelligence in AI Systems</h2>
      
      <p>Emotional intelligence—the ability to recognize, understand, and respond appropriately to human emotions—is increasingly becoming a crucial frontier in AI development. As AI systems become more integrated into our daily lives, their ability to navigate the complex landscape of human emotions will determine whether they're merely tools or trusted advisors.</p>
      
      <h3>The Components of AI Emotional Intelligence</h3>
      
      <p>Building emotionally intelligent AI involves several interconnected capabilities:</p>
      
      <ul>
        <li><strong>Emotion Recognition:</strong> Identifying emotional states from text, voice, facial expressions, and other behavioral signals</li>
        <li><strong>Contextual Understanding:</strong> Interpreting emotions within their social and situational context</li>
        <li><strong>Appropriate Response Generation:</strong> Producing responses that acknowledge and address the emotional dimension of interactions</li>
        <li><strong>Emotional Memory:</strong> Maintaining awareness of emotional patterns across interactions</li>
      </ul>
      
      <p>At RootStock, our research has focused particularly on developing these capabilities for financial advisory contexts, where emotional factors often drive decision-making as much as rational analysis.</p>
      
      <h3>Case Study: Emotion-Aware Investment Advising</h3>
      
      <p>Our experimental emotion-aware investment advisory system demonstrated significant improvements in client satisfaction and decision quality compared to traditional systems. The key differences:</p>
      
      <ol>
        <li>The system recognized anxiety signals in client communications during market volatility</li>
        <li>It adjusted its communication style to provide reassurance while maintaining factual accuracy</li>
        <li>It proactively suggested risk-appropriate actions that acknowledged emotional concerns</li>
      </ol>
      
      <p>The result was a 34% reduction in panic-driven selling during market downturns and a 28% increase in client-reported trust scores.</p>
      
      <h3>Ethical Considerations</h3>
      
      <p>Developing emotionally intelligent AI raises important ethical questions:</p>
      
      <ul>
        <li>How do we ensure emotional recognition respects privacy?</li>
        <li>What guardrails prevent emotional manipulation?</li>
        <li>How do we maintain transparency about the emotional capabilities of AI systems?</li>
      </ul>
      
      <p>We believe these questions must be addressed through a combination of technical safeguards, clear disclosure practices, and ongoing stakeholder dialogue.</p>
      
      <h3>The Path Forward</h3>
      
      <p>As we continue developing emotionally intelligent AI systems, we're focused on creating tools that enhance human emotional well-being rather than exploiting it. The goal isn't to simulate emotions, but to recognize and respond to them in ways that support better outcomes for the humans we serve.</p>
    `,
  },
  {
    slug: "case-studies-and-whitepapers",
    title: "Case Studies & Whitepapers",
    date: "Dec 5, 2024",
    readTime: "12 min",
    content: `
      <h2>Case Studies & Technical Whitepapers</h2>
      
      <p>At RootStock, we believe in sharing our research and implementation insights with the broader community. This collection highlights some of our recent case studies and technical whitepapers on AI implementation in financial services.</p>
      
      <h3>Case Study: Implementing Explainable AI for Credit Decisions</h3>
      
      <p>Working with a mid-sized regional bank, we implemented an explainable AI system for credit decisioning that balanced accuracy with transparency. Key outcomes included:</p>
      
      <ul>
        <li>14% improvement in credit decision accuracy</li>
        <li>28% reduction in customer appeals of credit decisions</li>
        <li>42% increase in customer satisfaction with decision explanations</li>
      </ul>
      
      <p>The technical approach combined gradient-based feature attribution methods with a novel natural language explanation generator that produced contextually appropriate, personalized explanations for each decision.</p>
      
      <h3>Whitepaper: Architectural Patterns for Responsible AI in Finance</h3>
      
      <p>This technical whitepaper outlines architectural patterns for implementing responsible AI systems in financial services, with a focus on:</p>
      
      <ol>
        <li><strong>Federated Learning Patterns:</strong> Maintaining data privacy while enabling model training</li>
        <li><strong>Explainability Layers:</strong> Integrating explanation generation into the inference pipeline</li>
        <li><strong>Fairness Monitoring:</strong> Continuous evaluation of model outputs for demographic biases</li>
        <li><strong>Human-in-the-Loop Workflows:</strong> Effective designs for human oversight of AI decisions</li>
      </ol>
      
      <p>Each pattern includes implementation considerations, code examples, and lessons learned from real-world deployments.</p>
      
      <h3>Case Study: AI-Assisted Financial Planning for Underserved Communities</h3>
      
      <p>In partnership with a nonprofit financial counseling service, we developed an AI-assisted planning tool specifically designed for underserved communities. The system addressed unique challenges including:</p>
      
      <ul>
        <li>Variable and unpredictable income streams</li>
        <li>Limited credit history</li>
        <li>Complex government benefit interactions</li>
      </ul>
      
      <p>The results showed a 37% increase in savings rates among participants and a 24% reduction in financial stress as measured by standardized assessments.</p>
      
      <h3>Whitepaper: Benchmarking Methodologies for Financial AI Systems</h3>
      
      <p>This technical paper presents a comprehensive framework for benchmarking AI systems in financial contexts, covering:</p>
      
      <ul>
        <li>Performance metrics beyond accuracy (calibration, robustness, fairness)</li>
        <li>Stress testing methodologies for market volatility scenarios</li>
        <li>Human evaluation protocols for assessing explanation quality</li>
        <li>Longitudinal evaluation approaches for tracking performance drift</li>
      </ul>
      
      <p>The framework has been adopted by several financial institutions and is being considered as a standard by industry working groups.</p>
    `,
  },
];

export default function BlogPostPage() {
  // Use the useParams hook to access route parameters
  const params = useParams();
  const slug = params.slug as string;
  const [customPost, setCustomPost] = useState<{
    slug: string;
    title: string;
    date: string;
    readTime: string;
    content?: string;
    image?: string;
  } | null>(null);

  const builtinPost = useMemo(() => builtin.find((p) => p.slug === slug) || null, [slug]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("customPosts");
      if (!raw) return;
      const parsed = JSON.parse(raw) as Array<any>;
      const match = parsed.find((p) => p.slug === slug);
      if (match) {
        setCustomPost({
          slug: match.slug,
          title: match.title,
          date: match.date,
          readTime: match.readTime,
          content: match.content,
          image: match.image,
        });
      }
    } catch {}
  }, [slug]);

  // Try server store as well
  useEffect(() => {
    fetch('/api/posts')
      .then(r => r.json())
      .then((posts: any[]) => {
        const m = posts.find(p => p.slug === slug);
        if (m) {
          setCustomPost({
            slug: m.slug,
            title: m.title,
            date: m.date,
            readTime: m.readTime,
            content: m.content,
            image: m.image,
          });
        }
      })
      .catch(() => {});
  }, [slug]);

  const post = customPost || builtinPost;

  return (
    <main className="bg-gray-900 min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#16BAC5]/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[#7AE582]/25 blur-3xl" />

        <div className="container mx-auto px-6 pt-16 pb-10">
          <div className="max-w-3xl">
            <Link href="/blog" className="text-[#7AE582] hover:text-white text-sm font-semibold">← All posts</Link>
            {post ? (
              <>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mt-3">
                  {post.title}
                </h1>
                <p className="text-white/70 mt-2 text-sm">
                  {post.date} • {post.readTime}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mt-3">Post not found</h1>
                <p className="text-white/70 mt-2 text-sm">We couldn't find this article.</p>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-6">
          {post ? (
            <article className="prose prose-invert max-w-3xl">
              {customPost?.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={customPost.image} alt={post.title} className="rounded-2xl border border-white/10 mb-6" />
              )}
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: post.content || "<p>This post was published via the Admin panel. Add full content in the Admin form to replace this placeholder.</p>" 
                }} 
                className="prose-headings:text-white prose-headings:font-bold prose-p:text-white prose-strong:text-white prose-strong:font-semibold prose-li:text-white prose-li:marker:text-[#7AE582] prose-a:text-[#7AE582] hover:prose-a:text-white prose-a:transition-colors"
              />
            </article>
          ) : (
            <div className="prose prose-invert max-w-3xl">
              <p>Try returning to the <Link href="/blog" className="text-[#7AE582]">blog index</Link>.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
