import { useRouter } from 'next/router';
import Head from 'next/head';
import { Terminal, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <Head>
        <title>System Audit | Internal Architecture</title>
      </Head>

      {/* Background Grid Effect - Tinted Purple */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none mix-blend-overlay bg-purple-900"></div>

      <div className="max-w-2xl text-center space-y-8 z-10">
        {/* Status Badge - Purple */}
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-purple-500/30 rounded bg-purple-900/10 text-purple-400 text-xs font-mono tracking-widest uppercase animate-pulse">
          <Terminal size={12} /> System Status: Standby
        </div>

        {/* Main Headline - Purple Gradient & Glow */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none drop-shadow-[0_0_25px_rgba(168,85,247,0.3)]">
          SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-600">AUDIT</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-gray-400 max-w-lg mx-auto leading-relaxed">
          Identify your internal hardware glitch. Reclaim the 95% of your life lost to Autopilot protocols.
        </p>

        {/* CTA Button - Purple Theme */}
        <button 
          onClick={() => router.push('/quiz')}
          className="group relative px-8 py-4 bg-[#050505] border border-purple-500 text-purple-400 font-bold text-lg tracking-widest uppercase hover:bg-purple-600 hover:text-white transition-all duration-300 ease-out shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] rounded-lg"
        >
          <span className="flex items-center gap-3">
            Initiate Diagnostic <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
}

