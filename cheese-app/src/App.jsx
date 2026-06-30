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
import Sidebar from './components/Sidebar'

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

function AppLayout({ children }) {
  return (
    <div className="relative w-full h-full">
      {children}
      <Sidebar />
    </div>
  )
}

export default function App() {
  const [onboarded, setOnboarded] = useState(true) // temporarily disabled
  const [user, setUser] = useState(initialUser)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AppContext.Provider value={{ user, setUser, onboarded, setOnboarded, sidebarOpen, setSidebarOpen }}>
      <div className="phone-shell">
        <HashRouter>
          <Routes>
            {!onboarded
              ? <Route path="*" element={<Onboarding />} />
              : <>
                  <Route path="/" element={<Navigate to="/chat" replace />} />
                  <Route path="/chat"     element={<AppLayout><Chat /></AppLayout>} />
                  <Route path="/diary"    element={<AppLayout><Diary /></AppLayout>} />
                  <Route path="/library"  element={<AppLayout><Library /></AppLayout>} />
                  <Route path="/insights" element={<AppLayout><Insights /></AppLayout>} />
                  <Route path="/body"     element={<AppLayout><BodyProgress /></AppLayout>} />
                  <Route path="/upgrade"  element={<Upgrade />} />
                  <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
                  <Route path="*"         element={<Navigate to="/chat" replace />} />
                </>
            }
          </Routes>
        </HashRouter>
      </div>
    </AppContext.Provider>
  )
}
