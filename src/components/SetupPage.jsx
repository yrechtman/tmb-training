import { useState } from 'react'
import { initUserData, suggestedStartDate } from '../utils/progress.js'

export default function SetupPage({ user, onSetup }) {
  const suggested = suggestedStartDate()
  const [startDate, setStartDate] = useState(suggested)

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
          The program ends 3 days before your July 4 departure, so starting{' '}
          <strong>April 11</strong> is the sweet spot.
        </p>

        <label className="setup-label">Your start date</label>
        <input
          type="date"
          className="setup-input"
          value={startDate}
          min="2025-03-01"
          max="2025-06-01"
          onChange={e => setStartDate(e.target.value)}
        />
        {startDate === suggested && (
          <p className="setup-suggestion">✓ Recommended: finishes June 30, 3 days before departure.</p>
        )}

        <button className="setup-btn" onClick={handleStart}>
          Start Training →
        </button>
      </div>
    </div>
  )
}
