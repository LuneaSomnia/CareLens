import { motion } from 'framer-motion'

export default function FrostButton({ text, onClick, type = "button" }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className="px-6 py-2 bg-frost hover:bg-frost-dark text-white font-semibold rounded shadow-md focus:outline-none"
      whileHover={{ scale: 1.05, backgroundColor: "#7698a6" }}
      whileTap={{ scale: 0.95 }}
    >
      {text}
    </motion.button>
  )
}
