import Layout from '../components/Layout'
import { useState } from 'react'
import FrostButton from '../components/FrostButton'

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("")
  const [result, setResult] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // POST symptoms to backend and retrieve AI-generated output (using axios)
    setResult({
      potential_conditions: ["Common Cold"],
      confidence: [50],
      next_steps: "Rest and stay hydrated."
    })
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-bold text-frost-dark mb-4">Symptom Checker</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea 
            value={symptoms} 
            onChange={(e) => setSymptoms(e.target.value)} 
            placeholder="Describe your symptoms..."
            className="w-full p-2 border rounded"
          ></textarea>
          <FrostButton text="Check Symptoms" type="submit" />
        </form>
        {result && (
          <div className="mt-6">
            <h3 className="font-bold text-frost-dark">Possible Conditions:</h3>
            <ul>
              {result.potential_conditions.map((cond, idx) => (
                <li key={idx} className="text-frost-dark">
                  {cond} - Confidence: {result.confidence[idx]}%
                </li>
              ))}
            </ul>
            <p className="mt-4 text-frost-dark">Next Steps: {result.next_steps}</p>
          </div>
        )}
      </div>
    </Layout>
  )
              }
  
