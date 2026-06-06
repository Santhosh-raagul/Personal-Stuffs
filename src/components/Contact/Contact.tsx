'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([`.${styles.label}`, `.${styles.heading}`, `.${styles.sub}`, `.${styles.links}`, `.${styles.footer}`], {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.12,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.label}>Contact</span>
        <h2 className={styles.heading}>
          Let&apos;s build something<br />
          <em>remarkable</em>
        </h2>
        <p className={styles.sub}>
          Open to full-time opportunities, freelance projects, and creative collaborations.<br />
          I respond to every genuine message.
        </p>

        <div className={styles.links}>
          <a href="mailto:santhoshraagulmb@gmail.com" className={styles.emailBtn}>
            santhoshraagulmb@gmail.com
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
              <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <div className={styles.socials}>
            <a
              href="https://www.linkedin.com/in/santhoshraagul/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              LinkedIn
            </a>
            <a href="tel:8072043680" className={styles.socialBtn}>
              +91 807 204 3680
            </a>
          </div>
        </div>

        <footer className={styles.footer}>
          <span>© {new Date().getFullYear()} Santhosh Raagul. Crafted with precision.</span>
          <span className={styles.footerStack}>Next.js · Three.js · GSAP</span>
        </footer>
      </div>
    </section>
  );
}
