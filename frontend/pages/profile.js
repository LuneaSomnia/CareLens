import Layout from '../components/Layout'
import { useState } from 'react'
import FrostButton from '../components/FrostButton'

export default function Profile() {
  const [formData, setFormData] = useState({
    full_name: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone_number: '',
    address: '',
    // Additional fields for health background, lifestyle, emergency info, etc.
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // POST formData to backend (e.g., using axios)
    console.log(formData)
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-6 bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg mt-10">
        <h2 className="text-2xl font-bold text-frost-dark mb-4">User Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-frost-dark">Full Name</label>
            <input type="text" name="full_name" onChange={handleChange} className="w-full p-2 border rounded"/>
          </div>
          <div>
            <label className="block text-frost-dark">Date of Birth</label>
            <input type="date" name="date_of_birth" onChange={handleChange} className="w-full p-2 border rounded"/>
          </div>
          <div>
            <label className="block text-frost-dark">Gender</label>
            <select name="gender" onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-frost-dark">Email</label>
            <input type="email" name="email" onChange={handleChange} className="w-full p-2 border rounded"/>
          </div>
          <div>
            <label className="block text-frost-dark">Phone Number</label>
            <input type="text" name="phone_number" onChange={handleChange} className="w-full p-2 border rounded"/>
          </div>
          <div>
            <label className="block text-frost-dark">Address</label>
            <input type="text" name="address" onChange={handleChange} className="w-full p-2 border rounded"/>
          </div>
          {/* Additional fields go here */}
          <FrostButton text="Save Profile" type="submit" />
        </form>
      </div>
    </Layout>
  )
}
