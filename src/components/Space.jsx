import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Space = () => {
  const containerRef = useRef(null);
  const starsBgRef = useRef(null);
  const starsMidRef = useRef(null);
  const starsFgRef = useRef(null);
  const astronautRef = useRef(null);

  useGSAP(() => {
    // Floating Astronaut Animation (Infinite)
    gsap.to(astronautRef.current, {
      y: 20,
      rotationZ: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", // 3 screens for smooth space passage
        scrub: 1,
        pin: true,
      }
    });

    // 1. Initial State (No warp text now)

    // 2. The Void - Parallax moving
    tl.to(starsBgRef.current, { yPercent: 20, duration: 1 }, 0)
      .to(starsMidRef.current, { yPercent: 50, duration: 1 }, 0)
      .to(starsFgRef.current, { yPercent: 100, duration: 1 }, 0)
      .to(astronautRef.current, { xPercent: 50, scale: 0.8, duration: 1 }, 0);

    // 3. Warp Speed Trigger
    tl.to([starsBgRef.current, starsMidRef.current, starsFgRef.current], {
      scaleY: 20, // stretch stars
      duration: 0.5,
      ease: "expo.in"
    }, 1)
      .to(astronautRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.3
      }, 1);

    // 4. Decelerate out of warp
    tl.to([starsBgRef.current, starsMidRef.current, starsFgRef.current], {
      scaleY: 1,
      duration: 0.5,
      ease: "expo.out"
    }, 1.5);

  }, { scope: containerRef });

  // Generate star fields for parallax
  const createLayer = (count, sizeCls) => {
    return Array.from({ length: count }).map((_, i) => (
      <div 
        key={i} 
        className={`absolute bg-white rounded-full ${sizeCls}`}
        style={{
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          opacity: Math.random() * 0.8 + 0.2
        }}
      />
    ));
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-[#000005]">
      
      {/* 3 Parallax Layers */}
      <div ref={starsBgRef} className="absolute inset-0 z-0 origin-center will-change-transform h-[150%] -top-[25%] opacity-30">
        {createLayer(200, "w-[1px] h-[1px]")}
      </div>
      <div ref={starsMidRef} className="absolute inset-0 z-10 origin-center will-change-transform h-[150%] -top-[25%] opacity-60">
        {createLayer(100, "w-[2px] h-[2px]")}
      </div>
      <div ref={starsFgRef} className="absolute inset-0 z-20 origin-center will-change-transform h-[150%] -top-[25%] opacity-100">
        {createLayer(50, "w-[3px] h-[3px] shadow-[0_0_5px_white]")}
      </div>



      {/* Floating Astronaut (CSS drawing) */}
      <div 
        ref={astronautRef} 
        className="absolute top-1/4 right-[20%] w-[100px] h-[150px] z-30 opacity-90 drop-shadow-[0_0_15px_rgba(40,150,255,0.4)]"
      >
        <div className="relative w-full h-full">
          {/* Helmet */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[60px] h-[55px] rounded-[30px] bg-white border-2 border-gray-300">
            <div className="absolute inset-[8px] rounded-[20px] bg-[#1a202c] shadow-inner" style={{ backgroundImage: "linear-gradient(to bottom right, rgba(255,255,255,0.2), transparent)" }} />
          </div>
          {/* Body */}
          <div className="absolute top-[60px] left-1/2 -translate-x-1/2 w-[70px] h-[70px] bg-white rounded-[20px] border-2 border-gray-300">
            <div className="mx-auto mt-2 w-10 h-10 border-2 border-gray-200 bg-gray-100 rounded-md" />
          </div>
          {/* Arms */}
          <div className="absolute top-[65px] left-[-10px] w-[30px] h-[50px] bg-white rounded-full border-2 border-gray-300 rotate-[45deg] origin-top-right -translate-x-3 translate-y-2" />
          <div className="absolute top-[65px] right-[-10px] w-[30px] h-[60px] bg-white rounded-full border-2 border-gray-300 -rotate-[30deg] origin-top-left translate-x-3" />
        </div>
      </div>
    </div>
  );
};

export default Space;
