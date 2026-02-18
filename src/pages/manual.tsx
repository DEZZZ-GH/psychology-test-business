import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, Zap, Target, Lock, Coins, ChevronRight } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';

// --- CONFIGURATION ---
const GUMROAD_URL = "https://deethinks.gumroad.com/l/CtrlAltGrow"; // 🔴 REPLACE THIS
const THEME_COLOR = "#9333ea"; // Purple-600

// --- SLIDE DATA ---
const SLIDES = [
  // --- SLIDE 0: COVER ---
  {
    id: 0,
    phase: "INITIALIZING SYSTEM...",
    title: "SYSTEM BREACH",
    subtitle: "v4.0 // Internal Architect’s Manual",
    // FIXED: Perfect Square Container (256x256px)
    icon: (
      <div className="relative w-64 h-96 mx-auto rounded-lg overflow-hidden border border-purple-500/50 shadow-[0_0_40px_rgba(147,51,234,0.3)]">
        <Image 
          src="/ebook-cover.png" 
          alt="System Breach Manual" 
          width={600} 
          height={600} 
          priority 
          className="object-cover" 
        />
      </div>
    ),
    content: "",
    chapterInfo: "TAP TO DECRYPT SPECIFICATIONS"
  }, 
  // --- SLIDE 1: SPECS ---
  {
    id: 1,
    phase: "SYSTEM SPECIFICATIONS",
    title: "YOU GET",
    subtitle: "High-Fidelity Manual",
    icon: <Lock size={64} className="text-purple-500" />,
    content: "• 20 SYSTEM CHAPTERS\n• 3 FIELD AUDITS // Bio, Strategy, & Tactics\n• RESEARCH & STUDIES\n• ZERO THEORY // Pure Kinetic Execution",
    chapterInfo: "LOADED // 100% FUNCTIONAL"
  },
  // --- SLIDE 2: MODULE 01 ---
  {
    id: 2,
    phase: "MODULE 01: HARDWARE TRACING",
    title: "THE AUDIT",
    subtitle: "Chapters 01 - 07",
    icon: <Lock size={64} />,
    content: "• CH 01: The Architect (Autopilot)\n• CH 02: The Vault (Unconscious)\n• CH 03: The Ghost (Habits)\n• CH 04: The Glitch (Patterns)\n• CH 05: The Debugger (Awareness)\n• CH 06: The Watchdog (Amygdala)\n• CH 07: The CEO (Logic)",
    chapterInfo: "DECRYPTING CORE OPERATING SYSTEM"
  },
  // --- SLIDE 3: MODULE 02 ---
  {
    id: 3,
    phase: "MODULE 02: CHEMICAL CONTROL",
    title: "THE COMMAND",
    subtitle: "Chapters 08 - 10",
    icon: <Brain size={64} />,
    content: "• CH 08: The Internal Lab (Chemistry)\n• CH 09: Chemical Warfare (Stress)\n• CH 10: Tactical Command (State)",
    chapterInfo: "OPTIMIZING NEURAL TRANSMISSION"
  },
  // --- SLIDE 4: MODULE 03 ---
  {
    id: 4,
    phase: "MODULE 03: EXTERNAL DEFENSE",
    title: "THE SHIELD",
    subtitle: "Chapters 11 - 13",
    icon: <Shield size={64} />,
    content: "• CH 11: Past Echoes (Shadows/Trauma)\n• CH 12: Emotional Wi-Fi (Contagion)\n• CH 13: The Shield (Privacy/Silence)",
    chapterInfo: "INSTALLING DEFENSIVE PROTOCOLS"
  },
  // --- SLIDE 5: MODULE 04 ---
  {
    id: 5,
    phase: "MODULE 04: RESOURCE ALLOCATION",
    title: "THE CAPITAL",
    subtitle: "Chapters 14 - 17",
    icon: <Coins size={64} />,
    content: "• CH 14: Attention Capital (The Feed)\n• CH 15: Boredom & AI (Digital Overload)\n• CH 16: Dinero (Financial Logic)\n• CH 17: Time Decay (Urgency)",
    chapterInfo: "RECLAIMING SYSTEM RESOURCES"
  },
  // --- SLIDE 6: MODULE 05 ---
  {
    id: 6,
    phase: "MODULE 05: KINETIC ENERGY",
    title: "WAR MODE",
    subtitle: "Chapters 18 - 20",
    icon: <Zap size={64} />,
    content: "• CH 18: The Primary Mission (Execution)\n• CH 19: The Resistance (Friction)\n• CH 20: Dark Fuel (Trauma-Power)",
    chapterInfo: "INITIATING MAXIMUM OUTPUT"
  },
  // --- SLIDE 7: TOOLS ---
  {
    id: 7,
    phase: "TACTICAL ARMORY",
    subtitle: "Zero-Theory Execution",
    // CUSTOM VISUAL: Big "3" Badge
    icon: (
      <div className="flex flex-col items-center justify-center py-2">
        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-500 italic tracking-tighter leading-none pr-2">
          03
        </h1>
        <div className="w-12 h-1 bg-purple-500 rounded-full my-2 shadow-[0_0_10px_#a855f7]" />
        <p className="text-[9px] font-bold text-gray-400 tracking-[0.3em] uppercase">
          DEPLOYMENT TOOLS
        </p>
      </div>
    ),
    content: "• PROTOCOL A: The Bio-Shield // (Immunity Audit)\n• PROTOCOL B: Strategic Command // (Power Audit)\n• PROTOCOL C: Kinetic Tracker // (Velocity Audit)",
    chapterInfo: "v4.0 // BONUS CONTENT"
  },
  // --- SLIDE 8: RESEARCH ---
  {
    id: 8,
    phase: "TECHNICAL VALIDATION",
    subtitle: "Clinical Evidence",
    // CUSTOM VISUAL: Huge "50+" Badge
    icon: (
      <div className="flex flex-col items-center justify-center py-2">
        <h1 className="text-6xl font-black text-white drop-shadow-[0_0_25px_rgba(147,51,234,0.6)] tracking-tighter leading-none">
          50+
        </h1>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent my-2 opacity-50" />
        <p className="text-[10px] font-bold text-purple-300 tracking-[0.3em] uppercase animate-pulse">
          CLINICAL STUDIES
        </p>
      </div>
    ),
    content: "• Amygdala Hijack (Harvard/Stanford): Research by Dr. Robert Sapolsky.\n• Dopamine Protocols (Stanford/NYU): Data from Dr. Andrew Huberman.\n• Social Contagion (Univ. of Parma): Studies by Dr. Giacomo Rizzolatti.\n• Habit Loops (MIT): Research by Dr. Ann Graybiel.",
    chapterInfo: "PEER-REVIEWED // 100% VERIFIED"
  },
  // --- SLIDE 9: CTA ---
  {
    id: 9,
    phase: "FINAL OVERRIDE",
    title: "System Activation Required",
    // FIXED: Perfect Square Container (256x256px) with stronger glow
    icon: (
      <div className="relative w-64 h-64 mx-auto rounded-xl overflow-hidden border-2 border-purple-500 shadow-[0_0_60px_rgba(147,51,234,0.5)]">
         <Image 
           src="/ebook-ccover.png" 
           alt="System Breach Manual" 
           width={600} 
           height={600} 
           priority 
           className="object-cover" 
         />
      </div>
    ),
    content: "Knowledge without action is just entertainment. Your time is decaying. Reclaim the machine.",
    chapterInfo: "STATUS: AWAITING INPUT",
    isCTA: true
  }
];

export default function ManualPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nextSlide = () => {
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  };

  const slideData = SLIDES[currentSlide];

  return (
    <div className="fixed inset-0 bg-[#050505] text-white font-sans overflow-hidden flex flex-col items-center justify-center select-none">
      <Head>
        <title>Manual Override Sequence</title>
      </Head>

      {/* --- BACKGROUND GRID --- */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-purple-900"
        style={{ backgroundImage: `linear-gradient(${THEME_COLOR} 1px, transparent 1px), linear-gradient(90deg, ${THEME_COLOR} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      {/* --- PROGRESS BAR --- */}
      <div className="absolute top-4 left-0 w-full px-4 flex gap-2 z-50">
        {SLIDES.map((_, index) => (
          <div key={index} className="h-1 flex-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-purple-600 shadow-[0_0_10px_#9333ea]"
              initial={{ width: "0%" }}
              animate={{ width: index <= currentSlide ? "100%" : "0%" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        ))}
      </div>

      {/* --- TAP ZONES --- */}
      <div className="absolute inset-0 z-40 flex">
        <div className="w-1/3 h-full" onClick={prevSlide} />
        <div className="w-2/3 h-full" onClick={nextSlide} />
      </div>

      {/* --- CONTENT --- */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
className="absolute w-full max-w-md p-6 z-30 pointer-events-none"
        >
          <div className={`border bg-[#0a0a0a]/95 backdrop-blur-xl p-8 rounded-2xl relative overflow-hidden min-h-[500px] flex flex-col ${slideData.id === 9 ? 'border-purple-500 shadow-[0_0_60px_rgba(147,51,234,0.3)] justify-center items-center text-center' : 'border-purple-500/30 shadow-[0_0_50px_rgba(147,51,234,0.15)] justify-between'}`}>
            
            {/* Corner Accents (Keep for consistency) */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-600" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-600" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-600" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-600" />

            {/* --- LAYOUT SWITCHER --- */}
            {slideData.id === 9 ? (
              // === NEW DESIGN FOR SLIDE 9 (FINAL CTA) ===
              <>
                <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }} 
                   animate={{ opacity: 1, scale: 1 }}
                   className="space-y-6 flex flex-col items-center"
                >
                  {/* Status Badge */}
                  <div className="inline-block px-4 py-1 rounded-full bg-purple-900/50 border border-purple-500 text-purple-300 text-[10px] font-mono tracking-widest uppercase animate-pulse">
                    {slideData.chapterInfo}
                  </div>

                  {/* Big Image */}
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-lg blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
                    <div className="relative">
                      {slideData.icon}
                    </div>
                  </div>

                  {/* Title & Copy */}
<div>
  {/* CHANGED: text-4xl -> text-2xl */}
  <h2 className="text-2xl font-black italic uppercase leading-none text-white mb-4 drop-shadow-[0_0_15px_rgba(147,51,234,0.8)]">
    {slideData.title}
  </h2>
                    <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto font-medium">
                      "{slideData.content}"
                    </p>
                  </div>
                </motion.div>
              </>
            ) : (
              // === STANDARD DESIGN FOR SLIDES 0-8 ===
              <>
                <div>
                  {/* Header */}
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                  >
                    <p className="text-purple-400 font-mono text-xs tracking-[0.2em] mb-2 uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                      {slideData.phase}
                    </p>
                    <h2 className="text-3xl font-black italic uppercase leading-none text-white drop-shadow-[0_0_10px_rgba(147,51,234,0.5)]">
                      {slideData.title}
                    </h2>
                    <p className="text-gray-400 font-mono text-sm mt-1">{slideData.subtitle}</p>
                  </motion.div>

                  {/* Icon OR Image Section */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex justify-center mb-8 text-purple-500"
                  >
                    {/* LOGIC: If Slide 0 (Cover), show directly. Else show inside circle. */}
                    {slideData.id === 0 ? (
                       <div className="shadow-[0_0_40px_rgba(147,51,234,0.3)]">
                          {slideData.icon}
                       </div>
                    ) : (
                      <div className="p-6 border border-purple-500/20 rounded-full bg-purple-500/5 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
                        {slideData.icon}
                      </div>
                    )}
                  </motion.div>

                  {/* Text Content */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                {slideData.content && (
                  // --- SPECIAL DESIGN FOR SLIDE 7 (THE FIELD KIT) ---
                  slideData.id === 7 ? (
                    <div className="space-y-3">
                      {slideData.content.split('\n').map((line, idx) => {
                        // Parsing logic: "• PROTOCOL A: Title // (Subtitle)"
                        const cleanLine = line.replace('• ', '');
                        const [label, rest] = cleanLine.split(': ');
                        const [title, subtitle] = rest ? rest.split(' // ') : [cleanLine, ''];

                        return (
                          <div 
                            key={idx} 
                            className="bg-white/5 border border-purple-500/20 p-4 rounded-xl relative overflow-hidden group hover:bg-white/10 transition-colors"
                          >
                            {/* Glowing Left Border */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500 shadow-[0_0_15px_#a855f7]" />
                            
                            {/* Label (PROTOCOL A) */}
                            <p className="text-[10px] font-mono text-purple-400 tracking-widest uppercase mb-1 flex items-center gap-2">
                              <Target size={10} /> {label}
                            </p>
                            
                            {/* Main Title & Subtitle */}
                            <div className="flex justify-between items-end">
                              <h3 className="text-white font-bold text-base leading-none">
                                {title}
                              </h3>
                              <span className="text-xs text-gray-500 font-mono">
                                {subtitle.replace('(', '').replace(')', '')}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) 
                  // --- STANDARD BULLET POINTS (FOR OTHER SLIDES) ---
                  : slideData.content.startsWith('•') ? (
                    <div className="space-y-4">
                      {slideData.content.split('\n').map((line, idx) => (
                        <div key={idx} className="flex gap-3 items-start">
                           {/* Custom Dot */}
                           <div className="mt-1.5 min-w-[6px] h-[6px] bg-purple-500 rounded-full shadow-[0_0_8px_#a855f7]" />
                           <p className="text-gray-200 font-medium text-sm md:text-base leading-relaxed">
                             {line.replace('• ', '')}
                           </p>
                        </div>
                      ))}
                    </div>
                  ) 
                  // --- STANDARD PARAGRAPH ---
                  : (
                    <p className="text-lg leading-relaxed text-gray-200 border-l-2 border-purple-500 pl-4 font-medium">
                      {slideData.content}
                    </p>
                  )
                )}
              </motion.div>
                </div>

                {/* Footer */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-t border-gray-800 pt-4 flex justify-between items-center"
                >
                  <p className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
                    {slideData.chapterInfo}
                  </p>
                   <div className="flex items-center gap-1 text-xs text-purple-500 font-mono animate-pulse">
                     TAP TO CONTINUE <ChevronRight size={12} />
                   </div>
                </motion.div>
              </>
            )}
          </div>

          {/* CTA BUTTON (Only on last slide) */}
          {slideData.isCTA && (
            <motion.div 
              className="mt-6 pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.a
                href={GUMROAD_URL}
                animate={{ 
                  scale: [1, 1.02, 1],
                  boxShadow: ["0 0 0px #9333ea", "0 0 25px #9333ea", "0 0 0px #9333ea"]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5
                }}
                className="block w-full py-6 bg-purple-600 text-white text-center text-xl font-black uppercase rounded-xl tracking-widest hover:bg-white hover:text-purple-900 transition-colors shadow-lg"
              >
                I NEED THIS ($7.50)
              </motion.a>
              <div className="flex justify-center items-center gap-2 mt-4 text-gray-500 text-xs uppercase tracking-widest">
                 <Lock size={12} /> Secure Checkout via Gumroad
              </div>
            </motion.div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  );
}