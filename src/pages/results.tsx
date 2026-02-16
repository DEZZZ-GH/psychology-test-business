import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { ArrowRight, ShieldAlert, CheckCircle } from 'lucide-react'

// --- CONTENT DATA ---
const RESULTS_DATA: Record<string, any> = {
  'A': {
    title: "The Hijacked Protector",
    hook: "You aren't anxious. You are under surveillance.",
    diagnosis: "Your 'Watchdog' (Amygdala) has staged a coup. It treats every email, weird look, and delay as a life-or-death threat. You are burning 90% of your fuel fighting wars that haven't happened yet.",
    fix: "Chapter 07 (The Watchdog) contains the code to force a system reset."
  },
  'B': {
    title: "The Shadow Boxer",
    hook: "You are fighting enemies that don't exist anymore.",
    diagnosis: "You are running a 'Dead Loop.' You replay old arguments and past mistakes because your system finds comfort in the pain. You are addicted to the aesthetic of the scar.",
    fix: "Chapter 11 (The Vault) shows you how to cut the wire to the past."
  },
  'C': {
    title: "The Ghost Passenger",
    hook: "You are awake, but no one is driving.",
    diagnosis: "Your system is on 95% Autopilot. You’ve sedated your ambition with cheap dopamine (scrolling, snacking, waiting). You are watching your life happen to someone else.",
    fix: "Chapter 01 (Autopilot) is your wake-up call protocol."
  },
  'D': {
    title: "The Unshielded Receiver",
    hook: "You are leaking energy to everyone around you.",
    diagnosis: "You have no Firewall. You absorb the stress, anger, and 'vibe' of every room you walk into. You are exhausted because you are processing other people's data.",
    fix: "Chapter 13 (The Shield) teaches you how to close the ports."
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
          {/* URGENCY: Red Alert */}
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

  // --- STEP 2: THE IDENTITY ---
  if (step === 2) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-center p-6 text-center animate-in slide-in-from-right duration-500">
        <div className="mb-8">
          <span className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase font-mono">ARCHETYPE IDENTIFIED</span>
        </div>
        
        <h1 className="text-5xl font-black text-white uppercase leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
          {content.title}
        </h1>
        
        {/* Highlight replaced with Purple */}
        <p className="text-xl text-purple-400 font-medium mb-12 border-l-2 border-purple-500 pl-4 text-left mx-auto max-w-sm">
          "{content.hook}"
        </p>

        <button 
          onClick={() => setStep(3)}
          className="w-full py-5 bg-purple-600 text-white text-lg font-bold rounded-xl shadow-[0_0_25px_rgba(147,51,234,0.4)] hover:brightness-110 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          WHY AM I LIKE THIS? <ArrowRight size={20} />
        </button>
      </div>
    )
  }

  // --- STEP 3: THE DIAGNOSIS ---
  if (step === 3) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col justify-between p-6 pb-12 animate-in slide-in-from-bottom duration-500">
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-white mb-6">The Diagnosis</h2>
          <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 backdrop-blur-sm">
            <p className="text-lg text-gray-200 leading-relaxed">
              {content.diagnosis}
            </p>
          </div>
          {/* URGENCY: Red Line */}
          <div className="mt-8 flex items-center gap-4 opacity-75">
            <div className="h-12 w-1 bg-red-600 rounded-full shadow-[0_0_10px_#dc2626]"></div>
            <p className="text-sm text-gray-400 italic">
              "This isn't a personality trait. It's a code error."
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

  // --- STEP 4: THE SOLUTION (FINAL) ---
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col p-6 animate-in fade-in duration-700">
      <div className="flex-1 flex flex-col items-center pt-8 text-center">
        <div className="w-16 h-16 bg-purple-900/20 rounded-full flex items-center justify-center text-purple-500 mb-6 border border-purple-500/30">
          <CheckCircle size={32} />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Manual Override Available</h2>
        <p className="text-gray-400 mb-8 max-w-sm">
          You don't need therapy. You need a system update. The specific protocol for your glitch is ready.
        </p>

        {/* Manual Card - Purple Theme */}
        <div className="w-full bg-[#111] border border-gray-800 rounded-2xl p-6 mb-8 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-purple-600"></div>
          <h3 className="text-white font-bold text-lg mb-1">System Breach Manual</h3>
          <p className="text-purple-400 text-sm mb-4 font-mono">v4.0 // Digital Download</p>
          <p className="text-gray-300 text-sm border-t border-gray-800 pt-3 mt-3">
            Contains: <span className="text-white font-bold">{content.fix}</span>
          </p>
        </div>
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-black via-black to-transparent pt-10 pb-6">
        <a 
          href="https://gumroad.com/l/YOUR_LINK" 
          className="block w-full py-5 bg-purple-600 text-white text-center text-xl font-black uppercase rounded-xl shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:scale-[1.02] transition-transform active:scale-95"
        >
          Download Protocol ($7.50)
        </a>
        <p className="text-center text-gray-600 text-xs mt-4">
          Instant Access • Secure Payment
        </p>
      </div>
    </div>
  )
}