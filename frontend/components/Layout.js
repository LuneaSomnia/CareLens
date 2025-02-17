import Navbar from './Navbar'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-snowflakes bg-cover">
      <Navbar />
      <main>{children}</main>
    </div>
  )
    }
