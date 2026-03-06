import { useState } from 'react'
import {
  getCurrentPosition, getDayData, completionKey,
  getUserData, saveUserData, parseDateStr, toDateStr
} from '../utils/progress.js'
import { SCHEDULE, getPhase } from '../data/schedule.js'
import { WORKOUT_TYPES } from '../data/workouts.js'
import WorkoutItem from './WorkoutItem.jsx'

const DAY_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function addDays(dateStr, n) {
  const d = parseDateStr(dateStr)
  d.setDate(d.getDate() + n)
  return toDateStr(d)
}

function dayOfMonth(dateStr) {
  return parseInt(dateStr.split('-')[2], 10)
}

function monthName(dateStr) {
  return MONTH_SHORT[parseInt(dateStr.split('-')[1], 10) - 1]
}

export default function WeekPage({ user, userData, onUpdate }) {
  const pos = getCurrentPosition(userData.startDate)
  const currentWeekIdx = pos?.weekIdx ?? 0

  const [viewWeekIdx, setViewWeekIdx] = useState(currentWeekIdx)
  const [selectedDay, setSelectedDay] = useState(pos?.dayIdx ?? 0)

  const weekNum = viewWeekIdx + 1
  const phase = getPhase(weekNum)

  // Compute dates for this week
  const weekStartDate = addDays(userData.startDate, viewWeekIdx * 7)
  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i))
  const todayStr = toDateStr(new Date())

  const dayData = getDayData(viewWeekIdx, selectedDay)
  const key = completionKey(viewWeekIdx, selectedDay)
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

  return (
    <>
      {/* Week selector */}
      <div className="card">
        <div className="card-body">
          <div className="week-selector">
            <button
              className="week-nav-btn"
              onClick={() => { setViewWeekIdx(v => v - 1); setSelectedDay(0) }}
              disabled={viewWeekIdx === 0}
            >‹</button>

            <div className="week-label">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span>Week {weekNum}</span>
                <span className="phase-badge" style={{ backgroundColor: phase.color }}>{phase.name}</span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text2)', marginTop: 2, fontWeight: 400 }}>
                {monthName(weekDates[0])} {dayOfMonth(weekDates[0])} – {monthName(weekDates[6])} {dayOfMonth(weekDates[6])}
              </div>
            </div>

            <button
              className="week-nav-btn"
              onClick={() => { setViewWeekIdx(v => v + 1); setSelectedDay(0) }}
              disabled={viewWeekIdx >= SCHEDULE.length - 1}
            >›</button>
          </div>

          {/* 7-day grid */}
          <div className="week-grid">
            {weekDates.map((date, i) => {
              const day = SCHEDULE[viewWeekIdx]?.[i]
              const done = !!userData.completed?.[completionKey(viewWeekIdx, i)]
              const isToday = date === todayStr
              const isRest = !day?.workouts?.length || day.workouts.every(w => ['OFF_XT'].includes(w))

              return (
                <div
                  key={i}
                  className={`week-day${isToday ? ' today' : ''}${done ? ' completed' : ''}${isRest ? ' rest' : ''}`}
                  onClick={() => setSelectedDay(i)}
                  style={{
                    outline: selectedDay === i ? `2px solid ${user.color}` : undefined,
                    outlineOffset: 1,
                  }}
                >
                  <span className="day-name">{DAY_SHORT[i]}</span>
                  <span className="day-date">{dayOfMonth(date)}</span>
                  {done ? (
                    <span className="day-check">✓</span>
                  ) : (
                    <div className="day-workouts">
                      {day?.workouts?.map(wid => {
                        const w = WORKOUT_TYPES[wid]
                        return w ? (
                          <div key={wid} className="day-dot" style={{ backgroundColor: w.color }} />
                        ) : null
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Selected day detail */}
      {dayData?.workouts?.length > 0 ? (
        <div className="card">
          <div className="card-header">
            <span>{WORKOUT_TYPES[dayData.workouts[0]]?.emoji || '📋'}</span>
            <h2>{DAY_SHORT[selectedDay]}, {monthName(weekDates[selectedDay])} {dayOfMonth(weekDates[selectedDay])}</h2>
            {isCompleted && <span style={{ fontSize: 13, color: '#065F46', fontWeight: 700 }}>✓ Done</span>}
          </div>
          <div className="card-body">
            {dayData.note && (
              <div className="benchmark-banner" style={{ marginBottom: 12 }}>
                <span>💡</span><div>{dayData.note}</div>
              </div>
            )}
            <div className="workout-list">
              {dayData.workouts.map(wid => (
                <WorkoutItem key={wid} workoutId={wid} dayData={dayData} userColor={user.color} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="rest-day" style={{ padding: '16px' }}>
              <div className="emoji">🛌</div>
              <h3>{DAY_SHORT[selectedDay]}: Rest / Cross-Train</h3>
              <p>Take it easy. Recovery is training.</p>
            </div>
          </div>
        </div>
      )}

      {/* Complete toggle */}
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
