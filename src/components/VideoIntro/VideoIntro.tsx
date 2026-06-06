'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import styles from './VideoIntro.module.css';

const CinematicLayer = dynamic(() => import('@/components/CinematicLayer/CinematicLayer'), {
  ssr: false,
});

export default function VideoIntro() {
  const heroRef = useRef<HTMLElement>(null);
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [soundHintVisible, setSoundHintVisible] = useState(true);
  const userPausedRef = useRef(false);

  const safePlay = (v: HTMLVideoElement | null) => {
    if (!v) return;
    v.play().catch(() => {
      // Browser blocked autoplay or source not ready yet — silently ignore.
      // The video will play once the user interacts or the source loads.
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(overlayRef.current, { opacity: 0, duration: 1.8 })
        .from(`.${styles.tagline}`, { opacity: 0, y: 18, duration: 1 }, '-=0.8')
        .from(`.${styles.firstName}`, { opacity: 0, y: 40, duration: 1.1 }, '-=0.6')
        .from(`.${styles.lastName}`, { opacity: 0, y: 40, duration: 1.1 }, '-=0.85')
        .from(`.${styles.role}`, { opacity: 0, y: 20, duration: 0.9 }, '-=0.6')
        .from(scrollIndicatorRef.current, { opacity: 0, y: 10, duration: 0.8 }, '-=0.3');
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setSoundHintVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const fg = fgVideoRef.current;
        const bg = bgVideoRef.current;
        if (!fg || !bg) return;

        if (entry.isIntersecting) {
          if (!userPausedRef.current) {
            safePlay(fg);
            safePlay(bg);
            setPlaying(true);
          }
        } else {
          fg.pause();
          bg.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const v = fgVideoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    setSoundHintVisible(false);
  };

  const togglePlay = () => {
    const v = fgVideoRef.current;
    if (!v) return;
    if (v.paused) {
      userPausedRef.current = false;
      safePlay(v);
      safePlay(bgVideoRef.current);
      setPlaying(true);
    } else {
      userPausedRef.current = true;
      v.pause();
      bgVideoRef.current?.pause();
      setPlaying(false);
    }
  };

  const scrollToNext = () => {
    const next = document.querySelector('#about') ?? document.getElementById('next-section');
    if (next) {
      next.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className={styles.hero}>
      {/* Ambient blurred background video */}
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Foreground talking-head video */}
      <video
        ref={fgVideoRef}
        className={styles.fgVideo}
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Cinematic gradient overlays */}
      <div ref={overlayRef} className={styles.overlays}>
        <div className={styles.overlayTop} />
        <div className={styles.overlayBottom} />
        <div className={styles.overlayLeft} />
        <div className={styles.overlayRight} />
        <div className={styles.overlayVignette} />
      </div>

      {/* Three.js particle layer */}
      <CinematicLayer />

      {/* Portfolio content */}
      <div className={styles.content}>
        <span className={styles.tagline}>Java Full Stack Developer</span>
        <h1 className={styles.nameBlock}>
          <span className={styles.firstName}>Santhosh</span>
          <span className={styles.lastName}>Raagul</span>
        </h1>
        <p className={styles.role}>
          Core Java · Spring Boot · React.js · Fintech Solutions · AI-augmented dev
        </p>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          className={styles.controlBtn}
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          className={styles.controlBtn}
          onClick={toggleMute}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
      </div>

      {/* Sound hint badge */}
      <div className={`${styles.soundHint} ${soundHintVisible ? styles.soundHintVisible : ''}`}>
        <span className={styles.soundPulse} />
        Tap for sound
      </div>

      {/* Scroll indicator */}
      <button
        ref={scrollIndicatorRef}
        className={styles.scrollIndicator}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll</span>
      </button>
    </section>
  );
}
