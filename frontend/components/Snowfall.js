import { motion } from 'framer-motion'

export default function Snowfall() {
  // Create an array of snowflake items
  const snowflakes = Array.from({ length: 50 })

  return (
    <div className="absolute inset-0 pointer-events-none">
      {snowflakes.map((_, index) => (
        <motion.div
          key={index}
          className="absolute bg-white rounded-full"
          style={{ width: '5px', height: '5px' }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -10,
            opacity: 0,
          }}
          animate={{
            y: window.innerHeight + 10,
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}
