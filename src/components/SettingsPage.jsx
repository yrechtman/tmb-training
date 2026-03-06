import { useState } from 'react'
import { getUserData, saveUserData, suggestedStartDate, formatDepartureDate } from '../utils/progress.js'

export default function SettingsPage({ user, onUpdate }) {
  const userData = getUserData(user.id)
  const [startDate, setStartDate] = useState(userData?.startDate || suggestedStartDate())
  const [saved, setSaved] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const depDate = startDate ? formatDepartureDate(startDate) : '—'
  const hasChanged = startDate !== (userData?.startDate || '')

  function handleSave() {
    if (!startDate) return
    const data = getUserData(user.id) || { completed: {}, benchmarks: {} }
    data.startDate = startDate
    saveUserData(user.id, data)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    onUpdate()
  }

  function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true)
      return
    }
    localStorage.removeItem(`tmb_${user.id}_data`)
    setConfirmReset(false)
    onUpdate()
  }

  return (
    <>
      <div className="section-title" style={{ paddingTop: 2 }}>Settings — {user.name}</div>

      <div className="card">
        <div className="card-header">
          <span>📅</span>
          <h2>Training Start Date</h2>
        </div>
        <div className="card-body">
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12, lineHeight: 1.5 }}>
            Change when your 12-week program begins. Your completion history and benchmarks will be preserved.
          </p>

          <label className="setup-label">Start date</label>
          <input
            type="date"
            className="setup-input"
            value={startDate}
            onChange={e => { setStartDate(e.target.value); setSaved(false) }}
            style={{ marginBottom: 8 }}
          />
          <p style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 14 }}>
            12 weeks of training · Departure on {depDate}
          </p>

          <button
            className="log-btn"
            onClick={handleSave}
            disabled={!hasChanged}
            style={{ opacity: hasChanged ? 1 : 0.4 }}
          >
            {saved ? '✓ Saved' : 'Update Start Date'}
          </button>
        </div>
      </div>

      <div className="card" style={{ borderColor: '#EF4444' }}>
        <div className="card-header">
          <span>⚠️</span>
          <h2>Danger Zone</h2>
        </div>
        <div className="card-body">
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 12, lineHeight: 1.5 }}>
            Reset all training data for {user.name}, including completion history, benchmarks, and start date.
            This cannot be undone.
          </p>
          {confirmReset ? (
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="log-btn"
                onClick={handleReset}
                style={{ background: '#EF4444' }}
              >
                Yes, delete everything
              </button>
              <button
                className="log-btn"
                onClick={() => setConfirmReset(false)}
                style={{ background: 'var(--text3)' }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="log-btn"
              onClick={handleReset}
              style={{ background: '#EF4444' }}
            >
              Reset All Data
            </button>
          )}
        </div>
      </div>
    </>
  )
}
