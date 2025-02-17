import Layout from '../components/Layout'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Prevention() {
  const [strategies, setStrategies] = useState(null)

  useEffect(() => {
    // Fetch personalized prevention strategies from backend API
    axios.get('/api/prevention', { params: { user_id: 1 }}) // Replace with actual user ID
      .then(response => setStrategies(response.data))
      .catch(error => console.error(error))
  }, [])

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 mt-10">
        <h2 className="text-2xl font-bold text-frost-dark mb-4">Personalized Prevention Strategies</h2>
        {strategies ? (
          <div>
            <h3 className="text-frost-dark">Recommendations:</h3>
            <ul>
              {strategies.recommendations.map((rec, idx) => (
                <li key={idx} className="text-frost-dark">{rec}</li>
              ))}
            </ul>
            <h3 className="text-frost-dark mt-4">Reminders:</h3>
            <ul>
              {strategies.reminders.map((rem, idx) => (
                <li key={idx} className="text-frost-dark">
                  {rem.message} on {rem.date}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-frost-dark">Loading prevention strategies...</p>
        )}
      </div>
    </Layout>
  )
}
