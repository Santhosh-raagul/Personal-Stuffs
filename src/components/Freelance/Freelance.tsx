'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Freelance.module.css';

gsap.registerPlugin(ScrollTrigger);

const FREELANCE = [
  {
    number: '01',
    title: 'AI-Augmented Dev Pipeline',
    client: 'Fintech Startup',
    period: '2025',
    status: 'Delivered',
    desc: 'Built a fully agentic development workflow using Claude Code for a fintech startup — automating code scaffolding, test generation, and PR review pipelines. Cut feature delivery cycles by ~40% across a 3-person engineering team.',
    tags: ['Claude Code', 'Next.js', 'TypeScript', 'GitHub Actions', 'Node.js'],
    metric: '~40% faster delivery',
  },
  {
    number: '02',
    title: 'Fintech Analytics Dashboard',
    client: 'Lending Startup',
    period: '2025',
    status: 'Delivered',
    desc: 'Designed and built a real-time financial analytics UI with live loan pipeline views, dynamic charts, and multi-role permission layers. Delivered from Figma to production-ready React.',
    tags: ['React.js', 'Recharts', 'Tailwind CSS', 'REST APIs', 'Figma'],
    metric: 'Real-time analytics',
  },
  {
    number: '03',
    title: 'Cinematic Portfolio System',
    client: 'Creative Professionals',
    period: '2026',
    status: 'Live',
    desc: 'Award-quality portfolio template built with Next.js 16, Three.js bokeh particle system, and GSAP entrance animations. 100% agentic development using Claude Code. The very site you\'re viewing.',
    tags: ['Next.js', 'Three.js', 'GSAP', 'TypeScript', 'Claude Code'],
    metric: 'This site',
  },
];

export default function Freelance() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.headerArea}`, {
        opacity: 0, y: 24, duration: 0.9,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(`.${styles.card}`, {
        opacity: 0, y: 40, duration: 0.75, stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="freelance" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerArea}>
          <span className={styles.label}>Freelance</span>
          <h2 className={styles.heading}>Independent work</h2>
        </div>

        <div className={styles.grid}>
          {FREELANCE.map((p) => (
            <div key={p.number} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.number}>{p.number}</span>
                <div>
                  <span className={styles.cardClient}>{p.client}</span>
                  <span className={styles.cardPeriod}>{p.period}</span>
                </div>
                <span className={`${styles.statusBadge} ${p.status === 'Live' ? styles.live : ''}`}>
                  {p.status}
                </span>
              </div>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.desc}</p>
              <div className={styles.cardBottom}>
                <div className={styles.tags}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <span className={styles.cardMetric}>{p.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
