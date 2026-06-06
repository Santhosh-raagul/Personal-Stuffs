'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: '10+', label: 'Months experience' },
  { value: '93%', label: 'API latency reduced' },
  { value: 'Java', label: 'Primary backend language' },
  { value: '3+', label: 'Projects shipped' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.label}`, {
        opacity: 0, y: 16, duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(`.${styles.heading}`, {
        opacity: 0, y: 30, duration: 1, delay: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(`.${styles.body}`, {
        opacity: 0, y: 24, duration: 0.9, delay: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
      gsap.from(`.${styles.statCard}`, {
        opacity: 0, y: 30, duration: 0.7, stagger: 0.12, delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.textCol}>
          <span className={styles.label}>About</span>
          <h2 className={styles.heading}>
            Backend at heart,<br />
            <em>full stack by craft</em>
          </h2>
          <p className={styles.body}>
            I&apos;m <strong>Santhosh Raagul</strong>, a <em>Java Full Stack Developer</em> at{' '}
            <strong>FinSurge Pvt Ltd</strong>, building production-grade Fintech systems from the
            database layer up. My core strength is <strong>Java backend engineering</strong> —
            Spring Boot microservices, async parallel pipelines, and high-throughput REST APIs —
            paired with hands-on React.js frontend experience across real client projects.
          </p>
          <p className={styles.body}>
            I&apos;ve worn the frontend hat too: designing and shipping complete React interfaces,
            digital HR workflows, and real-time dashboards. That dual perspective means I build
            backends that frontends <em>actually love</em> to consume, and UIs that respect what
            the server can do.
          </p>
          <p className={styles.body}>
            Outside my full-time role I take on select freelance projects — from AI-powered
            learning platforms to fintech dashboards — many of them built with Claude Code for
            agentic development workflows.
          </p>
        </div>

        <div className={styles.statsCol}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.statCard}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
