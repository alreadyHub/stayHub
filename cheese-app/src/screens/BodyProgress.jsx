import { useState } from 'react'
import { Camera, Info, TrendingDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MenuButton from '../components/MenuButton'
import { useApp } from '../App'

const ESTIMATES = [
  { date: 'Jun 1', bf: 22.4, weight: 192 },
  { date: 'Jun 14', bf: 21.8, weight: 191 },
  { date: 'Jun 27', bf: 21.1, weight: 190.5 },
]

export default function BodyProgress() {
  const { user } = useApp()
  const navigate = useNavigate()
  const [showDisclaimer, setShowDisclaimer] = useState(false)

  if (!user.isPremium) {
    return (
      <div className="screen bg-ch-bg">
        <div className="bg-white border-b border-ch-border px-4 pt-12 pb-4">
          <h1 className="text-xl font-bold text-ch-text">Body Progress</h1>
          <p className="text-xs text-ch-muted mt-0.5">Track body composition over time</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center gap-6">
          <div className="w-20 h-20 bg-ch-yellow/20 rounded-full flex items-center justify-center">
            <Camera size={32} className="text-ch-yellow" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-ch-text">Body composition tracking</h2>
            <p className="text-ch-muted text-sm mt-2 leading-relaxed">
              Snap a photo and get a rough body-fat estimate from AI. Track changes over time alongside your weight to see real progress.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-ch-border p-4 text-left w-full">
            <div className="flex gap-2 text-xs text-ch-muted">
              <Info size={14} className="text-ch-muted/60 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">Body-fat estimates are rough approximations, not medical measurements. Use them as a progress check-in, not a diagnosis.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/upgrade')}
            className="w-full bg-ch-yellow text-ch-text font-semibold py-4 rounded-2xl"
          >
            Upgrade to Premium — $9.99/mo
          </button>
          <button onClick={() => navigate(-1)} className="text-ch-muted text-sm">Go back</button>
        </div>

      </div>
    )
  }

  return (
    <div className="screen bg-ch-bg">
      <div className="bg-white border-b border-ch-border px-4 pt-12 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MenuButton />
            <div>
              <h1 className="text-xl font-bold text-ch-text">Body Progress</h1>
              <p className="text-xs text-ch-muted mt-0.5">Estimated body composition</p>
            </div>
          </div>
          <button
            onClick={() => setShowDisclaimer(d => !d)}
            className="w-8 h-8 rounded-full bg-ch-bg flex items-center justify-center"
          >
            <Info size={16} className="text-ch-muted" />
          </button>
        </div>

        {showDisclaimer && (
          <div className="mt-3 bg-ch-amber/10 border border-ch-amber/30 rounded-xl p-3 fade-in">
            <p className="text-xs text-ch-muted leading-relaxed">
              <strong className="text-ch-text">Disclaimer:</strong> Body-fat estimates are rough, non-medical approximations based on AI image analysis. They are not a diagnosis and should not be used as medical advice. Results vary with lighting, angle, and clothing. Consult a healthcare professional for medical assessments.
            </p>
          </div>
        )}
      </div>

      <div className="scroll-area px-4 py-4 flex flex-col gap-4">
        {/* Latest estimate */}
        <div className="bg-ch-yellow/10 border-2 border-ch-yellow rounded-2xl p-4 text-center">
          <div className="text-xs text-ch-muted font-medium mb-1">LATEST ESTIMATE · Jun 27</div>
          <div className="text-4xl font-bold text-ch-text">~21%</div>
          <div className="text-ch-muted text-sm mt-1">estimated body fat</div>
          <div className="flex items-center justify-center gap-1.5 mt-2 text-ch-green text-xs font-semibold">
            <TrendingDown size={14} />
            <span>−1.3% this month</span>
          </div>
        </div>

        {/* History */}
        <div className="bg-white rounded-2xl border border-ch-border overflow-hidden">
          <div className="px-4 py-3 border-b border-ch-border/50">
            <span className="font-semibold text-ch-text text-sm">Check-in history</span>
          </div>
          {ESTIMATES.map((e, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-3 border-b border-ch-border/50 last:border-0">
              <div className="w-16 h-16 bg-ch-bg rounded-xl flex items-center justify-center">
                <span className="text-2xl">🖼</span>
              </div>
              <div className="flex-1 ml-3">
                <div className="text-sm font-medium text-ch-text">{e.date}</div>
                <div className="text-xs text-ch-muted mt-0.5">{e.weight} lbs</div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-ch-text">~{e.bf}%</div>
                <div className="text-[10px] text-ch-muted">body fat</div>
              </div>
            </div>
          ))}
        </div>

        {/* Add check-in */}
        <button className="w-full border-2 border-dashed border-ch-yellow rounded-2xl py-6 flex flex-col items-center gap-2 text-ch-yellow">
          <Camera size={24} />
          <span className="text-sm font-semibold">New check-in photo</span>
          <span className="text-xs text-ch-muted">AI estimates body fat from your photo</span>
        </button>

        <div className="h-4" />
      </div>
    </div>
  )
}
