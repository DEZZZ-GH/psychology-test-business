import { NextApiRequest, NextApiResponse } from 'next'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { answers } = req.body

    const prompt = `Analyze these psychology quiz answers: ${JSON.stringify(answers)}
    
    Provide a JSON response with:
    1. personality_type: A creative name for their personality (e.g., "Analytical Strategist")
    2. analysis: 2-3 sentences of personalized insight
    3. strengths: Array of 2 key strengths
    4. growth_area: One area for development
    
    Return ONLY valid JSON, no other text.`

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
      max_tokens: 300,
      response_format: { type: "json_object" }
    })

    const result = completion.choices[0]?.message?.content
    
    // Clean response just in case
    let cleanResult = result || '{}'
    cleanResult = cleanResult.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    
    const parsedResult = JSON.parse(cleanResult)

    res.status(200).json({
      success: true,
      result: parsedResult
    })

  } catch (error: any) {
    console.error('AI Analysis error:', error)
    res.status(500).json({
      success: false,
      error: error.message || 'Analysis failed'
    })
  }
}

/**
 * This TypeScript API handler effectively processes psychology quiz answers and 
 * generates personalized insights using the Groq SDK. It demonstrates how to 
 * handle API requests, interact with an AI model, and manage errors gracefully. 
 * This setup can be a powerful tool for applications that require personalized 
 * user feedback based on input data.
 */


/**
 * Internal logic summary:
 * - Imports: The code imports necessary types from Next.js and the Groq SDK.
 * - Groq Initialization: An instance of Groq is created using an API key from environment variables.
 * - Handler Function: The main function handles incoming requests, checks the request method, 
 *   processes the input, and returns a structured JSON response.
 */

