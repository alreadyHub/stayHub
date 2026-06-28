import { useState } from 'react'
import { Plus, ChevronRight, Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import { useApp } from '../App'

const MEALS = [
  {
    id: 'breakfast',
    label: 'Breakfast',
    time: '9:14 AM',
    emoji: '🌅',
    items: [
      { name: '3 scrambled eggs', cal: 210, protein: 18, carbs: 2, fat: 14 },
      { name: '½ avocado', cal: 120, protein: 1, carbs: 6, fat: 11 },
      { name: '2 slices sourdough', cal: 180, protein: 6, carbs: 34, fat: 2 },
    ],
  },
  {
    id: 'lunch',
    label: 'Lunch',
    time: null,
    emoji: '☀️',
    items: [],
  },
  {
    id: 'dinner',
    label: 'Dinner',
    time: null,
    emoji: '🌙',
    items: [],
  },
  {
    id: 'snacks',
    label: 'Snacks',
    time: null,
    emoji: '🍎',
    items: [],
  },
]

function MacroChip({ label, value, color }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
      <span className="text-[11px] text-ch-muted">{value}g <span className="text-ch-muted/60">{label}</span></span>
    </div>
  )
}

export default function Diary() {
  const { user } = useApp()
  const navigate = useNavigate()
  const [meals, setMeals] = useState(MEALS)

  const totalCal = meals.flatMap(m => m.items).reduce((s, i) => s + i.cal, 0)
  const totalProtein = meals.flatMap(m => m.items).reduce((s, i) => s + i.protein, 0)
  const totalCarbs = meals.flatMap(m => m.items).reduce((s, i) => s + i.carbs, 0)
  const totalFat = meals.flatMap(m => m.items).reduce((s, i) => s + i.fat, 0)

  const remainingCal = user.calories - totalCal

  return (
    <div className="screen bg-ch-bg">
      {/* Header */}
      <div className="bg-white border-b border-ch-border px-4 pt-12 pb-4">
        <h1 className="text-xl font-bold text-ch-text">Today's Diary</h1>
        <p className="text-xs text-ch-muted mt-0.5">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>

        {/* Calorie summary */}
        <div className="mt-4 bg-ch-bg rounded-2xl p-4 flex items-center justify-between">
          <div className="text-center">
            <div className="text-2xl font-bold text-ch-text">{user.calories}</div>
            <div className="text-[10px] text-ch-muted font-medium mt-0.5">GOAL</div>
          </div>
          <div className="flex-1 flex items-center justify-center gap-2 text-ch-muted text-lg">
            <span>−</span>
            <div className="text-center">
              <div className="text-2xl font-bold text-ch-text">{totalCal}</div>
              <div className="text-[10px] text-ch-muted font-medium mt-0.5">EATEN</div>
            </div>
            <span>=</span>
            <div className="text-center">
              <div className={`text-2xl font-bold ${remainingCal >= 0 ? 'text-ch-green' : 'text-ch-red'}`}>
                {Math.abs(remainingCal)}
              </div>
              <div className="text-[10px] text-ch-muted font-medium mt-0.5">
                {remainingCal >= 0 ? 'REMAINING' : 'OVER'}
              </div>
            </div>
          </div>
        </div>

        {/* Macro bars */}
        <div className="flex gap-4 mt-3">
          {[
            { label: 'Protein', cur: totalProtein, total: user.protein, color: '#34C77B' },
            { label: 'Carbs', cur: totalCarbs, total: user.carbs, color: '#4A90D9' },
            { label: 'Fat', cur: totalFat, total: user.fat, color: '#F59B42' },
          ].map(({ label, cur, total, color }) => (
            <div key={label} className="flex-1 text-center">
              <div className="text-xs font-bold" style={{ color }}>{cur}g</div>
              <div className="text-[10px] text-ch-muted">{label}</div>
              <div className="h-1 bg-ch-border rounded-full mt-1 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${Math.min((cur/total)*100,100)}%`, background: color }} />
              </div>
              <div className="text-[9px] text-ch-muted mt-0.5">{total - cur}g left</div>
            </div>
          ))}
        </div>
      </div>

      {/* Meal sections */}
      <div className="scroll-area px-4 py-4 flex flex-col gap-3">
        {meals.map(meal => {
          const mealCal = meal.items.reduce((s, i) => s + i.cal, 0)
          return (
            <div key={meal.id} className="bg-white rounded-2xl border border-ch-border overflow-hidden">
              {/* Meal header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-ch-border/50">
                <div className="flex items-center gap-2">
                  <span>{meal.emoji}</span>
                  <div>
                    <span className="font-semibold text-ch-text text-sm">{meal.label}</span>
                    {meal.time && <span className="text-[11px] text-ch-muted ml-2">{meal.time}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {mealCal > 0 && <span className="text-xs font-semibold text-ch-muted">{mealCal} kcal</span>}
                  <button
                    onClick={() => navigate('/chat')}
                    className="w-7 h-7 bg-ch-yellow/20 rounded-full flex items-center justify-center"
                  >
                    <Plus size={14} className="text-ch-yellow" strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Items */}
              {meal.items.length > 0 ? (
                <div className="divide-y divide-ch-border/40">
                  {meal.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-4 py-3">
                      <div className="flex-1">
                        <div className="text-sm text-ch-text font-medium">{item.name}</div>
                        <div className="flex gap-3 mt-1">
                          <MacroChip label="P" value={item.protein} color="#34C77B" />
                          <MacroChip label="C" value={item.carbs} color="#4A90D9" />
                          <MacroChip label="F" value={item.fat} color="#F59B42" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-ch-text">{item.cal}</span>
                        <span className="text-[10px] text-ch-muted">kcal</span>
                        <button className="ml-1 text-ch-muted/40">
                          <Pencil size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <button
                  onClick={() => navigate('/chat')}
                  className="w-full px-4 py-4 text-ch-muted text-sm text-left flex items-center gap-2"
                >
                  <Plus size={14} /> Log {meal.label.toLowerCase()}
                </button>
              )}
            </div>
          )
        })}

        {/* Water */}
        <div className="bg-white rounded-2xl border border-ch-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>💧</span>
            <span className="font-semibold text-ch-text text-sm">Water</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className={`w-4 h-4 rounded-full ${i <= 3 ? 'bg-ch-blue' : 'bg-ch-border'}`} />
              ))}
            </div>
            <span className="text-xs text-ch-muted ml-1">3 / 8 cups</span>
          </div>
        </div>

        <div className="h-2" />
      </div>

      <BottomNav />
    </div>
  )
}
