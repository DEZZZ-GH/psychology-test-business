import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

// The 4 distinct paths
type AnswerType = 'A' | 'B' | 'C' | 'D';

interface Question {
  id: number;
  title: string;
  text: string;
  options: { type: AnswerType; text: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    title: "The Morning Boot-Up",
    text: "You wake up. Before your eyes even open, what is the first \"program\" that boots up in your chest?",
    options: [
      { type: 'A', text: "A sharp, electric jolt, my Watchdog (Amygdala/Anxiety) is already scanning the room for things I’ve forgotten or threats I haven't seen yet." },
      { type: 'B', text: "A heavy, familiar fog, I’m already replaying a \"dead file\" from a conversation or mistake that happened years ago in The Vault (Unconscious/Past Trauma)." },
      { type: 'C', text: "Absolute static, I feel nothing. I’m just a passenger waiting for the Autopilot (Subconscious/Habit) to take me through another 95% mindless day." },
      { type: 'D', text: "A vibration that isn't mine, my Social Wi-Fi (Mirror Neurons/Empathy) is already wondering who is mad at me or whose \"vibe\" I have to fix today." }
    ]
  },
  {
    id: 2,
    title: "The Social Interface",
    text: "You walk into a crowded room or a tense meeting. What happens to your Internal Lab (Neurochemistry/Mood)?",
    options: [
      { type: 'A', text: "My Watchdog (Amygdala) goes into War Mode. My heart rate spikes, and I’m ready for a \"fight\" that hasn't even started." },
      { type: 'B', text: "I’m physically there, but my CEO (Prefrontal Cortex/Logic) is busy re-litigating past social failures. I’m not actually in the room." },
      { type: 'C', text: "I blend into the wall. I’m just waiting for the \"Dopamine Hit\" of going home so I can scroll and disappear." },
      { type: 'D', text: "I’m a sponge. Within ten minutes, I have \"caught\" the stress or the sadness of everyone in the room. My firewall is down." }
    ]
  },
  {
    id: 3,
    title: "The Flinch Moment",
    text: "You are about to make a move that could change your life (a new project, a difficult conversation). You feel The Flinch (The Resistance/Fear). How do you handle it?",
    options: [
      { type: 'A', text: "I panic. My hardware tells me the risk is certain death, so I retreat to the \"Safe Zone\" immediately." },
      { type: 'B', text: "I over-analyze. I try to find the \"perfect\" move until the opportunity decays and disappears." },
      { type: 'C', text: "I don't even feel it. I stay on Autopilot (Habit) and tell myself \"maybe next month\" while I distract myself with cheap entertainment." },
      { type: 'D', text: "I look for permission. I check the faces of the people around me to see if they think I’m \"allowed\" to grow." }
    ]
  },
  {
    id: 4,
    title: "The 2:00 AM Archive",
    text: "It’s 2:00 AM. Your hardware is supposed to be cooling down, but the fans are still spinning. Why?",
    options: [
      { type: 'A', text: "I’m paralyzed by \"What Ifs.\" My brain is a lighthouse searching a dark sea for shipwrecks that haven't happened yet." },
      { type: 'B', text: "I’m \"Shadow Boxing.\" I’m arguing with ghosts, re-reading old texts, and addicted to the Aesthetic of the Scar (Romanticizing Past Pain)." },
      { type: 'C', text: "I’m not thinking; I’m just \"plugged in.\" I’m scrolling because the thought of being alone with my own silence is terrifying." },
      { type: 'D', text: "I’m carrying the weight of a person who doesn't even know I’m awake. I’m solving problems that don't belong to me." }
    ]
  },
  {
    id: 5,
    title: "The Boredom Glitch",
    text: "You have ten minutes of pure silence. No phone. No music. No distractions. What happens to your \"System\"?",
    options: [
      { type: 'A', text: "System Error. I feel an urgent, itchy need to \"do something\" or I’ll explode with a hum of electricity in my limbs." },
      { type: 'B', text: "The Vault (Unconscious) opens. Every memory and trauma I haven't dealt with starts screaming for my attention." },
      { type: 'C', text: "I realize I’ve been a \"Ghost Passenger\" for so long I don't actually know who is driving the machine anymore." },
      { type: 'D', text: "I start thinking about what everyone else is doing and why I’m not part of it." }
    ]
  },
  {
    id: 6,
    title: "The Line in the Sand",
    text: "Why are you actually taking this Audit right now? Be honest with the machine.",
    options: [
      { type: 'A', text: "Because my Watchdog (Amygdala) is exhausted and I can't live in \"High-Alert\" for one more day." },
      { type: 'B', text: "Because I’m tired of being a Script Puppet (Living by Old Programming) for my past." },
      { type: 'C', text: "Because I’m terrified that I’m going to wake up at 50 and realize I never actually lived my own life." },
      { type: 'D', text: "Because my Social Wi-Fi (Empathy) is fried and I need a Firewall before I disappear completely." }
    ]
  },
  {
    id: 7,
    title: "The Resource Leak",
    text: "Look at your current output. You have the hardware to build an empire, but your energy is leaking. Where is the \"Power\" actually going?",
    options: [
      { type: 'A', text: "Cooling the Engine. I spend 90% of my energy just trying to keep my Watchdog (Anxiety) calm so I don't have a total system meltdown." },
      { type: 'B', text: "Running Background Apps. My processing power is being sucked dry by The Vault (Past Echoes), I’m mentally \"rendering\" old memories instead of new results." },
      { type: 'C', text: "Idle Mode. I’m not actually using my power. My Autopilot (Habit) has me stuck in a low-energy loop of \"scroll, eat, sleep, repeat.\"" },
      { type: 'D', text: "External Charging. I am plugged into everyone else’s problems. I am a battery for people who give me nothing but Social Wi-Fi (Emotional Drain) in return." }
    ]
  }
];

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ A: 0, B: 0, C: 0, D: 0 })
  const [isCalculating, setIsCalculating] = useState(false)

  const handleAnswer = (type: AnswerType) => {
    const newScores = { ...scores, [type]: scores[type] + 1 }
    setScores(newScores)
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      finishQuiz(newScores)
    }
  }

  const finishQuiz = (finalScores: typeof scores) => {
    setIsCalculating(true)
    
    // Calculate Winner
    const winner = Object.keys(finalScores).reduce((a, b) => 
      finalScores[a as AnswerType] > finalScores[b as AnswerType] ? a : b
    ) as AnswerType;

    // Simulate "System Calculation" delay for effect
    setTimeout(() => {
      router.push({
        pathname: '/results',
        query: { type: winner }
      })
    }, 1500)
  }

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-purple-500">
        <div className="animate-spin h-12 w-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4"></div>
        <p className="font-mono text-lg tracking-widest animate-pulse">CALCULATING DIAGNOSTICS...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 py-12 px-4 font-sans">
      <Head>
        <title>Internal Architecture Audit</title>
      </Head>

      <div className="container mx-auto max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs text-purple-400 mb-2 tracking-widest uppercase font-mono">
            <span>Gate {currentQuestion + 1} / {questions.length}</span>
            <span>Status: Scanning</span>
          </div>
          <div className="h-1 bg-gray-900 w-full">
            <div 
              className="h-full bg-purple-600 transition-all duration-300 shadow-[0_0_10px_#9333ea]"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[#0a0a0a] border border-gray-800 p-8 relative overflow-hidden rounded-xl">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-600 to-transparent"></div>
          
          <div className="relative z-10">
            {/* New Title Section */}
            <h3 className="text-purple-500 font-mono text-sm tracking-widest uppercase mb-2">
              0{questions[currentQuestion].id}. {questions[currentQuestion].title}
            </h3>
            
            <h2 className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
              {questions[currentQuestion].text}
            </h2>
            
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option.type)}
                  className="w-full text-left p-5 border border-gray-800 hover:border-purple-500 hover:bg-purple-900/10 hover:text-purple-300 transition-all duration-200 group relative rounded-lg"
                >
                  <div className="flex items-start">
                    <span className="font-bold mr-4 text-gray-600 group-hover:text-purple-500 transition-colors">
                      [{option.type}]
                    </span>
                    <span className="text-sm md:text-base text-gray-300 group-hover:text-white">
                      {option.text}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}