'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Projects.module.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    number: '01',
    title: 'TBank – Loan Origination System',
    company: 'FinSurge · FinTech',
    period: 'Aug 2025 – Present',
    status: 'Live',
    desc: 'Enterprise-grade LOS platform for a Tier-1 bank covering end-to-end loan origination including CIB integration. Re-architected the CIB module into async parallel pipelines (CompletableFuture), cutting execution time from 20s to 1.3s. Built a dynamic payload engine to transform XML/JSON API responses into a normalised schema — solving impedance-mismatch across 1000+ fields. Also delivered a secure LOS-to-DMS sync pipeline with JWT-based RBAC.',
    tags: ['Java', 'Spring Boot', 'CompletableFuture', 'React.js', 'MySQL', 'JWT', 'REST APIs', 'JPA/JPQL', 'XML/JSON'],
    metric: { value: '93%', label: 'faster execution' },
  },
  {
    number: '02',
    title: 'Resource Management Tool',
    company: 'FinSurge · HR Tech',
    period: 'Feb 2025 – Aug 2025',
    status: 'Live',
    desc: 'Digitised the entire HR workflow lifecycle — Exit Clearance, Performance Appraisal, and Leave Management — converting manual paper-based processes into multi-stage digital forms. Modelled after industry standard GreytHR.',
    tags: ['React.js', 'Material UI', 'Spring Boot', 'REST APIs', 'MySQL'],
    metric: { value: '3', label: 'modules automated' },
  },
  {
    number: '03',
    title: 'Early Warning System',
    company: 'FinSurge · Risk & Compliance',
    period: 'Apr 2026 – Present',
    status: 'Demo Ready',
    desc: 'A risk intelligence platform built 100% agentically using Claude Code. Pulls real customer financial data from external APIs, analyses behavioural and transactional patterns, and auto-generates risk alerts whenever suspicious or anomalous activity is detected. Sole developer for both Java/Spring Boot backend and Angular frontend.',
    tags: ['Java', 'Spring Boot', 'Angular', 'REST APIs', 'MySQL', 'Claude Code', 'JWT'],
    metric: { value: '100%', label: 'agentic build' },
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.headerArea}`, {
        opacity: 0, y: 24, duration: 0.9,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(`.${styles.card}`, {
        opacity: 0, y: 50, duration: 0.75, stagger: 0.18,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerArea}>
          <span className={styles.label}>Professional Work</span>
          <h2 className={styles.heading}>Built at FinSurge</h2>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => (
            <div key={i} className={`${styles.card} ${i === 0 ? styles.featured : ''} ${i === 1 ? styles.featured : ''} ${i === 2 ? styles.agentic : ''}`}>
              <div className={styles.cardTop}>
                <span className={styles.number}>{p.number}</span>
                <div className={styles.cardMeta}>
                  <span className={styles.company}>{p.company}</span>
                  <span className={styles.period}>{p.period}</span>
                </div>
                <span className={`${styles.statusBadge} ${p.status === 'Demo Ready' ? styles.demoReady : ''}`}>{p.status}</span>
              </div>

              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.desc}>{p.desc}</p>

              <div className={styles.cardBottom}>
                <div className={styles.tags}>
                  {p.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
                <div className={styles.metricBlock}>
                  <span className={styles.metricValue}>{p.metric.value}</span>
                  <span className={styles.metricLabel}>{p.metric.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
