import { useState } from 'react'
import {
  getCurrentPosition, getDayData, completionKey,
  getUserData, saveUserData, daysUntilDeparture,
  getLatestBenchmark, formatTime
} from '../utils/progress.js'
import { getPhase } from '../data/schedule.js'
import WorkoutItem from './WorkoutItem.jsx'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const DAY_NAMES_LONG = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function formatDateNice(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  const dow = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][date.getDay()]
  return `${dow}, ${MONTH_NAMES[m - 1]} ${d}`
}

export default function TodayPage({ user, userData, onUpdate }) {
  const pos = getCurrentPosition(userData.startDate)
  const days = daysUntilDeparture()

  if (!pos) {
    return (
      <div className="card">
        <div className="card-body">
          {days > 0 ? (
            <div className="rest-day">
              <div className="emoji">⏳</div>
              <h3>Program starts soon!</h3>
              <p>Your training begins on {formatDateNice(userData.startDate)}.<br />
              <strong>{days} days</strong> until the TMB.</p>
            </div>
          ) : (
            <div className="rest-day">
              <div className="emoji">🏔</div>
              <h3>Program complete!</h3>
              <p>You've finished your 12-week training. The TMB awaits.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const { weekIdx, dayIdx, weekNum } = pos
  const phase = getPhase(weekNum)
  const dayData = getDayData(weekIdx, dayIdx)
  const key = completionKey(weekIdx, dayIdx)
  const isCompleted = !!userData.completed?.[key]

  function toggleComplete() {
    const fresh = getUserData(user.id)
    if (!fresh.completed) fresh.completed = {}
    if (fresh.completed[key]) {
      delete fresh.completed[key]
    } else {
      fresh.completed[key] = true
    }
    saveUserData(user.id, fresh)
    onUpdate()
  }

  const isRestDay = !dayData?.workouts?.length ||
    dayData.workouts.every(w => ['OFF_XT', 'DEPARTURE', 'ADVENTURING'].includes(w))

  return (
    <>
      {/* Countdown banner */}
      <div className="countdown-banner">
        <span className="countdown-num">{days}</span> days until departure · July 4
      </div>

      {/* Day header card */}
      <div className="card">
        <div className="card-body" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div>
            <div className="today-date">{formatDateNice(new Date().toISOString().slice(0, 10))}</div>
            <div className="today-sub">Week {weekNum} · {DAY_NAMES_LONG[dayIdx]}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
            <span className="phase-badge" style={{ backgroundColor: phase.color }}>
              {phase.name}
            </span>
          </div>
        </div>
      </div>

      {/* Benchmark beat target */}
      {dayData?.beatBenchmark && (
        <BeatTargetBanner benchKey={dayData.beatBenchmark.key} label={dayData.beatBenchmark.label} userData={userData} />
      )}

      {/* Benchmark record reminder */}
      {dayData?.benchmark && !dayData?.beatBenchmark && (
        <div className="benchmark-banner">
          <span>⏱️</span>
          <div>
            <strong>Benchmark day</strong> — record your {dayData.benchmark.label} in the Progress tab after completing this workout.
          </div>
        </div>
      )}

      {/* Note */}
      {dayData?.note && (
        <div className="benchmark-banner">
          <span>💡</span>
          <div>{dayData.note}</div>
        </div>
      )}

      {/* Workouts */}
      {isRestDay ? (
        <RestDayCard dayData={dayData} />
      ) : (
        <div className="card">
          <div className="card-header">
            <span>💪</span>
            <h2>Today's Workouts</h2>
          </div>
          <div className="card-body">
            <div className="workout-list">
              {dayData?.workouts?.map(wid => (
                <WorkoutItem key={wid} workoutId={wid} dayData={dayData} userColor={user.color} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Complete button */}
      {dayData?.workouts?.length > 0 && !['DEPARTURE','ADVENTURING'].includes(dayData.workouts[0]) && (
        <button
          className={`complete-btn ${isCompleted ? 'done' : 'todo'}`}
          onClick={toggleComplete}
        >
          {isCompleted ? '✓ Completed' : 'Mark as Done'}
        </button>
      )}
    </>
  )
}

function BeatTargetBanner({ benchKey, label, userData }) {
  const latest = getLatestBenchmark(userData, benchKey)
  return (
    <div className="benchmark-banner beat">
      <span>🎯</span>
      <div>
        <strong>Beat your target!</strong> Try to beat {label}
        {latest && (
          <span style={{ fontWeight: 700 }}>
            {' '}({benchKey.includes('ASCENTS')
              ? `${latest.value} ascents`
              : formatTime(latest.value)})
          </span>
        )}.
        {!latest && ' — no previous entry found, record one today.'}
      </div>
    </div>
  )
}

function RestDayCard({ dayData }) {
  const id = dayData?.workouts?.[0]
  if (id === 'DEPARTURE') {
    return (
      <div className="card">
        <div className="card-body">
          <div className="rest-day">
            <div className="emoji">✈️</div>
            <h3>Departure Day</h3>
            <p>You're ready. Stay hydrated on the journey. Walk as much as possible during travel. No workout today.</p>
          </div>
        </div>
      </div>
    )
  }
  if (id === 'ADVENTURING') {
    return (
      <div className="card">
        <div className="card-body">
          <div className="rest-day">
            <div className="emoji">⛰️</div>
            <h3>Tour du Mont Blanc</h3>
            <p>You did the work. Now have the time of your life.</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="card">
      <div className="card-body">
        <div className="rest-day">
          <div className="emoji">🛌</div>
          <h3>Rest or Cross-Train</h3>
          <p>Take the day off completely, or do light cross-training (biking, swimming, easy yoga) at Zone 1–2 intensity. Recovery is training.</p>
        </div>
      </div>
    </div>
  )
}
