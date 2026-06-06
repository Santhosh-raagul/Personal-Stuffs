'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Freelance', href: '#freelance' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    gsap.from(navRef.current, { y: -24, opacity: 0, duration: 1, ease: 'power3.out', delay: 2.5 });
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav ref={navRef} className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#hero" className={styles.logo} onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}>
        SR
      </a>

      {/* Desktop links */}
      <ul className={styles.links}>
        {NAV_LINKS.map((l) => (
          <li key={l.href}>
            <button className={styles.link} onClick={() => scrollTo(l.href)}>
              {l.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`}>
        {NAV_LINKS.map((l) => (
          <button key={l.href} className={styles.drawerLink} onClick={() => scrollTo(l.href)}>
            {l.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
