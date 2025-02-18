import dynamic from 'next/dynamic'
import Layout from '../components/Layout'
import FrostButton from '../components/FrostButton'
import { motion } from 'framer-motion'

// Remove the static import and use dynamic import instead
const Snowfall = dynamic(() => import('../components/Snowfall'), { ssr: false })

export default function Home() {
  return (
    <Layout>
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        <Snowfall />
        <motion.h1 
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-frost-dark mb-8"
        >
          CARELENS Preventive Care
        </motion.h1>
        <p className="text-lg text-frost-dark mb-6">
          Your personalized path to a healthier life.
        </p>
        <FrostButton text="Get Started" onClick={() => window.location.href='/profile'} />
      </div>
    </Layout>
  )
}
