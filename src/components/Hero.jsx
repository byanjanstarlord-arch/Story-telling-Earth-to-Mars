import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Hero = () => {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const earthRef = useRef(null);
  const starsRef = useRef(null);
  const ctaRef = useRef(null);

  useGSAP(() => {
    // Entrance Animation (Waits for loading screen, ~1.5s delay)
    const initTl = gsap.timeline({ delay: 1.5 });
    
    initTl
      .from(starsRef.current, { opacity: 0, duration: 2, ease: "linear" })
      .from(earthRef.current, { scale: 0.8, opacity: 0, duration: 2, ease: "power3.out" }, "-=1.5")
      .from([title1Ref.current, title2Ref.current], {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 1.5,
        ease: "power4.out"
      }, "-=1.5")
      .from(ctaRef.current, { opacity: 0, y: 20, duration: 1 }, "-=0.5");

    // Infinite slow rotation for realism
    gsap.to(earthRef.current, {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: "none"
    });

    // Scroll Animation - Earth slowly moves away
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1, // smooth scrubbing
        pin: true,
      }
    });

    scrollTl
      .to(earthRef.current, {
        scale: 0.2,
        yPercent: 50,
        ease: "none"
      }, 0)
      .to([title1Ref.current, title2Ref.current], {
        yPercent: -100,
        opacity: 0,
        ease: "none"
      }, 0)
      .to(starsRef.current, {
        yPercent: 20,
        ease: "none"
      }, 0)
      .to(ctaRef.current, {
        opacity: 0,
        ease: "none"
      }, 0);

  }, { scope: containerRef });

  // Generate some CSS stars
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 150; i++) {
      const top = Math.random() * 100 + "%";
      const left = Math.random() * 100 + "%";
      const size = Math.random() * 3 + "px";
      const animationDuration = (Math.random() * 3 + 2) + "s";
      const animationDelay = (Math.random() * 2) + "s";
      
      stars.push(
        <div 
          key={i} 
          className="absolute bg-white rounded-full opacity-50 will-change-transform"
          style={{
            top, left, width: size, height: size,
            animation: `twinkle ${animationDuration} ease-in-out infinite alternate`,
            animationDelay
          }}
        />
      );
    }
    return stars;
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#050510] flex flex-col items-center justify-center">
      
      {/* Starfield Parallax Container */}
      <div ref={starsRef} className="absolute inset-0 z-0">
        {renderStars()}
      </div>

      {/* Earth Setup (Realistic Texture) */}
      <div 
        ref={earthRef} 
        className="absolute top-1/2 left-1/2 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] max-w-[800px] max-h-[800px] rounded-full z-10"
        style={{
          transform: "translate(-50%, -50%)",
          background: `url('https://upload.wikimedia.org/wikipedia/commons/2/22/Earth_Western_Hemisphere_transparent_background.png') no-repeat center/cover`,
          boxShadow: `
            inset -30px -30px 60px rgba(0,0,0,0.8), /* Dark side shadow */
            inset 10px 10px 30px rgba(255,255,255,0.2), /* Light reflection */
            0 0 50px rgba(79, 172, 254, 0.3), /* Subtle atmosphere outer glow */
            0 0 120px rgba(0, 242, 254, 0.1)
          `
        }}
      >
        {/* Subtle atmospheric haze overlay */}
        <div 
          className="absolute inset-0 rounded-full mix-blend-screen pointer-events-none"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(79, 172, 254, 0.4) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Foreground Titles */}
      <div className="relative z-20 text-center flex flex-col items-center pointer-events-none mt-[10vh]">
        <h2 ref={title1Ref} className="text-xl md:text-2xl font-mono text-[#00d2ff] tracking-[0.5em] uppercase mb-4 text-glow">
          The Beginning
        </h2>
        <h1 ref={title2Ref} className="text-6xl md:text-8xl font-black uppercase tracking-tight text-white mix-blend-screen drop-shadow-2xl">
          Journey <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">To Mars</span>
        </h1>
      </div>

      {/* Scroll CTA Indicator */}
      <div ref={ctaRef} className="absolute bottom-10 z-20 flex flex-col items-center gap-2">
        <span className="text-sm font-mono tracking-widest uppercase text-white/50">Initiate Sequence</span>
        <div className="w-[1px] h-[50px] bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </div>

      {/* Base CSS for twinkle - Usually placed in index.css but keeping scoped logic pure */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2) drop-shadow(0 0 3px rgba(255,255,255,0.8)); }
        }
      `}} />
    </div>
  );
};

export default Hero;
