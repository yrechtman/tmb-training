import { useState } from 'react'
import { initUserData, suggestedStartDate, formatDepartureDate } from '../utils/progress.js'

export default function SetupPage({ user, onSetup }) {
  const suggested = suggestedStartDate()
  const [startDate, setStartDate] = useState(suggested)
  const depDate = formatDepartureDate(startDate)

  function handleStart() {
    if (!startDate) return
    initUserData(user.id, startDate)
    onSetup()
  }

  return (
    <div className="setup-page">
      <div className="setup-card">
        <div style={{ fontSize: 48, marginBottom: 12 }}>{user.emoji}</div>
        <h2>Hey {user.name}!</h2>
        <p>
          Let's set up your 12-week Tour du Mont Blanc training plan.
          Pick a start date and the program will map out your full schedule
          through departure day.
        </p>

        <label className="setup-label">Your start date</label>
        <input
          type="date"
          className="setup-input"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <p className="setup-suggestion">
          12 weeks of training · Departure on {depDate}
        </p>

        <button className="setup-btn" onClick={handleStart}>
          Start Training →
        </button>
      </div>
    </div>
  )
}
