'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Skills.module.css';

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    category: 'Core Java Backend',
    items: ['Java', 'Spring Boot', 'Microservices', 'Hibernate / JPA', 'CompletableFuture', 'JWT Auth', 'RESTful APIs', 'JUnit'],
  },
  {
    category: 'Frontend',
    items: ['React.js', 'Angular', 'Next.js', 'TypeScript', 'Material UI', 'Tailwind CSS', 'HTML5', 'CSS3'],
  },
  {
    category: 'Database & Tools',
    items: ['MySQL', 'JPA / JPQL', 'Postman', 'Swagger / OpenAPI', 'Git', 'Debugging & Analysis'],
  },
  {
    category: 'AI & Agentic Dev',
    items: ['Claude Code', 'Prompt Engineering', 'Agentic Workflows', 'AI-assisted Scaffolding', 'GitHub Actions'],
  },
  {
    category: 'Core Concepts',
    items: ['Data Structures & Algorithms', 'OOP', 'Low-Level Design', 'Async / Parallel Patterns', 'Performance Engineering'],
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(`.${styles.headerArea}`, {
        opacity: 0, y: 24, duration: 0.9,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
      gsap.from(`.${styles.group}`, {
        opacity: 0, y: 30, duration: 0.7, stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      });
      gsap.from(`.${styles.pill}`, {
        opacity: 0, scale: 0.85, duration: 0.4, stagger: 0.03,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.headerArea}>
          <span className={styles.label}>Skills</span>
          <h2 className={styles.heading}>Java backend · React frontend</h2>
        </div>

        <div className={styles.grid}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className={styles.group}>
              <span className={styles.category}>{group.category}</span>
              <div className={styles.pills}>
                {group.items.map((item) => (
                  <span key={item} className={styles.pill}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
