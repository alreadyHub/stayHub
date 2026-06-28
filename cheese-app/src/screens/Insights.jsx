import { useState } from 'react'
import { TrendingDown, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MenuButton from '../components/MenuButton'
import { useApp } from '../App'

const WEIGHT_DATA = [
  { day: 'Mon', w: 192 },
  { day: 'Tue', w: 191.8 },
  { day: 'Wed', w: 191.4 },
  { day: 'Thu', w: 191.6 },
  { day: 'Fri', w: 191.1 },
  { day: 'Sat', w: 190.8 },
  { day: 'Sun', w: 190.5 },
]

const ADHERENCE = [
  { day: 'M', pct: 0.92 },
  { day: 'T', pct: 0.78 },
  { day: 'W', pct: 0.95 },
  { day: 'Th', pct: 0.88 },
  { day: 'F', pct: 0.60 },
  { day: 'Sa', pct: 0.82 },
  { day: 'Su', pct: 0.71 },
]

function WeightChart() {
  const min = Math.min(...WEIGHT_DATA.map(d => d.w)) - 0.5
  const max = Math.max(...WEIGHT_DATA.map(d => d.w)) + 0.5
  const range = max - min
  const h = 80
  const w = 280

  const pts = WEIGHT_DATA.map((d, i) => {
    const x = (i / (WEIGHT_DATA.length - 1)) * (w - 20) + 10
    const y = h - ((d.w - min) / range) * (h - 16) - 8
    return `${x},${y}`
  })

  return (
    <div className="w-full overflow-hidden">
      <svg viewBox={`0 0 ${w} ${h + 16}`} className="w-full">
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34C77B" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#34C77B" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          points={pts.join(' ')}
          fill="none"
          stroke="#34C77B"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {WEIGHT_DATA.map((d, i) => {
          const [x, y] = pts[i].split(',').map(Number)
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="#34C77B" />
              <text x={x} y={h + 12} textAnchor="middle" fontSize="9" fill="#8A8A8A">{d.day}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function AdherenceBar({ item }) {
  const color = item.pct >= 0.85 ? '#34C77B' : item.pct >= 0.7 ? '#F59B42' : '#F56B6B'
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <div className="w-full relative flex items-end justify-center" style={{ height: 50 }}>
        <div
          className="w-5 rounded-t-sm"
          style={{ height: `${item.pct * 50}px`, background: color, transition: 'height 0.5s ease' }}
        />
      </div>
      <span className="text-[10px] text-ch-muted">{item.day}</span>
    </div>
  )
}

export default function Insights() {
  const { user } = useApp()
  const navigate = useNavigate()
  const [period, setPeriod] = useState('week')

  const weightLost = 192 - 190.5

  return (
    <div className="screen bg-ch-bg">
      {/* Header */}
      <div className="bg-white border-b border-ch-border px-4 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-1">
          <MenuButton />
          <h1 className="text-xl font-bold text-ch-text">Insights</h1>
        </div>
        <p className="text-xs text-ch-muted mt-0.5 ml-12">Your personalized report card</p>

        {/* Period toggle */}
        <div className="flex mt-3 bg-ch-bg rounded-xl p-0.5">
          {['week', 'month'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                period === p ? 'bg-white text-ch-text shadow-sm' : 'text-ch-muted'
              }`}
            >
              This {p}
            </button>
          ))}
        </div>
      </div>

      <div className="scroll-area px-4 py-4 flex flex-col gap-4">
        {/* Progress hero */}
        <div className="bg-ch-green/10 border border-ch-green/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} className="text-ch-green" />
            <span className="font-bold text-ch-text text-sm">This week's wins 🎉</span>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-ch-green">−{weightLost}</div>
              <div className="text-[10px] text-ch-muted">lbs lost</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ch-text">6/7</div>
              <div className="text-[10px] text-ch-muted">days logged</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-ch-text">83%</div>
              <div className="text-[10px] text-ch-muted">macro adherence</div>
            </div>
          </div>
          <p className="text-xs text-ch-muted mt-3 leading-relaxed">
            You're trending 1.1 lbs/week — right in the sweet spot for fat loss. At this rate you'll hit your target of 178 lbs in about 11 weeks. 🏆
          </p>
        </div>

        {/* Weight chart */}
        <div className="bg-white rounded-2xl border border-ch-border p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-ch-text text-sm">Weight trend</span>
            <div className="flex items-center gap-1 text-ch-green">
              <TrendingDown size={14} />
              <span className="text-xs font-semibold">−1.5 lbs</span>
            </div>
          </div>
          <WeightChart />
          <div className="flex justify-between mt-2 text-[11px]">
            <span className="text-ch-muted">Start: <strong className="text-ch-text">192 lbs</strong></span>
            <span className="text-ch-muted">Now: <strong className="text-ch-text">190.5 lbs</strong></span>
            <span className="text-ch-muted">Goal: <strong className="text-ch-text">178 lbs</strong></span>
          </div>
        </div>

        {/* Macro adherence */}
        <div className="bg-white rounded-2xl border border-ch-border p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-ch-text text-sm">Daily adherence</span>
            <span className="text-xs text-ch-muted">vs. your targets</span>
          </div>
          <div className="flex gap-1">
            {ADHERENCE.map((a, i) => <AdherenceBar key={i} item={a} />)}
          </div>
        </div>

        {/* Food report card */}
        <div className="bg-white rounded-2xl border border-ch-border overflow-hidden">
          <div className="px-4 py-3 border-b border-ch-border/50">
            <span className="font-semibold text-ch-text text-sm">Food report card</span>
          </div>
          <div className="divide-y divide-ch-border/50">
            <div className="px-4 py-3 flex gap-3">
              <span className="text-base flex-shrink-0">✅</span>
              <div>
                <div className="font-semibold text-ch-text text-xs">Crushing protein</div>
                <p className="text-[11px] text-ch-muted mt-0.5 leading-relaxed">You're hitting {'>'}90% of your 165g protein goal on most days. This is keeping muscle loss in check while you cut. Keep it up.</p>
              </div>
            </div>
            <div className="px-4 py-3 flex gap-3">
              <span className="text-base flex-shrink-0">✅</span>
              <div>
                <div className="font-semibold text-ch-text text-xs">Consistent logging</div>
                <p className="text-[11px] text-ch-muted mt-0.5 leading-relaxed">6 out of 7 days logged — the data is working for you. The more you log, the more accurately Cheese can coach you.</p>
              </div>
            </div>
            <div className="px-4 py-3 flex gap-3">
              <span className="text-base flex-shrink-0">⚠️</span>
              <div>
                <div className="font-semibold text-ch-text text-xs">Watch the oils & nuts</div>
                <p className="text-[11px] text-ch-muted mt-0.5 leading-relaxed">Cooking oils and nuts showed up 3× as hidden calorie sources this week — totaling ~400 unplanned calories. These are easy fixes that compound over time.</p>
              </div>
            </div>
            <div className="px-4 py-3 flex gap-3">
              <span className="text-base flex-shrink-0">📈</span>
              <div>
                <div className="font-semibold text-ch-text text-xs">Saturday opportunity</div>
                <p className="text-[11px] text-ch-muted mt-0.5 leading-relaxed">Saturdays are your lowest adherence day (60%). No pressure — awareness is step one. Even a rough estimate on weekends beats no data.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Body progress upsell */}
        {!true && null}
        <button
          onClick={() => navigate('/body')}
          className="w-full bg-ch-text rounded-2xl p-4 flex items-center gap-3 text-left"
        >
          <span className="text-2xl">📸</span>
          <div className="flex-1">
            <div className="text-white font-semibold text-sm">Track body composition</div>
            <div className="text-white/60 text-xs mt-0.5">Premium: AI body-fat estimate from photos</div>
          </div>
          <span className="text-ch-yellow text-xs font-semibold border border-ch-yellow/40 rounded-lg px-2 py-1">✦ Pro</span>
        </button>

        <div className="h-4" />
      </div>
    </div>
  )
}
