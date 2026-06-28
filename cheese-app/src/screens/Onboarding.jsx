import { useState } from 'react'
import { ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { useApp } from '../App'

const STEPS = ['welcome', 'name', 'goal', 'stats', 'activity', 'results']

function ProgressDots({ step }) {
  const idx = STEPS.indexOf(step)
  const trackable = STEPS.filter(s => s !== 'welcome' && s !== 'results')
  const tidx = trackable.indexOf(step)
  if (tidx === -1) return null
  return (
    <div className="flex gap-1.5 justify-center">
      {trackable.map((_, i) => (
        <div key={i} className={`h-1.5 rounded-full transition-all ${i <= tidx ? 'bg-ch-yellow w-4' : 'bg-ch-border w-1.5'}`} />
      ))}
    </div>
  )
}

export default function Onboarding() {
  const { setOnboarded, setUser } = useApp()
  const [step, setStep] = useState('welcome')
  const [form, setForm] = useState({
    name: '',
    goal: '',
    sex: '',
    age: '',
    height: '',
    weight: '',
    activity: '',
  })

  const next = (s) => setStep(s || (() => {
    const idx = STEPS.indexOf(step)
    setStep(STEPS[Math.min(idx + 1, STEPS.length - 1)])
  }))
  const back = () => {
    const idx = STEPS.indexOf(step)
    setStep(STEPS[Math.max(idx - 1, 0)])
  }

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const computeTargets = () => {
    const cal = form.goal === 'cut' ? 1850 : form.goal === 'bulk' ? 2650 : 2200
    const protein = form.goal === 'cut' ? 165 : form.goal === 'bulk' ? 195 : 175
    const carbs = form.goal === 'cut' ? 180 : form.goal === 'bulk' ? 280 : 230
    const fat = form.goal === 'cut' ? 55 : form.goal === 'bulk' ? 75 : 65
    return { calories: cal, protein, carbs, fat }
  }

  const finish = () => {
    const targets = computeTargets()
    setUser(u => ({ ...u, name: form.name || 'Mike', goal: form.goal || 'cut', ...targets }))
    setOnboarded(true)
  }

  if (step === 'welcome') return (
    <div className="screen bg-ch-yellow flex flex-col items-center justify-between px-6 py-12">
      <div />
      <div className="flex flex-col items-center text-center gap-6">
        <div className="text-7xl">🧀</div>
        <div>
          <h1 className="text-4xl font-bold text-ch-text tracking-tight">Cheese</h1>
          <p className="text-ch-text/70 text-base mt-2 leading-relaxed">
            The AI nutrition coach that<br />teaches you while you track.
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <button
          onClick={() => next('name')}
          className="w-full bg-ch-text text-white font-semibold py-4 rounded-2xl text-base"
        >
          Get started
        </button>
        <button className="text-ch-text/60 text-sm py-2">Already have an account? Sign in</button>
      </div>
    </div>
  )

  if (step === 'name') return (
    <div className="screen bg-ch-bg flex flex-col px-6 pt-14 pb-8 gap-8">
      <button onClick={back} className="text-ch-muted self-start"><ChevronLeft size={24} /></button>
      <ProgressDots step={step} />
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-ch-text">What's your name?</h2>
          <p className="text-ch-muted text-sm mt-1">Cheese will use this to greet you personally.</p>
        </div>
        <input
          autoFocus
          type="text"
          placeholder="Your first name"
          value={form.name}
          onChange={e => update('name', e.target.value)}
          className="bg-white border border-ch-border rounded-2xl px-4 py-4 text-lg text-ch-text placeholder:text-ch-muted/60 w-full"
        />
      </div>
      <button
        onClick={() => next('goal')}
        disabled={!form.name.trim()}
        className="w-full bg-ch-yellow text-ch-text font-semibold py-4 rounded-2xl text-base disabled:opacity-40"
      >
        Continue
      </button>
    </div>
  )

  if (step === 'goal') return (
    <div className="screen bg-ch-bg flex flex-col px-6 pt-14 pb-8 gap-8">
      <button onClick={back} className="text-ch-muted self-start"><ChevronLeft size={24} /></button>
      <ProgressDots step={step} />
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-ch-text">What's your goal,<br />{form.name}?</h2>
          <p className="text-ch-muted text-sm mt-1">This shapes your calorie budget and coaching style.</p>
        </div>
        <div className="flex flex-col gap-3">
          {[
            { id: 'cut', emoji: '🔥', title: 'Lose weight', desc: 'Calorie deficit, high protein to protect muscle' },
            { id: 'maintain', emoji: '⚖️', title: 'Maintain weight', desc: 'Hit your TDEE, balanced macros' },
            { id: 'bulk', emoji: '💪', title: 'Gain muscle', desc: 'Calorie surplus, maximize protein for growth' },
          ].map(({ id, emoji, title, desc }) => (
            <button
              key={id}
              onClick={() => update('goal', id)}
              className={`flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                form.goal === id ? 'border-ch-yellow bg-ch-yellow/10' : 'border-ch-border bg-white'
              }`}
            >
              <span className="text-2xl">{emoji}</span>
              <div>
                <div className="font-semibold text-ch-text">{title}</div>
                <div className="text-xs text-ch-muted mt-0.5">{desc}</div>
              </div>
              {form.goal === id && (
                <div className="ml-auto w-6 h-6 bg-ch-yellow rounded-full flex items-center justify-center">
                  <Check size={14} strokeWidth={3} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => next('stats')}
        disabled={!form.goal}
        className="w-full bg-ch-yellow text-ch-text font-semibold py-4 rounded-2xl text-base disabled:opacity-40"
      >
        Continue
      </button>
    </div>
  )

  if (step === 'stats') return (
    <div className="screen bg-ch-bg flex flex-col px-6 pt-14 pb-8 gap-8">
      <button onClick={back} className="text-ch-muted self-start"><ChevronLeft size={24} /></button>
      <ProgressDots step={step} />
      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-ch-text">Tell us about yourself</h2>
          <p className="text-ch-muted text-sm mt-1">Used to calculate your personalized calorie target.</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            {['Male', 'Female'].map(s => (
              <button
                key={s}
                onClick={() => update('sex', s.toLowerCase())}
                className={`flex-1 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
                  form.sex === s.toLowerCase() ? 'border-ch-yellow bg-ch-yellow/10 text-ch-text' : 'border-ch-border bg-white text-ch-muted'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {[
            { key: 'age', label: 'Age', placeholder: '28', suffix: 'yrs' },
            { key: 'height', label: 'Height', placeholder: '5\'10"', suffix: '' },
            { key: 'weight', label: 'Current weight', placeholder: '192', suffix: 'lbs' },
          ].map(({ key, label, placeholder, suffix }) => (
            <div key={key} className="bg-white border border-ch-border rounded-2xl px-4 py-3 flex items-center">
              <div className="flex-1">
                <div className="text-[11px] font-semibold text-ch-muted uppercase tracking-wide">{label}</div>
                <input
                  type={key === 'height' ? 'text' : 'number'}
                  placeholder={placeholder}
                  value={form[key]}
                  onChange={e => update(key, e.target.value)}
                  className="text-ch-text text-lg font-medium w-full bg-transparent mt-0.5 placeholder:text-ch-muted/40"
                />
              </div>
              {suffix && <span className="text-ch-muted text-sm">{suffix}</span>}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() => next('activity')}
        disabled={!form.sex || !form.age || !form.weight}
        className="w-full bg-ch-yellow text-ch-text font-semibold py-4 rounded-2xl text-base disabled:opacity-40"
      >
        Continue
      </button>
    </div>
  )

  if (step === 'activity') return (
    <div className="screen bg-ch-bg flex flex-col px-6 pt-14 pb-8 gap-8">
      <button onClick={back} className="text-ch-muted self-start"><ChevronLeft size={24} /></button>
      <ProgressDots step={step} />
      <div className="flex-1 flex flex-col gap-5">
        <div>
          <h2 className="text-2xl font-bold text-ch-text">How active are you?</h2>
          <p className="text-ch-muted text-sm mt-1">Be honest — this affects your calorie budget directly.</p>
        </div>
        <div className="flex flex-col gap-2.5">
          {[
            { id: 'sedentary', label: 'Sedentary', desc: 'Desk job, little to no exercise' },
            { id: 'light', label: 'Lightly active', desc: 'Exercise 1–3 days/week' },
            { id: 'moderate', label: 'Moderately active', desc: 'Exercise 3–5 days/week' },
            { id: 'active', label: 'Very active', desc: 'Hard exercise 6–7 days/week' },
          ].map(({ id, label, desc }) => (
            <button
              key={id}
              onClick={() => update('activity', id)}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all ${
                form.activity === id ? 'border-ch-yellow bg-ch-yellow/10' : 'border-ch-border bg-white'
              }`}
            >
              <div>
                <div className="font-semibold text-ch-text text-sm">{label}</div>
                <div className="text-xs text-ch-muted mt-0.5">{desc}</div>
              </div>
              {form.activity === id && (
                <div className="w-6 h-6 bg-ch-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={14} strokeWidth={3} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => next('results')}
        disabled={!form.activity}
        className="w-full bg-ch-yellow text-ch-text font-semibold py-4 rounded-2xl text-base disabled:opacity-40"
      >
        Calculate my targets
      </button>
    </div>
  )

  if (step === 'results') {
    const targets = computeTargets()
    const goalLabel = form.goal === 'cut' ? 'lose weight' : form.goal === 'bulk' ? 'gain muscle' : 'maintain weight'
    return (
      <div className="screen bg-ch-bg flex flex-col px-6 pt-14 pb-8 gap-6">
        <div className="flex-1 flex flex-col gap-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🎯</div>
            <h2 className="text-2xl font-bold text-ch-text">Your targets, {form.name}</h2>
            <p className="text-ch-muted text-sm mt-1">Optimized to {goalLabel}</p>
          </div>

          <div className="bg-ch-yellow/20 border-2 border-ch-yellow rounded-2xl p-5 text-center">
            <div className="text-4xl font-bold text-ch-text">{targets.calories}</div>
            <div className="text-ch-muted text-sm font-medium mt-1">calories per day</div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Protein', value: targets.protein, color: '#34C77B', note: 'Preserves muscle' },
              { label: 'Carbs', value: targets.carbs, color: '#4A90D9', note: 'Fuels training' },
              { label: 'Fat', value: targets.fat, color: '#F59B42', note: 'Hormones & satiety' },
            ].map(({ label, value, color, note }) => (
              <div key={label} className="bg-white rounded-2xl p-3 text-center border border-ch-border">
                <div className="text-xl font-bold" style={{ color }}>{value}g</div>
                <div className="text-xs font-semibold text-ch-text mt-0.5">{label}</div>
                <div className="text-[10px] text-ch-muted mt-1 leading-tight">{note}</div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-4 border border-ch-border">
            <div className="flex gap-2">
              <span className="text-base">💡</span>
              <div>
                <div className="font-semibold text-ch-text text-sm mb-1">Why these numbers?</div>
                <p className="text-ch-muted text-xs leading-relaxed">
                  {form.goal === 'cut'
                    ? `At ${targets.calories} kcal/day you're in a ~350–500 calorie deficit — the sweet spot for fat loss without burning muscle. High protein (${targets.protein}g) is critical: it keeps you full and tells your body to hold onto muscle while in deficit.`
                    : form.goal === 'bulk'
                    ? `At ${targets.calories} kcal/day you're in a lean surplus. ${targets.protein}g of protein gives your muscles the building blocks to grow. The extra carbs fuel hard training sessions.`
                    : `At ${targets.calories} kcal/day you're matching your estimated calorie burn. Balanced macros support energy, recovery, and performance.`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={finish}
          className="w-full bg-ch-yellow text-ch-text font-semibold py-4 rounded-2xl text-base flex items-center justify-center gap-2"
        >
          Let's go <ChevronRight size={18} />
        </button>
      </div>
    )
  }

  return null
}
