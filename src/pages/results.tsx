import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { ArrowRight, ShieldAlert, CheckCircle, Zap, Flame, Lock } from 'lucide-react'

// --- CONTENT DATA ---
const RESULTS_DATA: Record<string, any> = {
  'A': {
    title: "The Hijacked Protector",
    diagnosis: "Your Watchdog (Amygdala) has staged a full coup. It has locked your CEO (Prefrontal Cortex) in the basement. You aren't \"careful\"—you are a high-performance machine being driven by a security guard who is afraid of shadows.",
    insight: "Right now, you are burning 90% of your daily energy just trying to stay \"safe.\" This is why you feel exhausted even when you haven't done anything. You are red-lining your engine while the parking brake is on.",
    override: [
      "Chapter 07 (The Watchdog): I show you exactly how your amygdala hijacks your logic and how to \"debug\" the fear response in real-time.",
      "Chapter 10 (Tactical Command): You will learn the \"Command Codes\" to force your heart rate down and put the CEO back in charge."
    ],
    blueprint: "If you don't reset this hardware, you will spend your whole life hiding in the \"Safe Zone\" while others build the world you were supposed to lead."
  },
  'B': {
    title: "The Shadow Boxer",
    diagnosis: "You are a Script Puppet. Your Vault (Unconscious) is leaking old trauma into your daily code. You are \"addicted to the aesthetic of the scar,\" replaying dead loops from years ago because they feel safer than an unknown future.",
    insight: "You aren't \"stuck\"; you are just re-rendering old files. Your brain is trying to protect you from a 2018 threat that no longer exists. You are arguing with ghosts and losing.",
    override: [
      "Chapter 11 (The Vault): We go deep into the basement to identify the \"poisonous beliefs\" and \"shadows\" that are currently acting as your operating instructions.",
      "Chapter 18 (Momentum): I show you how to pave new \"Neural Highways\" so thick that the \"Old You\" becomes a ghost."
    ],
    blueprint: "You can keep romanticizing your pain, or you can use the Dark Fuel protocol in Chapter 20 to turn that trauma into a launchpad."
  },
  'C': {
    title: "The Ghost Passenger",
    diagnosis: "You are 95% Autopilot. You are effectively a \"Ghost\" in your own machine. Your Internal Lab is so fried from cheap dopamine hits (scrolling, procrastination, \"moods\") that you’ve lost the \"Hunt\" instinct.",
    insight: "You are a passenger watching your own life go by. Your basal ganglia handles your habits, and right now, those habits were installed by people who don't care about your success. You are living on 2005 programming in a 2026 world.",
    override: [
      "Chapter 01 (The Architect): We audit the \"Ghost in the Machine\" and identify exactly where your Autopilot is taking you.",
      "Chapter 08 (The Lab): You will learn how to hack your neurochemistry—Dopamine, Serotonin, and Cortisol—to find the \"On Switch\" for your drive."
    ],
    blueprint: "If you don't take the wheel back now, you’ll wake up at 50 and realize you never actually showed up for your own life."
  },
  'D': {
    title: "The Unshielded Receiver",
    diagnosis: "Your Social Wi-Fi (Mirror Neurons) has no Firewall. You are suffering from Emotional Wi-Fi contagion. You are a powerhouse being drained by vampires because you don't know where \"You\" end and \"They\" begin.",
    insight: "You have spent so long absorbing the \"Low-Battery\" energy of mediocre people that your own system is crashing. You are solving problems that don't belong to you while your own empire sits in ruins.",
    override: [
      "Chapter 12 (Emotional Wi-Fi): Learn the science of how you \"catch\" the emotions of others and how to disconnect the signal.",
      "Chapter 13 (The Shield): I show you how to build the \"Defensive Shield\"—the psychological boundaries required to move in silence and build in private."
    ],
    blueprint: "Stop being a battery for people who give you nothing. Install the firewall, shut the world out, and start building your own mission."
  }
};

export default function ResultsPage() {
  const router = useRouter()
  const [resultKey, setResultKey] = useState<string | null>(null)
  const [step, setStep] = useState(1) // Controls the "Story" flow
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (router.query.type) {
      setResultKey(router.query.type as string);
      setLoading(false);
    }
  }, [router.query])

  if (loading || !resultKey || !RESULTS_DATA[resultKey]) {
    return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-purple-500 font-sans">LOADING DATA...</div>;
  }

  const content = RESULTS_DATA[resultKey];

  // --- STEP 1: THE HOOK ---
  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-between p-6 pb-12 animate-in fade-in duration-700">
        <div className="mt-12 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/20 border border-red-600 text-red-500 text-xs font-bold tracking-widest uppercase animate-pulse">
            <ShieldAlert size={14} /> Critical Alert
          </div>
          <h1 className="text-4xl font-bold text-white leading-tight">
            We found the <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">Glitch</span>.
          </h1>
          <p className="text-xl text-gray-400">
            The analysis is finished. Your answers revealed a specific pattern that is draining your potential.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-center text-sm text-gray-500 uppercase tracking-widest font-mono">Do you want to see it?</p>
          <button 
            onClick={() => setStep(2)}
            className="w-full py-5 bg-white text-black text-xl font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02] transition-transform active:scale-95"
          >
            REVEAL MY RESULT
          </button>
        </div>
      </div>
    )
  }

  // --- STEP 2: THE DIAGNOSIS ---
  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-center p-6 text-center animate-in slide-in-from-right duration-500">
        <div className="mb-6">
          <span className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase font-mono">ARCHETYPE IDENTIFIED</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-white uppercase leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">
          {content.title}
        </h1>
        
        <div className="bg-gray-900/30 border-l-2 border-red-500 p-6 text-left mb-8 rounded-r-xl backdrop-blur-sm">
            <h3 className="text-red-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                <Flame size={12} /> The Diagnosis
            </h3>
            <p className="text-lg text-gray-200 font-medium leading-relaxed">
                "{content.diagnosis}"
            </p>
        </div>

        <button 
          onClick={() => setStep(3)}
          className="w-full py-5 bg-purple-600 text-white text-lg font-bold rounded-xl shadow-[0_0_25px_rgba(147,51,234,0.4)] hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          GO DEEPER <ArrowRight size={20} />
        </button>
      </div>
    )
  }

  // --- STEP 3: THE INSIGHT ---
  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-between p-6 pb-12 animate-in slide-in-from-bottom duration-500">
        <div className="mt-8">
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-purple-900/20 border border-purple-500 text-purple-400 text-xs font-bold tracking-widest uppercase">
                <Zap size={14} /> System Insight
            </div>
            
          <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
            Why you feel <span className="text-purple-500">exhausted</span>.
          </h2>
          
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
            <p className="text-lg text-gray-200 leading-relaxed">
              {content.insight}
            </p>
          </div>
          
          <div className="mt-8 flex items-center gap-4 opacity-60">
            <div className="h-12 w-1 bg-purple-500 rounded-full"></div>
            <p className="text-sm text-gray-400 italic">
              "This is a hardware glitch, not a character flaw."
            </p>
          </div>
        </div>

        <button 
          onClick={() => setStep(4)}
          className="w-full py-5 bg-white text-black text-xl font-bold rounded-xl mt-8 shadow-lg active:scale-95 transition-transform"
        >
          HOW DO I FIX IT?
        </button>
      </div>
    )
  }

  // --- STEP 4: THE FIX (MANUAL OVERRIDE) ---
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col p-6 animate-in fade-in duration-700">
      <div className="flex-1 flex flex-col pt-4">
        
        <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-full text-green-500 mb-4 border border-green-500/20">
                <CheckCircle size={24} />
            </div>
            <h2 className="text-2xl font-bold text-white">Manual Override Available</h2>
        </div>

        {/* The Manual Override Section */}
        <div className="space-y-4 mb-6">
            {content.override.map((item: string, idx: number) => (
                <div key={idx} className="bg-[#111] border border-gray-800 p-4 rounded-xl flex gap-4 items-start">
                    <div className="mt-1 min-w-[20px] text-purple-500">
                        <Lock size={20} />
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        <span className="text-white font-bold block mb-1">
                            {item.split(':')[0]}
                        </span>
                        {item.split(':')[1]}
                    </p>
                </div>
            ))}
        </div>

        {/* The Blueprint (Promise) */}
        <div className="bg-purple-900/10 border border-purple-500/30 p-4 rounded-xl mb-8">
            <p className="text-purple-300 text-sm font-medium italic text-center">
                "{content.blueprint}"
            </p>
        </div>
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-black via-black to-transparent pt-4 pb-6">
        <button 
  onClick={() => router.push('/manual')} 
  className="block w-full py-5 bg-purple-600 text-white text-center text-xl font-black uppercase rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:scale-[1.02] transition-transform active:scale-95"
>
  INITIATE OVERRIDE SEQUENCE
</button>
        <p className="text-center text-gray-500 text-xs mt-3">
          Instant Digital Access • Secure Payment
        </p>
      </div>
    </div>
  )
}