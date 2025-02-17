import Layout from '../components/Layout'
import { useState } from 'react'
import FrostButton from '../components/FrostButton'

export default function RiskAssessment() {
  const [assessment, setAssessment] = useState(null)

  const handleAssess = async () => {
    // Call your backend API to perform risk assessment (e.g., using axios)
    setAssessment({
      risk_scores: { diabetes: "20%", heart_disease: "15%", cancer: "10%" },
      recommendations: "Consider regular check-ups and a balanced diet."
    })
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-bold text-frost-dark mb-4">Health Risk Assessment</h2>
        <FrostButton text="Run Assessment" onClick={handleAssess} />
        {assessment && (
          <div className="mt-6">
            <h3 className="font-bold text-frost-dark">Risk Scores:</h3>
            <ul>
              {Object.entries(assessment.risk_scores).map(([key, value]) => (
                <li key={key} className="text-frost-dark">{key}: {value}</li>
              ))}
            </ul>
            <p className="mt-4 text-frost-dark">Recommendations: {assessment.recommendations}</p>
          </div>
        )}
      </div>
    </Layout>
  )
}
