import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-frost-light bg-opacity-80 backdrop-filter backdrop-blur-lg p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-frost-dark font-bold text-xl">CARELENS</div>
        <div className="space-x-4">
          <Link href="/"><a className="text-frost-dark hover:text-frost-dark">Home</a></Link>
          <Link href="/profile"><a className="text-frost-dark hover:text-frost-dark">Profile</a></Link>
          <Link href="/risk-assessment"><a className="text-frost-dark hover:text-frost-dark">Risk Assessment</a></Link>
          <Link href="/symptom-checker"><a className="text-frost-dark hover:text-frost-dark">Symptom Checker</a></Link>
          <Link href="/resources"><a className="text-frost-dark hover:text-frost-dark">Resources</a></Link>
          <Link href="/lifestyle"><a className="text-frost-dark hover:text-frost-dark">Lifestyle</a></Link>
          <Link href="/prevention"><a className="text-frost-dark hover:text-frost-dark">Prevention</a></Link>
        </div>
      </div>
    </nav>
  )
    }
    
