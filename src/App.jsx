import { useState } from 'react'
import { USERS, getUserData } from './utils/progress.js'
import SetupPage from './components/SetupPage.jsx'
import TodayPage from './components/TodayPage.jsx'
import WeekPage from './components/WeekPage.jsx'
import BenchmarksPage from './components/BenchmarksPage.jsx'
import ProgressPage from './components/ProgressPage.jsx'

const TABS = [
  { id: 'today',     label: 'Today',     icon: '📅' },
  { id: 'week',      label: 'Schedule',  icon: '🗓' },
  { id: 'benchmarks',label: 'Progress',  icon: '📈' },
  { id: 'both',      label: 'Both',      icon: '👥' },
]

export default function App() {
  const [activeUser, setActiveUser] = useState(USERS[0].id)
  const [activeTab, setActiveTab] = useState('today')
  const [refreshKey, setRefreshKey] = useState(0)

  const user = USERS.find(u => u.id === activeUser)
  const userData = getUserData(activeUser)

  function refresh() { setRefreshKey(k => k + 1) }

  // No start date? Show setup
  if (!userData?.startDate && activeTab !== 'both') {
    return (
      <div className="app">
        <Header user={user} users={USERS} activeUser={activeUser} setActiveUser={setActiveUser} />
        <SetupPage user={user} onSetup={refresh} />
      </div>
    )
  }

  return (
    <div className="app">
      <Header user={user} users={USERS} activeUser={activeUser} setActiveUser={(id) => { setActiveUser(id); setActiveTab('today') }} />
      <NavTabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="page" key={`${activeUser}-${refreshKey}`}>
        {activeTab === 'today'      && <TodayPage user={user} userData={userData} onUpdate={refresh} />}
        {activeTab === 'week'       && <WeekPage  user={user} userData={userData} onUpdate={refresh} />}
        {activeTab === 'benchmarks' && <BenchmarksPage user={user} userData={userData} onUpdate={refresh} />}
        {activeTab === 'both'       && <ProgressPage users={USERS} refreshKey={refreshKey} />}
      </main>
    </div>
  )
}

function Header({ user, users, activeUser, setActiveUser }) {
  return (
    <header className="header">
      <span className="header-title">⛰ TMB Training</span>
      <div className="user-toggle">
        {users.map(u => (
          <button
            key={u.id}
            className={`user-btn${u.id === activeUser ? ' active' : ''}`}
            onClick={() => setActiveUser(u.id)}
          >
            {u.emoji} {u.name}
          </button>
        ))}
      </div>
    </header>
  )
}

function NavTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <nav className="nav-tabs">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`nav-tab${tab.id === activeTab ? ' active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.icon} {tab.label}
        </button>
      ))}
    </nav>
  )
}
