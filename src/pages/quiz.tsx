import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function QuizPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const questions = [
    {
      id: 'q1',
      question: 'When facing a complex problem, your first instinct is to:',
      options: [
        { id: 'a', text: 'Analyze data and look for patterns' },
        { id: 'b', text: 'Consult your gut feeling or intuition' },
        { id: 'c', text: 'Discuss with others for perspectives' },
        { id: 'd', text: 'Create a step-by-step action plan' }
      ]
    },
    {
      id: 'q2',
      question: 'In social situations, you typically:',
      options: [
        { id: 'a', text: 'Observe and analyze group dynamics' },
        { id: 'b', text: 'Sense others emotions intuitively' },
        { id: 'c', text: 'Engage actively and connect people' },
        { id: 'd', text: 'Focus on practical conversations' }
      ]
    },
    {
      id: 'q3',
      question: 'When making important decisions, you rely most on:',
      options: [
        { id: 'a', text: 'Logical analysis and facts' },
        { id: 'b', text: 'Personal values and intuition' },
        { id: 'c', text: 'Advice from trusted people' },
        { id: 'd', text: 'Practical consequences and outcomes' }
      ]
    },
    {
      id: 'q4',
      question: 'Your ideal work environment would be:',
      options: [
        { id: 'a', text: 'Quiet, focused, with minimal distractions' },
        { id: 'b', text: 'Creative, flexible, with emotional resonance' },
        { id: 'c', text: 'Collaborative, social, with team interaction' },
        { id: 'd', text: 'Structured, organized, with clear processes' }
      ]
    },
    {
      id: 'q5',
      question: 'When learning something new, you prefer to:',
      options: [
        { id: 'a', text: 'Understand the underlying theory first' },
        { id: 'b', text: 'Connect it to personal experiences' },
        { id: 'c', text: 'Discuss and teach it to others' },
        { id: 'd', text: 'Apply it immediately in practice' }
      ]
    }
  ]

  const handleAnswer = async (questionId: string, answerId: string) => {
  const newAnswers = { ...answers, [questionId]: answerId }
  setAnswers(newAnswers)
  
  if (currentQuestion < questions.length - 1) {
    setCurrentQuestion(currentQuestion + 1)
  } else {
    setIsComplete(true)
    setIsAnalyzing(true)
    
    console.log('📤 Sending answers to AI:', newAnswers)  // ADD THIS
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: newAnswers })
      })
      
      console.log('📥 API Response status:', response.status)  // ADD THIS
      
      const data = await response.json()
      console.log('📦 API Response data:', data)  // ADD THIS
      
      if (data.success) {
        setAnalysis(data.result)
        router.push({
          pathname: '/results',
          query: { data: encodeURIComponent(JSON.stringify(data.result)) }
        })
      } else {
        console.error('Analysis failed:', data.error)
      }
    } catch (error) {
      console.error('Analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }
}

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>            
            <p className="text-gray-600 mb-6">
              {isAnalyzing ? 'Analyzing your answers with AI...' : 'Analysis complete!'}
            </p>
            {isAnalyzing && (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Psychology Personality Quiz
        </h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round((currentQuestion + 1) / questions.length * 100)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-600 transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </h2>
            
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
                  className="w-full text-left p-4 border border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-200"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
