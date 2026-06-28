import { useState, createContext, useContext } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Onboarding from './screens/Onboarding'
import Chat from './screens/Chat'
import Diary from './screens/Diary'
import Library from './screens/Library'
import Insights from './screens/Insights'
import BodyProgress from './screens/BodyProgress'
import Upgrade from './screens/Upgrade'
import Settings from './screens/Settings'

export const AppContext = createContext(null)

export function useApp() {
  return useContext(AppContext)
}

const initialUser = {
  name: 'Mike',
  goal: 'cut',
  calories: 1850,
  protein: 165,
  carbs: 180,
  fat: 55,
  currentWeight: 192,
  targetWeight: 178,
  isPremium: false,
  messagesLeft: 18,
  totalMessages: 20,
}

export default function App() {
  const [onboarded, setOnboarded] = useState(false)
  const [user, setUser] = useState(initialUser)

  return (
    <AppContext.Provider value={{ user, setUser, onboarded, setOnboarded }}>
      <div className="phone-shell">
        <HashRouter>
          <Routes>
            {!onboarded
              ? <Route path="*" element={<Onboarding />} />
              : <>
                  <Route path="/" element={<Navigate to="/chat" replace />} />
                  <Route path="/chat" element={<Chat />} />
                  <Route path="/diary" element={<Diary />} />
                  <Route path="/library" element={<Library />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/body" element={<BodyProgress />} />
                  <Route path="/upgrade" element={<Upgrade />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/chat" replace />} />
                </>
            }
          </Routes>
        </HashRouter>
      </div>
    </AppContext.Provider>
  )
}
