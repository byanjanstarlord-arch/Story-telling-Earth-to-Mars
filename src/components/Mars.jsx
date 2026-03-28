import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Mars = () => {
  const containerRef = useRef(null);
  const marsBodyRef = useRef(null);
  const atmosphereRef = useRef(null);
  const dustRef = useRef(null);
  const titleRef = useRef(null);
  const marsTextureRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // Pin for 3 screens for a long approach
        scrub: 1,
        pin: true,
      }
    });

    // Initial state
    tl.set(dustRef.current, { opacity: 0, scale: 0.5 })
      .set(atmosphereRef.current, { opacity: 0 });

    // 1. Mars approaching (scales massively from small to filling the screen)
    tl.to(marsBodyRef.current, {
      scale: 30, // Scale up massive to dive inside
      duration: 4,
      ease: "power2.in" // Accelerates as we get closer
    }, 0)
      // Add some rotation as we approach
      .to(marsTextureRef.current, {
        rotation: 45,
        duration: 4,
        ease: "none"
      }, 0)

      // 2. Entering Atmosphere (Around 60% of the way through)
      .to(atmosphereRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power1.in"
      }, 2)
      .to(containerRef.current, {
        backgroundColor: "#b25d38", // Background turns rust colored inside atmosphere
        duration: 1
      }, 2.5)

      // 3. Dust particles hit the camera when we are inside
      .to(dustRef.current, {
        opacity: 1,
        scale: 1.2,
        duration: 1.5,
        ease: "power2.out"
      }, 2.5)

      // 4. Title fades in as we hit the atmosphere
      .from(titleRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: "power3.out"
      }, 2)
      // Title zooms past the camera at the very end
      .to(titleRef.current, {
        scale: 3,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "power2.in"
      }, 3.2);

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#000005]">

      {/* Background Atmosphere Overlays (Visible when inside) */}
      <div
        ref={atmosphereRef}
        className="absolute inset-0 z-20 bg-[#ff5722] mix-blend-overlay opacity-0 pointer-events-none"
        style={{
          boxShadow: "inset 0 0 200px rgba(178, 93, 56, 0.8)"
        }}
      />

      {/* The Red Planet (Starts distant, centered) */}
      <div
        ref={marsBodyRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[20vw] max-w-[300px] max-h-[300px] rounded-full z-10"
        style={{
          background: "radial-gradient(circle at 40% 40%, #ff5722 0%, #b25d38 50%, #2e0e0a 100%)",
          boxShadow: `
            inset -20px -20px 40px rgba(0,0,0,0.8), 
            0 0 50px rgba(255,87,34,0.4),
            0 0 100px rgba(178, 93, 56, 0.2)
          ` // Cinematic shadows and glow
        }}
      >
        {/* Terrain texture / Craters */}
        <div
          ref={marsTextureRef}
          className="absolute inset-0 rounded-full mix-blend-multiply opacity-60"
          style={{
            backgroundImage: `radial-gradient(circle at 70% 30%, rgba(0,0,0,0.4) 10%, transparent 20%),
                              radial-gradient(circle at 20% 60%, rgba(0,0,0,0.3) 5%, transparent 15%),
                              radial-gradient(circle at 50% 80%, rgba(0,0,0,0.5) 15%, transparent 25%)`
          }}
        />
      </div>

      {/* Titles */}
      <div className="absolute top-[40%] w-full flex flex-col items-center z-30 pointer-events-none">
        <div ref={titleRef} className="text-center">
          <h2 className="text-xl md:text-2xl font-mono text-[#ffbda8] tracking-[0.5em] uppercase mb-4 text-glow-orange">
            Approaching
          </h2>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
            Mars
          </h1>
        </div>
      </div>

      {/* Landing Dust / Particles (Inside Atmosphere) */}
      <div ref={dustRef} className="absolute inset-0 z-40 pointer-events-none mix-blend-screen">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: Math.random() > 0.5 ? '#ffbda8' : '#e6bca8',
              width: Math.random() * 6 + 2 + "px",
              height: Math.random() * 6 + 2 + "px",
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
              opacity: Math.random() * 0.8 + 0.2,
              animation: `storm ${Math.random() * 1 + 0.5}s linear infinite`
            }}
          />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes storm {
          0% { transform: translateY(-100px) translateX(-50px) scale(0.5); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh) translateX(50px) scale(1.5); opacity: 0; }
        }
      `}} />
    </div>
  );
};

export default Mars;
