import { useState, useRef, useEffect } from 'react'
import { Send, Camera, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import CalorieRing from '../components/CalorieRing'
import MacroBar from '../components/MacroBar'
import MenuButton from '../components/MenuButton'
import { useApp } from '../App'

const getGreeting = (name) => {
  const h = new Date().getHours()
  const time = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'
  return `Good ${time}, ${name} 👋`
}

const INITIAL_MESSAGES = [
  {
    id: 1, role: 'coach',
    text: `I'm Cheese, your nutrition coach. Tell me what you've eaten today, ask what you should eat next, or share a restaurant menu and I'll help you order smart. What's up?`,
    time: '9:01 AM',
  },
  {
    id: 2, role: 'user',
    text: 'I had eggs and avocado toast for breakfast',
    time: '9:14 AM',
  },
  {
    id: 3, role: 'coach',
    text: `Got it — logging that now! Quick question: how many eggs, and was the toast one slice or two? Also, did you use butter or oil on the pan?`,
    time: '9:14 AM',
    tag: 'clarifying',
  },
  {
    id: 4, role: 'user',
    text: '3 eggs, 2 slices, no butter',
    time: '9:15 AM',
  },
  {
    id: 5, role: 'coach',
    text: `Perfect. I've logged your breakfast:\n\n🥚 3 scrambled eggs — 210 kcal, 18g protein\n🥑 ½ avocado — 120 kcal, 1g protein\n🍞 2 slices sourdough — 180 kcal, 6g protein\n\n**Total: ~510 kcal · 25g protein · 42g carbs · 22g fat**\n\n💡 Quick heads-up: avocado is a fantastic food, but it's calorie-dense (about 240 kcal per whole one). Half is a smart call for your cut — keeps the healthy fats without blowing your budget.`,
    time: '9:15 AM',
  },
]

function CoachBubble({ msg }) {
  return (
    <div className="flex gap-2 fade-in">
      <div className="w-7 h-7 rounded-full bg-ch-yellow flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">🧀</div>
      <div className="flex-1 max-w-[85%]">
        <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-ch-border">
          <MessageText text={msg.text} />
          {msg.tag === 'clarifying' && (
            <div className="mt-2 pt-2 border-t border-ch-border flex items-center gap-1.5">
              <Zap size={11} className="text-ch-yellow" />
              <span className="text-[10px] text-ch-muted font-medium">Clarifying hidden inputs</span>
            </div>
          )}
        </div>
        <div className="text-[10px] text-ch-muted mt-1 ml-1">{msg.time}</div>
      </div>
    </div>
  )
}

function MessageText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return (
    <p className="text-ch-text text-sm leading-relaxed whitespace-pre-line">
      {parts.map((p, i) =>
        p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p
      )}
    </p>
  )
}

function UserBubble({ msg }) {
  return (
    <div className="flex justify-end fade-in">
      <div className="max-w-[75%]">
        <div className="bg-ch-yellow text-ch-text text-sm rounded-2xl rounded-tr-sm px-4 py-3 font-medium">
          {msg.text}
        </div>
        <div className="text-[10px] text-ch-muted mt-1 text-right mr-1">{msg.time}</div>
      </div>
    </div>
  )
}

export default function Chat() {
  const { user, setUser } = useApp()
  const navigate = useNavigate()
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const consumed = { cal: 510, protein: 25, carbs: 42, fat: 22 }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim()) return
    if (user.messagesLeft <= 0) { navigate('/upgrade'); return }

    const now = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    const userMsg = { id: Date.now(), role: 'user', text: input, time: now }

    setMessages(m => [...m, userMsg])
    setInput('')
    setUser(u => ({ ...u, messagesLeft: u.messagesLeft - 1 }))

    // Mock coach responses
    const lower = input.toLowerCase()
    let reply = `Got it! I'll note that down. Keep going — you're doing great today. 💪`

    if (lower.includes('what should i eat') || lower.includes('hungry')) {
      reply = `You have ${user.calories - consumed.cal} kcal and ${user.protein - consumed.protein}g protein left for the day. For lunch I'd suggest:\n\n🐔 4 oz grilled chicken — ~185 kcal, 35g protein\n🍚 ½ cup brown rice — ~110 kcal, 2g protein\n🥦 Steamed broccoli — ~55 kcal\n\n**Total: ~350 kcal · 37g protein** — that leaves room for a lighter dinner and keeps your protein on track.`
    } else if (lower.includes('nuts') || lower.includes('almond') || lower.includes('cashew')) {
      reply = `Nuts are healthy, but they're a calorie bomb. Just a ¼ cup of almonds is ~200 kcal and barely registers as a meal. For your cut, I'd limit to a small handful (1 oz / 28g) max as a snack, and log them precisely — this is exactly the kind of food people undercount. 📌`
    } else if (lower.includes('olive oil') || lower.includes('oil')) {
      reply = `This is one of the most commonly missed inputs! One tablespoon of olive oil = ~120 kcal. If you're cooking with 2 tbsp, that's 240 kcal you might not be counting. I'll always ask about cooking method — it matters a lot. Want me to log that now?`
    }

    setTimeout(() => {
      const now2 = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      setMessages(m => [...m, { id: Date.now() + 1, role: 'coach', text: reply, time: now2 }])
    }, 800)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const remainingPct = user.messagesLeft / user.totalMessages
  const msgWarning = user.messagesLeft <= 5

  return (
    <div className="screen relative bg-ch-bg">
      {/* Header */}
      <div className="bg-white border-b border-ch-border px-4 pb-0 safe-top">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <MenuButton />
            <div>
              <h1 className="text-base font-bold text-ch-text">{getGreeting(user.name)}</h1>
              <p className="text-xs text-ch-muted">
                {user.goal === 'cut' ? '🔥 Cutting' : user.goal === 'bulk' ? '💪 Bulking' : '⚖️ Maintaining'}
                {' · '}Today
              </p>
            </div>
          </div>
          <CalorieRing consumed={consumed.cal} total={user.calories} size={72} />
        </div>

        {/* Macro bars — always visible */}
        <div className="flex gap-4 py-3">
          <MacroBar label="Protein" current={consumed.protein} total={user.protein} color="#34C77B" />
          <MacroBar label="Carbs" current={consumed.carbs} total={user.carbs} color="#4A90D9" />
          <MacroBar label="Fat" current={consumed.fat} total={user.fat} color="#F59B42" />
        </div>
      </div>

      {/* Messages */}
      <div className="scroll-area px-4 py-4 flex flex-col gap-4 pb-36">
        {messages.map(msg =>
          msg.role === 'coach'
            ? <CoachBubble key={msg.id} msg={msg} />
            : <UserBubble key={msg.id} msg={msg} />
        )}
        <div ref={bottomRef} />
      </div>

      {/* Floating input */}
      <div className="absolute bottom-0 left-0 right-0 px-3 bg-ch-bg pb-0">
        {/* Fade gradient so messages fade out naturally above the input */}
        <div className="pointer-events-none absolute bottom-full left-0 right-0 h-12 bg-gradient-to-t from-ch-bg to-transparent" />

        {msgWarning && (
          <div
            onClick={() => navigate('/upgrade')}
            className="mb-2 bg-ch-amber/10 border border-ch-amber/30 rounded-2xl px-3 py-2.5 flex items-center justify-between cursor-pointer"
          >
            <span className="text-xs text-ch-amber font-medium">
              {user.messagesLeft} messages left today
            </span>
            <span className="text-xs text-ch-amber font-semibold">Upgrade →</span>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-lg shadow-black/10 border border-ch-border/60">
          <div className="flex items-end gap-2 px-3 pt-3 pb-2.5">
            {!user.isPremium ? (
              <button
                onClick={() => navigate('/upgrade')}
                className="flex-shrink-0 w-9 h-9 rounded-xl bg-ch-border/40 flex items-center justify-center relative"
              >
                <Camera size={17} className="text-ch-muted" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-ch-yellow rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-bold text-ch-text">✦</span>
                </div>
              </button>
            ) : (
              <button className="flex-shrink-0 w-9 h-9 rounded-xl bg-ch-yellow/20 flex items-center justify-center">
                <Camera size={17} className="text-ch-yellow" />
              </button>
            )}
            <div className="flex-1 flex items-end min-h-[36px]">
              <textarea
                ref={inputRef}
                rows={1}
                placeholder="Log a meal, ask what to eat..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                className="flex-1 bg-transparent text-sm text-ch-text resize-none placeholder:text-ch-muted/50 leading-5 max-h-24 py-1"
                style={{ outline: 'none', border: 'none' }}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="flex-shrink-0 w-9 h-9 rounded-xl bg-ch-yellow flex items-center justify-center disabled:opacity-35 transition-opacity"
            >
              <Send size={15} className="text-ch-text" strokeWidth={2.5} />
            </button>
          </div>
          {!msgWarning && (
            <div className="px-4 pb-3 -mt-0.5">
              <div className="flex justify-between text-[10px] text-ch-muted mb-1">
                <span>{user.messagesLeft} messages left today</span>
                <span>Resets midnight</span>
              </div>
              <div className="h-0.5 bg-ch-border rounded-full overflow-hidden">
                <div className="h-full bg-ch-yellow rounded-full transition-all" style={{ width: `${remainingPct * 100}%` }} />
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
