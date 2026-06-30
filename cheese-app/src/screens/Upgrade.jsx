import { Check, X, Camera, Image, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App'

const FEATURES = [
  { icon: '💬', label: 'Conversational food logging', free: true, premium: true },
  { icon: '📊', label: 'Macro tracking & daily totals', free: true, premium: true },
  { icon: '🎓', label: 'AI coaching & education', free: true, premium: true },
  { icon: '📚', label: 'Food & meal library + 1-tap re-log', free: true, premium: true },
  { icon: '📬', label: 'Daily message allowance', free: '20 / day', premium: 'Unlimited' },
  { icon: '📷', label: 'Photo logging (snap & track)', free: false, premium: true },
  { icon: '🍽️', label: 'Menu analysis (link, text, or photo)', free: false, premium: true },
  { icon: '📸', label: 'Body-fat estimate from photos', free: false, premium: true },
]

export default function Upgrade() {
  const navigate = useNavigate()
  const { user, setUser } = useApp()

  const upgrade = () => {
    setUser(u => ({ ...u, isPremium: true, messagesLeft: 999, totalMessages: 999 }))
    navigate('/chat')
  }

  return (
    <div className="screen bg-ch-bg">
      <div className="scroll-area">
        {/* Hero */}
        <div className="bg-ch-text px-6 pb-8 safe-top relative overflow-hidden">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-12 left-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
          >
            <X size={16} className="text-white" />
          </button>

          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 bg-ch-yellow/20 border border-ch-yellow/40 rounded-full px-3 py-1 mb-4">
              <Zap size={12} className="text-ch-yellow" />
              <span className="text-ch-yellow text-xs font-semibold">Cheese Premium</span>
            </div>
            <h1 className="text-2xl font-bold text-white">Unlock the full coach</h1>
            <p className="text-white/60 text-sm mt-2 leading-relaxed">
              Photos, menus, body-fat tracking — the features that make Cheese truly effortless.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { emoji: '📷', label: 'Snap to log', desc: 'Photo meal logging' },
              { emoji: '🍽️', label: 'Menu AI', desc: 'Order smart' },
              { emoji: '📸', label: 'Body check', desc: 'BF% estimates' },
            ].map(f => (
              <div key={f.label} className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-xl">{f.emoji}</div>
                <div className="text-white text-xs font-semibold mt-1">{f.label}</div>
                <div className="text-white/50 text-[10px] mt-0.5">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="px-4 py-5">
          <div className="bg-ch-yellow rounded-2xl p-5 flex items-center justify-between">
            <div>
              <div className="font-bold text-ch-text text-lg">$9.99 / month</div>
              <div className="text-ch-text/60 text-xs mt-0.5">Cancel anytime. No commitments.</div>
            </div>
            <div className="bg-ch-text text-ch-yellow text-[10px] font-bold px-2 py-1 rounded-lg">BEST VALUE</div>
          </div>

          {/* CTA */}
          <button
            onClick={upgrade}
            className="w-full mt-3 bg-ch-text text-white font-bold py-4 rounded-2xl text-base"
          >
            Start Premium — $9.99/mo
          </button>
          <p className="text-center text-[11px] text-ch-muted mt-2">7-day free trial · No charge today</p>
        </div>

        {/* Comparison table */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-2xl border border-ch-border overflow-hidden">
            <div className="grid grid-cols-3 text-center py-3 border-b border-ch-border/50 bg-ch-bg">
              <div className="text-xs font-semibold text-ch-muted">Feature</div>
              <div className="text-xs font-semibold text-ch-muted">Free</div>
              <div className="text-xs font-semibold text-ch-yellow">Premium</div>
            </div>
            {FEATURES.map((f, i) => (
              <div key={i} className="grid grid-cols-3 py-3 border-b border-ch-border/40 last:border-0 items-center">
                <div className="px-3 flex items-center gap-1.5">
                  <span className="text-xs">{f.emoji}</span>
                  <span className="text-[11px] text-ch-text leading-tight">{f.label}</span>
                </div>
                <div className="text-center">
                  {f.free === true
                    ? <Check size={14} className="text-ch-green mx-auto" />
                    : f.free === false
                    ? <X size={14} className="text-ch-border mx-auto" />
                    : <span className="text-[10px] text-ch-muted">{f.free}</span>
                  }
                </div>
                <div className="text-center">
                  {f.premium === true
                    ? <Check size={14} className="text-ch-yellow mx-auto" strokeWidth={3} />
                    : <span className="text-[10px] text-ch-yellow font-semibold">{f.premium}</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="px-4 pb-6">
          <div className="bg-white rounded-2xl border border-ch-border p-4">
            <div className="flex gap-1 text-ch-yellow mb-2 text-sm">★★★★★</div>
            <p className="text-sm text-ch-text leading-relaxed italic">
              "I ate healthy my whole life and never lost weight. Cheese showed me I was eating 600 calories more than I thought — all from oils and nuts. Down 14 lbs in 3 months."
            </p>
            <div className="text-xs text-ch-muted mt-2">— Marcus, lost 14 lbs</div>
          </div>
        </div>

        <div className="h-4 safe-bottom" />
      </div>
    </div>
  )
}
