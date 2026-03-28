import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const LoadingScreen = () => {
  const container = useRef(null);
  const loadingText = useRef(null);
  const progressBar = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Progress bar fills up
    tl.to(progressBar.current, {
      scaleX: 1,
      duration: 2,
      ease: "power2.inOut"
    })
    // Text glitches/fades
    .to(loadingText.current, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: "power1.in"
    }, "-=0.2")
    // Hide the whole screen to reveal Earth
    .to(container.current, {
      yPercent: -100,
      duration: 1.5,
      ease: "power4.inOut",
      onComplete: () => {
        // Hide from DOM conceptually if needed or leave out of view
        gsap.set(container.current, { display: "none" });
      }
    });
  }, { scope: container });

  return (
    <div
      ref={container}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050510] text-white"
    >
      <div className="relative flex flex-col items-center">
        <h1 ref={loadingText} className="text-4xl md:text-6xl font-black tracking-[0.2em] uppercase mb-8 text-glow">
          Initiating Sequence
        </h1>
        
        {/* Progress Bar Container */}
        <div className="w-[300px] md:w-[500px] h-[2px] bg-white/10 relative overflow-hidden rounded-full">
          {/* Active Progress */}
          <div 
            ref={progressBar} 
            className="absolute top-0 left-0 h-full w-full bg-[#00d2ff] origin-left scale-x-0 shadow-[0_0_10px_#00d2ff]"
          />
        </div>
        <div className="mt-4 text-sm tracking-widest text-[#00d2ff]/70 font-mono">
          SYSTEM CALIBRATION
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
