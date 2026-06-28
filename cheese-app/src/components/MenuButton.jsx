import { Menu } from 'lucide-react'
import { useApp } from '../App'

export default function MenuButton({ className = '' }) {
  const { setSidebarOpen } = useApp()
  return (
    <button
      onClick={() => setSidebarOpen(true)}
      className={`w-9 h-9 rounded-xl flex items-center justify-center bg-ch-bg active:bg-ch-border transition-colors ${className}`}
    >
      <Menu size={18} className="text-ch-text" strokeWidth={1.8} />
    </button>
  )
}
