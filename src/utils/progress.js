import { SCHEDULE, getPhase } from '../data/schedule.js'

export const USERS = [
  { id: 'yoni', name: 'Yoni', color: '#3B82F6', emoji: '🧗' },
  { id: 'zoe',  name: 'Zoë',  color: '#EC4899', emoji: '🌿' },
]

// ── Storage keys ──────────────────────────────────────────────────────────────

function storageKey(userId, field) {
  return `tmb_${userId}_${field}`
}

export function getUserData(userId) {
  try {
    const raw = localStorage.getItem(storageKey(userId, 'data'))
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function saveUserData(userId, data) {
  localStorage.setItem(storageKey(userId, 'data'), JSON.stringify(data))
}

export function initUserData(userId, startDateStr) {
  const data = {
    startDate: startDateStr,
    completed: {},  // key: 'w1_d0' → true
    benchmarks: {}, // key: 'TM_1MI_10PCT' → [{ date, value, note }]
  }
  saveUserData(userId, data)
  return data
}

// ── Date / schedule helpers ───────────────────────────────────────────────────

export function parseDateStr(str) {
  // 'YYYY-MM-DD' → Date (local midnight)
  const [y, m, d] = str.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function toDateStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function todayStr() {
  return toDateStr(new Date())
}

// Monday = 0, ..., Sunday = 6
function dayIndex(date) {
  return (date.getDay() + 6) % 7
}

// Return { weekNum, dayIdx } for a given date + startDate string
export function getPosition(startDateStr, targetDateStr) {
  const start = parseDateStr(startDateStr)
  const target = parseDateStr(targetDateStr)
  const msPerDay = 86400000
  const diff = Math.floor((target - start) / msPerDay)
  if (diff < 0) return null
  const weekIdx = Math.floor(diff / 7)
  const dayIdx = diff % 7
  if (weekIdx >= SCHEDULE.length) return null
  return { weekIdx, dayIdx, weekNum: weekIdx + 1 }
}

export function getCurrentPosition(startDateStr) {
  return getPosition(startDateStr, todayStr())
}

export function getDayData(weekIdx, dayIdx) {
  return SCHEDULE[weekIdx]?.[dayIdx] || null
}

export function completionKey(weekIdx, dayIdx) {
  return `w${weekIdx}_d${dayIdx}`
}

// ── Progress stats ────────────────────────────────────────────────────────────

export function getCompletionStats(userData) {
  if (!userData?.startDate) return { total: 0, completed: 0, pct: 0 }
  const today = todayStr()
  const pos = getPosition(userData.startDate, today)
  if (!pos) return { total: 0, completed: 0, pct: 0 }

  let total = 0
  let completed = 0
  for (let w = 0; w <= pos.weekIdx; w++) {
    const maxDay = w === pos.weekIdx ? pos.dayIdx + 1 : 7
    for (let d = 0; d < maxDay; d++) {
      const day = SCHEDULE[w]?.[d]
      if (day?.workouts?.length) {
        total++
        if (userData.completed[completionKey(w, d)]) completed++
      }
    }
  }
  return { total, completed, pct: total > 0 ? Math.round((completed / total) * 100) : 0 }
}

export function getWeekStats(userData, weekIdx) {
  const total = SCHEDULE[weekIdx].filter(d => d?.workouts?.length).length
  let completed = 0
  for (let d = 0; d < 7; d++) {
    if (userData?.completed?.[completionKey(weekIdx, d)]) completed++
  }
  return { total, completed }
}

// ── Benchmark helpers ─────────────────────────────────────────────────────────

export function addBenchmark(userData, key, value, note = '') {
  if (!userData.benchmarks) userData.benchmarks = {}
  if (!userData.benchmarks[key]) userData.benchmarks[key] = []
  userData.benchmarks[key].push({ date: todayStr(), value, note })
  return userData
}

export function getLatestBenchmark(userData, key) {
  const entries = userData?.benchmarks?.[key]
  if (!entries?.length) return null
  return entries[entries.length - 1]
}

export function getAllBenchmarks(userData, key) {
  return userData?.benchmarks?.[key] || []
}

export function formatTimeValue(mins, secs) {
  return mins * 60 + secs
}

export function parseTimeValue(totalSecs) {
  return { mins: Math.floor(totalSecs / 60), secs: totalSecs % 60 }
}

export function formatTime(totalSecs) {
  const { mins, secs } = parseTimeValue(totalSecs)
  return `${mins}:${String(secs).padStart(2, '0')}`
}

// Days until July 4
export function daysUntilDeparture() {
  const departure = new Date(2025, 6, 4) // July 4, 2025
  const today = new Date()
  today.setHours(0,0,0,0)
  departure.setHours(0,0,0,0)
  return Math.max(0, Math.floor((departure - today) / 86400000))
}

// Suggested start date (so program ends ~June 30 = 3 days before July 4)
export function suggestedStartDate() {
  // 12 weeks = 84 days before July 4 = April 11
  const departure = new Date(2025, 6, 4)
  const start = new Date(departure.getTime() - 84 * 86400000)
  return toDateStr(start)
}
