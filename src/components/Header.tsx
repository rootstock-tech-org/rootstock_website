'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps { activeSection?: string }

const links = [
  { label: 'Solutions', href: '/#solutions' },
  { label: 'Approach', href: '/#approach' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Header({ activeSection }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => { frame = 0; setScrolled(window.scrollY > 12); };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.cancelAnimationFrame(frame); };
  }, []);

  return (
    <header className={`b2b-header${scrolled || open ? ' is-scrolled' : ''}`} data-active-section={activeSection}>
      <div className="b2b-container b2b-header-inner">
        <Link href="/" className="b2b-brand" aria-label="RootStock Technology home" onClick={() => setOpen(false)}>
          <Image src="/RootStock.jpeg" alt="" width={42} height={42} priority />
          <span><strong>RootStock</strong><small>TECHNOLOGY</small></span>
        </Link>
        <nav className="b2b-desktop-nav" aria-label="Main navigation">
          {links.map((link) => <Link href={link.href} key={link.label}>{link.label}</Link>)}
        </nav>
        <button
          className="b2b-menu-toggle"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="b2b-mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span />
        </button>
      </div>
      {open && (
        <nav id="b2b-mobile-nav" className="b2b-mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => <Link href={link.href} key={link.label} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">↗</span></Link>)}
        </nav>
      )}
    </header>
  );
}
