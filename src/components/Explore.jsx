import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocateFixed, Activity, Radar, Database } from 'lucide-react';

const hotspots = [
  { id: 1, x: '30%', y: '40%', icon: <Activity />, title: 'Core Sample', desc: 'Analyzing subterranean ice deposits.' },
  { id: 2, x: '70%', y: '30%', icon: <Radar />, title: 'Atmosphere Check', desc: 'CO2 levels stable. High wind potential.' },
  { id: 3, x: '50%', y: '70%', icon: <LocateFixed />, title: 'Nav System', desc: 'Terrain mapping active. Grid lock secured.' },
];

const Explore = () => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [lightsOn, setLightsOn] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-[#110d10] overflow-hidden flex flex-col items-center py-20">
      
      {/* Background Terrain Layer */}
      <div 
        className="absolute inset-0 bg-[#3d1810] z-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: "linear-gradient(0deg, #110d10 0%, transparent 100%)"
        }}
      />
      
      {/* 3D-ish Floor Grid Context */}
      <div className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: "linear-gradient(to right, #ff5722 1px, transparent 1px), linear-gradient(to bottom, #ff5722 1px, transparent 1px)",
          transform: "perspective(500px) rotateX(60deg) scale(2)",
          transformOrigin: "bottom center"
        }}
      />

      <div className="relative z-20 text-center mb-10 pointer-events-none">
        <h2 className="text-xl md:text-2xl font-mono text-[#ffbda8] tracking-[0.5em] uppercase mb-4 text-glow-orange">
          Discovery
        </h2>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white/90 drop-shadow-lg">
          Explore The Surface
        </h1>
      </div>

      {/* Interactive Rover Section */}
      <div className="relative w-full max-w-4xl h-[60vh] mt-[5vh] flex justify-center items-center z-10 z-[20]">
        
        {/* Rover SVG / CSS representation */}
        <motion.div 
          className="relative w-[300px] h-[200px] cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => setLightsOn(!lightsOn)}
        >
          {/* Body */}
          <div className="absolute top-[40%] left-[10%] w-[80%] h-[40%] bg-gradient-to-r from-gray-300 to-gray-500 rounded-lg shadow-2xl border-t border-gray-100" />
          
          {/* Wheels */}
          <div className="absolute top-[70%] left-[5%] w-12 h-12 bg-neutral-900 rounded-full border-4 border-gray-600 shadow-[0_5px_15px_rgba(0,0,0,0.8)]" />
          <div className="absolute top-[70%] left-[40%] w-12 h-12 bg-neutral-900 rounded-full border-4 border-gray-600 shadow-[0_5px_15px_rgba(0,0,0,0.8)]" />
          <div className="absolute top-[70%] right-[5%] w-12 h-12 bg-neutral-900 rounded-full border-4 border-gray-600 shadow-[0_5px_15px_rgba(0,0,0,0.8)]" />
          
          {/* Camera Mast */}
          <div className="absolute top-[10%] left-[30%] w-[10px] h-[35%] bg-gray-400" />
          <div className="absolute top-[5%] left-[25%] w-10 h-8 bg-black rounded-md border border-gray-500 flex justify-center items-center">
             {/* Dynamic Light */}
             <motion.div 
               animate={{ opacity: lightsOn ? 1 : 0.2 }}
               className="w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_20px_#00d2ff]"
             />
          </div>

          {/* Prompt */}
          <motion.div 
             animate={{ opacity: lightsOn ? 0 : 1 }}
             className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs font-mono text-white/50 tracking-widest uppercase whitespace-nowrap"
          >
             Click to toggle lights
          </motion.div>
        </motion.div>

        {/* Hotspots */}
        {hotspots.map((spot) => (
          <div 
            key={spot.id} 
            className="absolute z-30"
            style={{ top: spot.y, left: spot.x }}
          >
            <motion.div 
              className="relative w-8 h-8 rounded-full bg-[#ff5722] text-white flex justify-center items-center cursor-pointer shadow-[0_0_15px_rgba(255,87,34,0.6)]"
              whileHover={{ scale: 1.2, backgroundColor: "#fff", color: "#ff5722" }}
              onHoverStart={() => setActiveHotspot(spot)}
              onHoverEnd={() => setActiveHotspot(null)}
            >
              {spot.icon}
              <div className="absolute inset-0 rounded-full border border-white opacity-50 animate-ping" />
            </motion.div>
          </div>
        ))}
        
      </div>

      {/* Glassmorphism Info Panel */}
      <div className="absolute bottom-[5vh] left-1/2 -translate-x-1/2 w-[90%] max-w-2xl h-[120px] pointer-events-none z-40">
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="w-full h-full glass rounded-xl p-6 flex items-center gap-6"
            >
              <div className="w-12 h-12 rounded-full bg-[#ff5722]/20 flex justify-center items-center text-[#ff5722]">
                 <Database />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-bold font-mono text-[#ffbda8]">{activeHotspot.title}</h3>
                <p className="text-white/70 text-sm mt-1">{activeHotspot.desc}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Placeholder instruction */}
        {!activeHotspot && (
            <div className="w-full h-full flex justify-center items-center text-white/30 font-mono tracking-widest uppercase text-sm">
                Hover hotspots for telemetry
            </div>
        )}
      </div>
      
    </div>
  );
};

export default Explore;
