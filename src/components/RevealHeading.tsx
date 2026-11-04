import type { CSSProperties, ReactNode } from 'react';

type RevealHeadingProps = { as?: 'h1' | 'h2' | 'h3'; lines: ReactNode[]; className?: string; id?: string };

export default function RevealHeading({ as: Tag = 'h2', lines, className, id }: RevealHeadingProps) {
  return <Tag id={id} className={className} data-reveal="lines">
    {lines.map((line, index) => <span key={index} className="reveal-line" style={{ '--line-i': index } as CSSProperties}><span>{line}</span></span>)}
  </Tag>;
}
