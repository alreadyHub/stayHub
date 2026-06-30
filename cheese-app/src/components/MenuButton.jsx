import { ChevronLeft } from 'lucide-react'
import { useApp } from '../App'

export default function MenuButton({ className = '' }) {
  const { setSidebarOpen } = useApp()
  return (
    <button
      onClick={() => setSidebarOpen(true)}
      className={`w-11 h-11 rounded-full flex items-center justify-center bg-white shadow-sm border border-ch-border active:bg-ch-border transition-colors ${className}`}
    >
      <ChevronLeft size={22} className="text-ch-text" strokeWidth={2} />
    </button>
  )
}
