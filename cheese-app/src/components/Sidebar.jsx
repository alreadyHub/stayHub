import { useNavigate, useLocation } from 'react-router-dom'
import {
  MessageCircle, BookOpen, BarChart2, Library, Settings,
  Camera, X, Zap, ChevronRight
} from 'lucide-react'
import { useApp } from '../App'

const NAV = [
  { path: '/chat',     icon: MessageCircle, label: 'Coach' },
  { path: '/diary',    icon: BookOpen,      label: 'Diary' },
  { path: '/insights', icon: BarChart2,     label: 'Insights' },
  { path: '/library',  icon: Library,       label: 'Library' },
  { path: '/body',     icon: Camera,        label: 'Body Progress', premium: true },
  { path: '/settings', icon: Settings,      label: 'Settings' },
]

export default function Sidebar() {
  const { user, sidebarOpen, setSidebarOpen } = useApp()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const go = (path) => {
    navigate(path)
    setSidebarOpen(false)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full z-50 w-72 bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-14 pb-5 border-b border-ch-border">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🧀</span>
            <span className="text-lg font-bold text-ch-text tracking-tight">Cheese</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="w-8 h-8 rounded-full bg-ch-bg flex items-center justify-center"
          >
            <X size={16} className="text-ch-muted" />
          </button>
        </div>

        {/* User pill */}
        <div className="mx-4 mt-4 bg-ch-bg rounded-2xl px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 bg-ch-yellow/30 rounded-full flex items-center justify-center text-base">
            {user.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-ch-text truncate">{user.name}</div>
            <div className="text-[11px] text-ch-muted">
              {user.isPremium
                ? <span className="text-ch-yellow font-semibold">✦ Premium</span>
                : `${user.messagesLeft} messages left`}
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
          {NAV.map(({ path, icon: Icon, label, premium }) => {
            const active = pathname === path
            const locked = premium && !user.isPremium
            return (
              <button
                key={path}
                onClick={() => locked ? go('/upgrade') : go(path)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl w-full text-left transition-all ${
                  active
                    ? 'bg-ch-yellow/15 text-ch-text'
                    : 'text-ch-muted hover:bg-ch-bg'
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={active ? 2.5 : 1.8}
                  className={active ? 'text-ch-yellow' : ''}
                />
                <span className={`flex-1 text-sm font-medium ${active ? 'text-ch-text' : ''}`}>
                  {label}
                </span>
                {locked && (
                  <span className="text-[10px] font-bold text-ch-yellow border border-ch-yellow/40 rounded-md px-1.5 py-0.5">
                    PRO
                  </span>
                )}
                {active && (
                  <div className="w-1.5 h-1.5 rounded-full bg-ch-yellow" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Bottom: upgrade or goal progress */}
        <div className="px-4 pb-8 pt-3 border-t border-ch-border">
          {!user.isPremium ? (
            <button
              onClick={() => go('/upgrade')}
              className="w-full bg-ch-text rounded-2xl px-4 py-3 flex items-center gap-3"
            >
              <div className="w-7 h-7 bg-ch-yellow rounded-full flex items-center justify-center flex-shrink-0">
                <Zap size={14} className="text-ch-text" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-white text-xs font-semibold">Upgrade to Premium</div>
                <div className="text-white/50 text-[10px]">Photos, menus, body tracking</div>
              </div>
              <ChevronRight size={14} className="text-white/40" />
            </button>
          ) : (
            <div className="flex items-center gap-2 px-1">
              <span className="text-ch-yellow text-sm">✦</span>
              <span className="text-xs text-ch-muted font-medium">Premium active</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
