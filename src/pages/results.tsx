import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (router.query.data) {
      try {
        const data = JSON.parse(decodeURIComponent(router.query.data as string))
        setResult(data)
      } catch (error) {
        console.error('Failed to parse result:', error)
      }
    }
  }, [router.query])

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your results...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Your Personality Analysis
        </h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-purple-100 text-purple-800 px-6 py-3 rounded-full text-xl font-bold mb-4">
              {result.personality_type || 'Your Personality Type'}
            </div>
            <p className="text-gray-700 text-lg">
              {result.analysis || 'Personalized analysis based on your answers.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-green-800 mb-3">✨ Your Strengths</h3>
              <ul className="space-y-2">
                {result.strengths?.map((strength: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-gray-700">{strength}</span>
                  </li>
                )) || (
                  <li className="text-gray-600">Analysis of strengths</li>
                )}
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-blue-800 mb-3">Growth Area</h3>
              <p className="text-gray-700">
                {result.growth_area || 'Area for personal development based on your patterns.'}
              </p>
            </div>
          </div>
        </div>

        {/* Upsell Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Want to go deeper?</h2>
          <p className="text-purple-100 mb-6">
            Get your complete personalized report with detailed analysis and actionable insights.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Complete eBook</h3>
              <p className="text-purple-200 mb-4">Detailed guide to master your psychology</p>
              <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                Get eBook - $7
              </button>
            </div>
            
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-xl font-bold mb-2">Deep Analysis Test</h3>
              <p className="text-purple-200 mb-4">Personalized 50-question deep dive</p>
              <button className="w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
                Deep Test - $27
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a href="/" className="text-purple-600 hover:underline">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  )
}
