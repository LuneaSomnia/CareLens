import Layout from '../components/Layout'
import { useState } from 'react'
import FrostButton from '../components/FrostButton'

export default function Lifestyle() {
  const [lifestyleData, setLifestyleData] = useState({
    diet: '',
    activity: '',
    sleep: '',
    stress: ''
  })
  const [progress, setProgress] = useState(null)

  const handleChange = (e) => {
    setLifestyleData({ ...lifestyleData, [e.target.name]: e.target.value })
  }

  const handleLog = async (e) => {
    e.preventDefault()
    // POST lifestyleData to backend API
    console.log(lifestyleData)
    setProgress("Lifestyle data logged successfully!")
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-bold text-frost-dark mb-4">Lifestyle Monitoring & Counseling</h2>
        <form onSubmit={handleLog} className="space-y-4">
          <div>
            <label className="block text-frost-dark">Diet Log</label>
            <input type="text" name="diet" onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-frost-dark">Activity (Steps/Workout)</label>
            <input type="text" name="activity" onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-frost-dark">Sleep Data</label>
            <input type="text" name="sleep" onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-frost-dark">Stress Levels</label>
            <input type="text" name="stress" onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <FrostButton text="Log Lifestyle Data" type="submit" />
        </form>
        {progress && <p className="mt-4 text-frost-dark">{progress}</p>}
      </div>
    </Layout>
  )
}
