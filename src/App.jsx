import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Components
import Hero from './components/Hero';
import Launch from './components/Launch';
import Space from './components/Space';
import Mars from './components/Mars';
import Explore from './components/Explore';
import LoadingScreen from './components/LoadingScreen';

// CSS
import './index.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div ref={containerRef} className="app-container relative w-full bg-[#050510] text-white selection:bg-accent-blue selection:text-white">
      {/* Cinematic Loading Transition Screen */}
      <LoadingScreen />

      {/* 1. Earth - "The Beginning" */}
      <Hero />

      {/* 2. Rocket Launch - "Ignition" */}
      <Launch />

      {/* 3. Space Travel - "The Void" */}
      <Space />

      {/* 4. Mars Landing - "Arrival" */}
      <Mars />

      {/* 5. Mars Exploration - "Discovery" */}
      <Explore />
      
      {/* Global CSS for particle effects and backgrounds will be handled within components */}
    </div>
  );
}

export default App;
