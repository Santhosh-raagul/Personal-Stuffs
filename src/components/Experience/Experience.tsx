'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Experience.module.css';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    role: 'Associate Software Developer',
    company: 'FinSurge Pvt Ltd',
    period: 'Aug 2025 – Present',
    type: 'Full-time',
    project: 'TBank – LOS · Early Warning System · CIB Integration',
    highlights: [
      "Achieved a 93% reduction in execution time (20s to 1.3s) for the CIB module by re-architecting synchronous flows into asynchronous parallel pipelines using Java's CompletableFuture.",
      'Engineered a dynamic payload engine to transform complex XML/JSON datasets, solving impedance-mismatch by mapping 1000+ fields to a normalised database schema.',
      'Built and delivered a 100% agentic Early Warning System using Claude Code — pulls real customer data from external APIs, analyses behavioural patterns, and auto-generates risk alerts for suspicious activity. Handled both Java/Spring Boot backend and Angular frontend end-to-end. Demo-ready for client (Apr 2026 – Present).',
      'Built a secure LOS-to-DMS data synchronisation pipeline via RESTful APIs with JWT-based role-based access control.',
      'Optimised MySQL queries via JPA/JPQL and collaborated with QA to test and debug critical loan-processing modules.',
    ],
    tags: ['Java', 'Spring Boot', 'Angular', 'CompletableFuture', 'React.js', 'MySQL', 'JWT', 'REST APIs', 'Claude Code'],
  },
  {
    role: 'Software Developer – Intern',
    company: 'FinSurge Pvt Ltd',
    period: 'Feb 2025 – Aug 2025',
    type: 'Internship',
    project: 'Resource Management Tool',
    highlights: [
      'Led the frontend migration of Exit Clearance and Performance Appraisal modules, converting manual paper workflows into digital multi-stage forms using React.js.',
      'Designed and implemented the UI for a new Leave Management System benchmarked against industry standards (GreytHR), delivering a seamless self-service experience.',
    ],
    tags: ['React.js', 'Material UI', 'HTML5', 'CSS3', 'REST APIs'],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.headerArea}`, {
        opacity: 0, y: 24, duration: 0.9,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(`.${styles.card}`, {
        opacity: 0, y: 40, duration: 0.8, stagger: 0.2,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerArea}>
          <span className={styles.label}>Experience</span>
          <h2 className={styles.heading}>Where I&apos;ve worked</h2>
        </div>

        <div className={styles.timeline}>
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardLeft}>
                <span className={styles.period}>{exp.period}</span>
                <span className={styles.typeBadge}>{exp.type}</span>
              </div>
              <div className={styles.cardDivider}>
                <div className={styles.dot} />
                <div className={styles.line} />
              </div>
              <div className={styles.cardRight}>
                <h3 className={styles.role}>{exp.role}</h3>
                <span className={styles.company}>{exp.company}</span>
                <span className={styles.project}>{exp.project}</span>
                <ul className={styles.highlights}>
                  {exp.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
                <div className={styles.tags}>
                  {exp.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
