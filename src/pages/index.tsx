export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-6">
          Discover Your <span className="text-purple-600">Hidden Psychology</span>
        </h1>
        <p className="text-xl text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Take our free 5-minute quiz and uncover your unique personality pattern 
          with AI-powered insights.
        </p>
        
        <div className="text-center">
          <a 
            href="/quiz" 
            className="inline-block bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition shadow-lg hover:shadow-xl"
          >
            Start Free Quiz →
          </a>
        </div>
      </div>
    </div>
  )
} 

/*
  The Home component is a well-structured and visually appealing landing page 
  for a psychology quiz. By leveraging React and Tailwind CSS, it provides 
  a user-friendly experience that encourages engagement. The clear call to 
  action and inviting design make it an effective tool for attracting users 
  to participate in the quiz.
*/


