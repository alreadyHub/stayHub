import { useState } from 'react'
import { Search, Plus, RotateCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import MenuButton from '../components/MenuButton'

const FOODS = [
  { id: 1, name: '3 eggs scrambled', cal: 210, protein: 18, carbs: 2, fat: 14, freq: 5, type: 'food' },
  { id: 2, name: '½ avocado', cal: 120, protein: 1, carbs: 6, fat: 11, freq: 4, type: 'food' },
  { id: 3, name: 'Protein shake', cal: 160, protein: 30, carbs: 5, fat: 3, freq: 3, type: 'food' },
  { id: 4, name: 'Greek yogurt (plain, 1 cup)', cal: 130, protein: 18, carbs: 9, fat: 0, freq: 2, type: 'food' },
  { id: 5, name: 'Grilled chicken breast (6oz)', cal: 280, protein: 52, carbs: 0, fat: 6, freq: 2, type: 'food' },
]

const MEALS = [
  {
    id: 1,
    name: 'Breakfast usual',
    cal: 510,
    protein: 25,
    carbs: 42,
    fat: 22,
    items: ['3 scrambled eggs', '½ avocado', '2 slices sourdough'],
    freq: 5,
  },
  {
    id: 2,
    name: 'Gym day lunch',
    cal: 560,
    protein: 58,
    carbs: 40,
    fat: 12,
    items: ['6oz grilled chicken', '½ cup brown rice', 'Broccoli', 'Hot sauce'],
    freq: 3,
  },
]

function FoodItem({ item, onLog }) {
  const [logged, setLogged] = useState(false)
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-ch-border/50 last:border-0">
      <div className="flex-1">
        <div className="text-sm font-medium text-ch-text">{item.name}</div>
        <div className="text-[11px] text-ch-muted mt-0.5">{item.cal} kcal · {item.protein}g P · {item.carbs}g C · {item.fat}g F</div>
      </div>
      <button
        onClick={() => { setLogged(true); setTimeout(() => setLogged(false), 2000) }}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
          logged ? 'bg-ch-green text-white' : 'bg-ch-yellow/20 text-ch-yellow'
        }`}
      >
        {logged ? '✓ Logged' : <><Plus size={12} /> Log</>}
      </button>
    </div>
  )
}

function MealCard({ meal }) {
  const [logged, setLogged] = useState(false)
  return (
    <div className="bg-white rounded-2xl border border-ch-border overflow-hidden">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex-1">
          <div className="font-semibold text-ch-text text-sm">{meal.name}</div>
          <div className="text-[11px] text-ch-muted mt-0.5">{meal.cal} kcal · {meal.protein}g protein</div>
          <div className="text-[11px] text-ch-muted/70 mt-1 leading-relaxed">
            {meal.items.join(' · ')}
          </div>
        </div>
        <button
          onClick={() => { setLogged(true); setTimeout(() => setLogged(false), 2000) }}
          className={`ml-3 flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
            logged ? 'bg-ch-green text-white' : 'bg-ch-yellow text-ch-text'
          }`}
        >
          {logged ? '✓ Added' : <><RotateCcw size={12} /> 1-tap</>}
        </button>
      </div>
    </div>
  )
}

export default function Library() {
  const [tab, setTab] = useState('meals')
  const [query, setQuery] = useState('')

  const filteredFoods = FOODS.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
  const filteredMeals = MEALS.filter(m => m.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="screen bg-ch-bg">
      {/* Header */}
      <div className="bg-white border-b border-ch-border px-4 pb-4 safe-top">
        <div className="flex items-center gap-3 mb-1">
          <MenuButton />
          <h1 className="text-xl font-bold text-ch-text">My Library</h1>
        </div>
        <p className="text-xs text-ch-muted mt-0.5 ml-12">Your saved foods and meals</p>

        {/* Search */}
        <div className="mt-3 flex items-center gap-2 bg-ch-bg rounded-xl px-3 py-2.5 border border-ch-border">
          <Search size={15} className="text-ch-muted" />
          <input
            type="text"
            placeholder="Search foods and meals..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 text-sm bg-transparent text-ch-text placeholder:text-ch-muted/60"
          />
        </div>

        {/* Tabs */}
        <div className="flex mt-3 bg-ch-bg rounded-xl p-0.5">
          {['meals', 'foods'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                tab === t ? 'bg-white text-ch-text shadow-sm' : 'text-ch-muted'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="scroll-area px-4 py-4">
        {tab === 'meals' && (
          <div className="flex flex-col gap-3">
            {/* Coach suggestion */}
            <div className="bg-ch-yellow/10 border border-ch-yellow/30 rounded-2xl px-4 py-3 flex gap-3">
              <span className="text-base">🧀</span>
              <div>
                <div className="text-xs font-semibold text-ch-text">Cheese suggests</div>
                <p className="text-xs text-ch-muted mt-0.5">Save your "Breakfast usual" — you've logged it 5 times this week!</p>
              </div>
            </div>

            {filteredMeals.map(m => <MealCard key={m.id} meal={m} />)}

            <button className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-ch-border rounded-2xl text-ch-muted text-sm font-medium">
              <Plus size={16} /> Add custom meal
            </button>
          </div>
        )}

        {tab === 'foods' && (
          <div className="bg-white rounded-2xl border border-ch-border overflow-hidden">
            {filteredFoods.map(f => <FoodItem key={f.id} item={f} />)}
            <button className="w-full flex items-center justify-center gap-2 py-4 border-t border-ch-border text-ch-muted text-sm font-medium">
              <Plus size={16} /> Add custom food
            </button>
          </div>
        )}

        <div className="h-4" />
      </div>
    </div>
  )
}
