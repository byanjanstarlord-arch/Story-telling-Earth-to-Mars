import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Rocket } from 'lucide-react';

const Launch = () => {
  const containerRef = useRef(null);
  const rocketGroupRef = useRef(null);
  const flashRef = useRef(null);
  const titleGroupRef = useRef(null);
  const engineFireRef = useRef(null);
  const smokeRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Pin for 2 viewport heights
        scrub: 1,
        pin: true,
      }
    });

    // 1. Initial State
    tl.set(rocketGroupRef.current, { yPercent: 40 })
      .set(engineFireRef.current, { scaleY: 0, opacity: 0 })
      .set(flashRef.current, { opacity: 0 });

    // 2. Ignition Flash & Shake
    tl.to(flashRef.current, { opacity: 0.8, duration: 0.1, ease: "power4.in" })
      .to(containerRef.current, {
        x: () => Math.random() * 20 - 10,
        y: () => Math.random() * 20 - 10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: "none"
      }, "<")
      .to(flashRef.current, { opacity: 0, duration: 0.4 }, ">")
      
    // 3. Engine Fire Start
    tl.to(engineFireRef.current, { scaleY: 1, opacity: 1, duration: 0.3, ease: "bounce.out" }, "-=0.2")

    // 4. Liftoff / Ascend
    tl.to(rocketGroupRef.current, {
      yPercent: -150,
      scale: 0.5,
      ease: "power2.inOut",
      duration: 2
    }, "+=0.2")
    
    // Smoke trails
    tl.to(smokeRef.current, {
      opacity: 0.5,
      scale: 3,
      yPercent: 100,
      filter: "blur(20px)",
      duration: 2,
      ease: "power1.out"
    }, "<");

    // Title fade out
    tl.to(titleGroupRef.current, {
      opacity: 0,
      y: -50,
      duration: 1
    }, "-=1.5");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-[#0b0b1a] to-[#050510] flex flex-col items-center justify-center">
      
      {/* Background Flash Effect */}
      <div ref={flashRef} className="absolute inset-0 bg-[#ff5722] mix-blend-overlay z-10 pointer-events-none" />

      {/* Titles */}
      <div ref={titleGroupRef} className="absolute top-[15%] z-20 flex flex-col items-center pointer-events-none">
        <h2 className="text-xl md:text-2xl font-mono text-[#ff5722] tracking-[0.5em] uppercase mb-4 text-glow-orange">
          Ignition
        </h2>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white/90 drop-shadow-2xl">
          Liftoff
        </h1>
      </div>

      {/* Rocket & Effects Group */}
      <div ref={rocketGroupRef} className="relative z-30 flex flex-col items-center justify-center w-32 h-64 mt-[20vh]">
        {/* The Rocket (using Lucide icon layered over custom CSS body) */}
        <div className="relative flex flex-col items-center z-10 group cursor-pointer">
          {/* Main Cone */}
          <div className="w-0 h-0 border-l-[30px] border-r-[30px] border-b-[60px] border-transparent border-b-gray-200" />
          {/* Cylinder Body */}
          <div className="w-[60px] h-[120px] bg-gradient-to-b from-gray-200 to-gray-500 rounded-b-md relative shadow-[-10px_0_15px_rgba(0,0,0,0.5)_inset]">
             {/* Window */}
             <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-900 border-4 border-gray-400 shadow-inner" />
          </div>
          {/* Fins */}
          <div className="w-[100px] h-[40px] bg-red-600 absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-full -z-10 shadow-[0_0_20px_rgba(255,0,0,0.5)]" />
        </div>

        {/* Engine Fire */}
        <div 
          ref={engineFireRef} 
          className="w-10 h-32 bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent origin-top rounded-b-full filter blur-sm z-0"
          style={{
            boxShadow: "0 10px 40px rgba(255, 87, 34, 0.8)",
            transformOrigin: "top center"
          }}
        />
        
        {/* Base Smoke Cloud Component */}
        <div ref={smokeRef} className="absolute top-[100%] w-[30vw] h-[30vw] min-w-[300px] min-h-[300px] rounded-full bg-white/10 opacity-0 pointer-events-none blur-3xl mix-blend-screen" />
      </div>

    </div>
  );
};

export default Launch;
