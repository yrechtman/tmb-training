import { useState } from 'react'
import {
  getUserData, saveUserData, addBenchmark,
  getAllBenchmarks, formatTime, formatTimeValue
} from '../utils/progress.js'

const BENCHMARKS = [
  {
    key: 'TM_1MI_10PCT',
    label: '1 Mile at 10% Incline',
    type: 'time',
    emoji: '⏱️',
    description: 'Weeks 1 & 4 — time to walk 1 mile at 10% incline after 30-min ramp.',
    weeks: 'Logged in Weeks 1 and 4',
  },
  {
    key: 'TM_2MI_10PCT',
    label: '2 Miles at 10% Incline',
    type: 'time',
    emoji: '⏱️',
    description: 'Weeks 5 & 8 — time to walk 2 miles at 10% incline after 15-min ramp.',
    weeks: 'Logged in Weeks 5 and 8',
  },
  {
    key: 'TM_2MI_12PCT',
    label: '2 Miles at 12% Incline',
    type: 'time',
    emoji: '⏱️',
    description: 'Weeks 9 & 11 — time to walk 2 miles at 12% incline after 15-min ramp.',
    weeks: 'Logged in Weeks 9 and 11',
  },
  {
    key: 'SW_ASCENTS',
    label: 'Stair Ascents in 40 min',
    type: 'count',
    emoji: '🪜',
    description: 'Weeks 3, 5 & 11 — number of times you reach the top of your stairs in 40 minutes.',
    weeks: 'Logged in Weeks 3, 5 and 11',
  },
]

export default function BenchmarksPage({ user, userData, onUpdate }) {
  return (
    <>
      <div style={{ padding: '2px 0 4px' }}>
        <div className="section-title">Benchmarks — {user.name}</div>
      </div>
      <div className="bench-grid">
        {BENCHMARKS.map(bench => (
          <BenchmarkCard
            key={bench.key}
            bench={bench}
            user={user}
            userData={userData}
            onUpdate={onUpdate}
          />
        ))}
      </div>
    </>
  )
}

function BenchmarkCard({ bench, user, userData, onUpdate }) {
  const [logOpen, setLogOpen] = useState(false)
  const [mins, setMins] = useState('')
  const [secs, setSecs] = useState('')
  const [count, setCount] = useState('')
  const [note, setNote] = useState('')

  const entries = getAllBenchmarks(userData, bench.key)

  function handleLog() {
    let value
    if (bench.type === 'time') {
      const m = parseInt(mins) || 0
      const s = parseInt(secs) || 0
      if (!m && !s) return
      value = formatTimeValue(m, s)
    } else {
      value = parseInt(count)
      if (!value || value <= 0) return
    }

    const fresh = getUserData(user.id)
    addBenchmark(fresh, bench.key, value, note)
    saveUserData(user.id, fresh)
    setMins(''); setSecs(''); setCount(''); setNote('')
    setLogOpen(false)
    onUpdate()
  }

  // Find best entry
  const bestEntry = entries.length
    ? entries.reduce((best, e) =>
        bench.type === 'time'
          ? (e.value < best.value ? e : best)
          : (e.value > best.value ? e : best),
        entries[0])
    : null

  return (
    <div className="bench-item">
      <div className="bench-item-header">
        <span style={{ fontSize: 18 }}>{bench.emoji}</span>
        <div style={{ flex: 1 }}>
          <div className="bench-item-title">{bench.label}</div>
          <div style={{ fontSize: 11, color: 'var(--text3)' }}>{bench.weeks}</div>
        </div>
        <button
          className="log-btn"
          style={{ padding: '5px 10px', fontSize: 12 }}
          onClick={() => setLogOpen(o => !o)}
        >
          {logOpen ? 'Cancel' : '+ Log'}
        </button>
      </div>

      {/* Description */}
      <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--border)', fontSize: 12, color: 'var(--text2)', lineHeight: 1.5 }}>
        {bench.description}
      </div>

      {/* Entries */}
      {entries.length > 0 ? (
        <div className="bench-entries">
          {[...entries].reverse().map((entry, i) => {
            const isBest = entry === bestEntry
            const isFirst = i === 0
            const improved = i > 0 && (
              bench.type === 'time'
                ? entry.value < [...entries].reverse()[i - 1].value
                : entry.value > [...entries].reverse()[i - 1].value
            )
            return (
              <div key={i} className="bench-entry">
                <span className="bench-entry-date">{formatEntryDate(entry.date)}</span>
                <span className="bench-entry-value" style={{ color: isBest ? 'var(--green-light)' : undefined }}>
                  {bench.type === 'time' ? formatTime(entry.value) : `${entry.value} ascents`}
                </span>
                {entry.note && <span className="bench-entry-note">{entry.note}</span>}
                {isBest && entries.length > 1 && (
                  <span className="bench-entry-best">🏆 best</span>
                )}
                {isFirst && improved && (
                  <span className="bench-entry-best" style={{ color: 'var(--green-light)' }}>↑ PR!</span>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="empty-state" style={{ padding: '14px' }}>No entries yet</div>
      )}

      {/* Log form */}
      {logOpen && (
        <div className="bench-log-form">
          {bench.type === 'time' ? (
            <>
              <label>Time</label>
              <div className="time-input-row">
                <input
                  type="number"
                  className="time-input"
                  placeholder="mm"
                  value={mins}
                  onChange={e => setMins(e.target.value)}
                  min="0" max="99"
                />
                <span className="time-sep">:</span>
                <input
                  type="number"
                  className="time-input"
                  placeholder="ss"
                  value={secs}
                  onChange={e => setSecs(e.target.value)}
                  min="0" max="59"
                />
                <span className="time-label">min : sec</span>
              </div>
            </>
          ) : (
            <>
              <label>Ascent count</label>
              <input
                type="number"
                className="count-input"
                placeholder="0"
                value={count}
                onChange={e => setCount(e.target.value)}
                min="0"
              />
            </>
          )}
          <label>Note (optional)</label>
          <input
            type="text"
            className="note-input"
            placeholder="e.g. 'felt strong' or 'Prospect Park stairs'"
            value={note}
            onChange={e => setNote(e.target.value)}
          />
          <button className="log-btn" onClick={handleLog}>Save Entry</button>
        </div>
      )}
    </div>
  )
}

function formatEntryDate(dateStr) {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-').map(Number)
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${months[m - 1]} ${d}`
}
