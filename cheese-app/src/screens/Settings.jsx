import { useState } from 'react'
import { ChevronRight, Bell, Zap, Target, Scale, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MenuButton from '../components/MenuButton'
import { useApp } from '../App'

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-6.5 rounded-full relative transition-colors duration-200 ${value ? 'bg-ch-yellow' : 'bg-ch-border'}`}
      style={{ height: 26 }}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${value ? 'translate-x-6' : 'translate-x-0.5'}`}
      />
    </button>
  )
}

function Row({ icon: Icon, iconColor, label, right, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3.5 w-full text-left border-b border-ch-border/50 last:border-0"
    >
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: iconColor + '20' }}
      >
        <Icon size={16} style={{ color: iconColor }} />
      </div>
      <span className={`flex-1 text-sm font-medium ${danger ? 'text-ch-red' : 'text-ch-text'}`}>{label}</span>
      {right || <ChevronRight size={16} className="text-ch-muted/50" />}
    </button>
  )
}

export default function Settings() {
  const { user, setUser, setOnboarded } = useApp()
  const navigate = useNavigate()

  const [notifs, setNotifs] = useState({
    mealReminders: true,
    dailySummary: false,
    weeklyInsight: true,
  })

  return (
    <div className="screen bg-ch-bg">
      {/* Header */}
      <div className="bg-white border-b border-ch-border px-4 pt-12 pb-4">
        <div className="flex items-center gap-3">
          <MenuButton />
          <h1 className="text-xl font-bold text-ch-text">Settings</h1>
        </div>
      </div>

      <div className="scroll-area px-4 py-4 flex flex-col gap-4">
        {/* Profile */}
        <div className="bg-white rounded-2xl border border-ch-border p-4 flex items-center gap-4">
          <div className="w-14 h-14 bg-ch-yellow/20 rounded-full flex items-center justify-center text-2xl">
            🧀
          </div>
          <div className="flex-1">
            <div className="font-bold text-ch-text">{user.name}</div>
            <div className="text-xs text-ch-muted mt-0.5">
              {user.goal === 'cut' ? '🔥 Cutting' : user.goal === 'bulk' ? '💪 Bulking' : '⚖️ Maintaining'}
              {' · '}
              {user.isPremium ? (
                <span className="text-ch-yellow font-semibold">✦ Premium</span>
              ) : (
                <span>Free</span>
              )}
            </div>
          </div>
          {!user.isPremium && (
            <button
              onClick={() => navigate('/upgrade')}
              className="bg-ch-yellow text-ch-text text-xs font-bold px-3 py-1.5 rounded-xl"
            >
              Upgrade
            </button>
          )}
        </div>

        {/* Goals */}
        <div className="bg-white rounded-2xl border border-ch-border overflow-hidden">
          <div className="px-4 py-2.5 border-b border-ch-border/50">
            <span className="text-[11px] font-semibold text-ch-muted uppercase tracking-wide">My goals</span>
          </div>
          <Row
            icon={Target}
            iconColor="#F5C518"
            label={`Calorie goal: ${user.calories} kcal`}
            onClick={() => {}}
          />
          <Row
            icon={Scale}
            iconColor="#4A90D9"
            label={`Target weight: ${user.targetWeight} lbs`}
            onClick={() => {}}
          />
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-2xl border border-ch-border overflow-hidden">
          <div className="px-4 py-2.5 border-b border-ch-border/50">
            <span className="text-[11px] font-semibold text-ch-muted uppercase tracking-wide">Notifications</span>
          </div>
          {[
            { key: 'mealReminders', label: 'Meal logging reminders', desc: 'Nudge if no lunch logged by 2pm' },
            { key: 'dailySummary', label: 'Daily summary', desc: 'End-of-day macro recap' },
            { key: 'weeklyInsight', label: 'Weekly insight', desc: 'Your Monday progress report' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between px-4 py-3.5 border-b border-ch-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-ch-amber/20 flex items-center justify-center">
                  <Bell size={16} className="text-ch-amber" />
                </div>
                <div>
                  <div className="text-sm font-medium text-ch-text">{label}</div>
                  <div className="text-[11px] text-ch-muted mt-0.5">{desc}</div>
                </div>
              </div>
              <Toggle value={notifs[key]} onChange={v => setNotifs(n => ({ ...n, [key]: v }))} />
            </div>
          ))}
        </div>

        {/* Premium */}
        {!user.isPremium && (
          <button
            onClick={() => navigate('/upgrade')}
            className="w-full bg-ch-text rounded-2xl p-4 flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-ch-yellow rounded-full flex items-center justify-center">
              <Zap size={16} className="text-ch-text" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-white font-semibold text-sm">Unlock Premium</div>
              <div className="text-white/60 text-xs mt-0.5">Photos, menus, body tracking</div>
            </div>
            <span className="text-ch-yellow text-xs font-bold">$9.99/mo →</span>
          </button>
        )}

        {/* Account */}
        <div className="bg-white rounded-2xl border border-ch-border overflow-hidden">
          <div className="px-4 py-2.5 border-b border-ch-border/50">
            <span className="text-[11px] font-semibold text-ch-muted uppercase tracking-wide">Account</span>
          </div>
          <Row icon={LogOut} iconColor="#F56B6B" label="Reset prototype" danger onClick={() => { setOnboarded(false) }} right={null} />
        </div>

        <p className="text-center text-[11px] text-ch-muted pb-2">
          Cheese v1.0 prototype · For feedback only
        </p>

        <div className="h-4" />
      </div>
    </div>
  )
}
