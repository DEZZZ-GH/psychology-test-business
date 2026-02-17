import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, Zap, Target, Lock, Coins, ChevronRight } from 'lucide-react';
import Head from 'next/head';

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
    icon: <img src="/ebook-cover.png" alt="Cover" className="w-56 h-auto shadow-2xl rounded-lg border border-purple-500/50" />,
    content: "",
    chapterInfo: "TAP TO DECRYPT SPECIFICATIONS"
  },
  // --- SLIDE 1: SPECS ---
  {
    id: 1,
    phase: "SYSTEM SPECIFICATIONS",
    title: "THE BLUEPRINT",
    subtitle: "High-Fidelity Manual",
    icon: <Lock size={64} className="text-purple-500" />,
    content: "• 20-Chapter Systems Manual\n• Data-Backed Architecture: Grounded in Neurobiology & Case Studies\n• 5-Phase Protocol: From System Audit to War Mode\n• Zero Theory: Pure tactical execution for your internal machine",
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
    phase: "DEPLOYMENT TOOLS",
    title: "TRIPLE AUDIT SUITE",
    subtitle: "7-Day Implementation",
    icon: <Target size={64} />,
    content: "• The Biological Shield (Immunity Audit)\n• The Strategic Command (Power Audit)\n• The Tactical Momentum Tracker (Output Audit)",
    chapterInfo: "v4.0 // BONUS CONTENT"
  },
  // --- SLIDE 8: RESEARCH ---
  {
    id: 8,
    phase: "RESEARCH LAB",
    title: "NEURO-ARCHITECTURE",
    subtitle: "Data-Driven Operating System",
    icon: <Brain size={64} />,
    content: "• Built on Stanford & MIT Behavioral Research\n• Zero 'Motivation' // Pure Biological Mechanics\n• 50+ Case Studies on High-Performance Minds",
    chapterInfo: "v4.0 // SCIENTIFIC AUDIT"
  },
  // --- SLIDE 9: CTA ---
  {
    id: 9,
    phase: "FINAL OVERRIDE",
    title: "THE LINE IN THE SAND",
    subtitle: "System Activation Required",
    icon: <img src="/ebook-ccover.png" alt="Ebook Cover" className="w-48 h-auto shadow-2xl rounded-lg border border-purple-500/50" />,
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
      x: direction > 0 ? 300 : -300,
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
      <AnimatePresence initial={false} custom={direction} mode='wait'>
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
                    <h2 className="text-4xl font-black italic uppercase leading-none text-white mb-4 drop-shadow-[0_0_15px_rgba(147,51,234,0.8)]">
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
                      slideData.content.startsWith('•') ? (
                        <div className="space-y-4">
                          {slideData.content.split('\n').map((line, idx) => (
                            <p key={idx} className="text-white font-bold text-sm md:text-base leading-relaxed pl-4 border-l-2 border-purple-500">
                              {line}
                            </p>
                          ))}
                        </div>
                      ) : (
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