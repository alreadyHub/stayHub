import { useNavigate, useLocation } from 'react-router-dom'
import { MessageCircle, BookOpen, BarChart2, Library, Settings } from 'lucide-react'

const tabs = [
  { path: '/chat', icon: MessageCircle, label: 'Coach' },
  { path: '/diary', icon: BookOpen, label: 'Diary' },
  { path: '/insights', icon: BarChart2, label: 'Insights' },
  { path: '/library', icon: Library, label: 'Library' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className="bg-white border-t border-ch-border safe-bottom">
      <div className="flex">
        {tabs.map(({ path, icon: Icon, label }) => {
          const active = pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex-1 flex flex-col items-center gap-0.5 py-2 transition-colors"
            >
              <Icon
                size={22}
                className={active ? 'text-ch-yellow' : 'text-ch-muted'}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span className={`text-[10px] font-medium ${active ? 'text-ch-yellow' : 'text-ch-muted'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
