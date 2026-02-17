import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, Zap, Target, Lock, Coins, ChevronRight } from 'lucide-react';
import Head from 'next/head';

// --- CONFIGURATION ---
const GUMROAD_URL = "https://gumroad.com/l/YOUR_PRODUCT_SLUG"; // 🔴 REPLACE THIS
const THEME_COLOR = "#9333ea"; // Purple-600

// --- SLIDE DATA ---
  const SLIDES = [
  // --- NEW SLIDE 0: COVER ---
  {
    id: 0,
    phase: "INITIALIZING SYSTEM...",
    title: "SYSTEM BREACH",
    subtitle: "v4.0 // Internal Architect’s Manual",
    icon: <img src="/ebook-cover.png" alt="Cover" className="w-56 h-auto shadow-2xl rounded-lg border border-purple-500/50" />,
    content: "",
    chapterInfo: "TAP TO DECRYPT SPECIFICATIONS"
  },
  // --- NEW SLIDE 1: SPECS ---
  {
    id: 1,
    phase: "SYSTEM SPECIFICATIONS",
    title: "THE BLUEPRINT",
    subtitle: "High-Fidelity Manual",
    icon: <Lock size={64} className="text-purple-500" />,
    content: "• 20-Chapter Systems Manual \n• 3 Seven-Day Field Tests: Biological, Strategic, and Tactical Audits\n• Data-Backed Architecture: Grounded in Neurobiology & Case Studies",
    chapterInfo: "LOADED // 100% FUNCTIONAL"
  },
  {
    id: 3,
    phase: "PHASE 1 & 2: NEUROCHEMICAL COMMAND",
    title: "HARDWARE RESET",
    subtitle: "Chapters 01 - 10",
    icon: <Brain size={64} />,
    content: "Stop fighting your 'moods.' Learn to hack the internal lab (Dopamine/Cortisol) to force the machine into focus. The manual holds the 'Tactical Stand-Down' protocol.",
    chapterInfo: "TARGET: AMYGDALA VS. PREFRONTAL CORTEX"
  },
  {
    id: 4,
    phase: "PHASE 3: DEFENSIVE SHIELDING",
    title: "THE FIREWALL",
    subtitle: "Chapters 11 - 13",
    icon: <Shield size={64} />,
    content: "Identify the 'Social Contagion' draining your battery. Install the firewall against low-vibration environments. Move in silence. Build in private.",
    chapterInfo: "TARGET: MIRROR NEURONS & BOUNDARIES"
  },
  {
    id: 5,
    phase: "PHASE 4: THE WAR CHEST",
    title: "STRATEGIC CAPITAL",
    subtitle: "Chapters 14 - 17",
    icon: <Coins size={64} />,
    content: "Reclaim your Attention Capital from the 'Dopamine Feed.' Reprogram the 'Dinero' software installed by people who were never free.",
    chapterInfo: "TARGET: ATTENTION SPAN & FINANCIAL LOGIC"
  },
  {
    id: 6,
    phase: "PHASE 5: WAR MODE",
    title: "EXECUTION",
    subtitle: "Chapters 18 - 20",
    icon: <Zap size={64} />,
    content: "Convert past trauma into high-octane propellant. Pave new neural highways so thick the 'Old You' becomes a ghost. This is where the results live.",
    chapterInfo: "TARGET: DARK FUEL & MOMENTUM"
  },
  {
    id: 7,
    phase: "DEPLOYMENT TOOLS",
    title: "TRIPLE AUDIT SUITE",
    subtitle: "7-Day Implementation",
    icon: <Target size={64} />,
    content: "Go beyond theory with three high-stakes protocols: The Biological Shield (Immunity Audit), The Strategic Command (Power Audit), and The Tactical Momentum Tracker (Output Audit).",
    chapterInfo: "v4.0 // BONUS CONTENT"
  },
  {
    id: 8,
    phase: "RESEARCH LAB",
    title: "GROUNDED IN BIOLOGY",
    subtitle: "Data-Driven Architecture",
    icon: <Brain size={64} />,
    content: "This isn't 'motivation.' This system is built on integrated research and case studies from world-renowned neuroscientists and behavioral psychologists. High-fidelity data for high-performance minds.",
    chapterInfo: "v4.0 // SCIENTIFIC AUDIT"
  },
  {
    id: 9,
    phase: "FINAL OVERRIDE",
    title: "THE LINE IN THE SAND",
    subtitle: "System Activation Required",
    icon: <img src="/ebook-cover.png" alt="Ebook Cover" className="w-48 h-auto shadow-2xl rounded-lg border border-purple-500/50" />,
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
          <div className="border border-purple-500/30 bg-[#0a0a0a]/95 backdrop-blur-xl p-8 rounded-2xl shadow-[0_0_50px_rgba(147,51,234,0.15)] relative overflow-hidden min-h-[500px] flex flex-col justify-between">
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-600" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-600" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-600" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-600" />

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
                {/* LOGIC: If Slide 0 (Cover) or Slide 9 (Final), show directly. Else show inside circle. */}
                {(slideData.id === 0 || slideData.id === 9) ? (
                   <div className="shadow-[0_0_40px_rgba(147,51,234,0.3)]">
                      {slideData.icon}
                   </div>
                ) : (
                  <div className="p-6 border border-purple-500/20 rounded-full bg-purple-500/5 shadow-[0_0_30px_rgba(147,51,234,0.2)]">
                    {slideData.icon}
                  </div>
                )}
              </motion.div>

              {/* Text Content with Bullet Logic */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-8"
              >
                {slideData.content && (
                  slideData.content.startsWith('•') ? (
                    /* Bullet Point Rendering for Specs */
                    <div className="space-y-4">
                      {slideData.content.split('\n').map((line, idx) => (
                        <p key={idx} className="text-white font-bold text-sm md:text-base leading-relaxed pl-4 border-l-2 border-purple-500">
                          {line}
                        </p>
                      ))}
                    </div>
                  ) : (
                    /* Standard Paragraph Rendering */
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
              {!slideData.isCTA && (
                 <div className="flex items-center gap-1 text-xs text-purple-500 font-mono animate-pulse">
                   TAP TO CONTINUE <ChevronRight size={12} />
                 </div>
              )}
            </motion.div>

          </div>

          {/* CTA BUTTON (Only on last slide) */}
          {slideData.isCTA && (
            <motion.div 
              className="mt-8 pointer-events-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <motion.a
                href={GUMROAD_URL}
                animate={{ 
                  scale: [1, 1.02, 1],
                  boxShadow: ["0 0 0px #9333ea", "0 0 20px #9333ea", "0 0 0px #9333ea"]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2
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
  )}