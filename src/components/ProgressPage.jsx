import { getUserData, getCurrentPosition, getCompletionStats, getAllBenchmarks, formatTime } from '../utils/progress.js'
import { getPhase, SCHEDULE } from '../data/schedule.js'

const BENCH_KEYS = [
  { key: 'TM_1MI_10PCT', label: '1mi @10%', type: 'time' },
  { key: 'TM_2MI_10PCT', label: '2mi @10%', type: 'time' },
  { key: 'TM_2MI_12PCT', label: '2mi @12%', type: 'time' },
  { key: 'SW_ASCENTS',   label: '40min stairs', type: 'count' },
]

export default function ProgressPage({ users, refreshKey }) {
  const userDatas = users.map(u => ({ ...u, data: getUserData(u.id) }))

  return (
    <>
      <div className="section-title" style={{ paddingTop: 2 }}>Overall Progress</div>

      <div className="progress-grid">
        {userDatas.map(u => <UserCard key={u.id} u={u} />)}
      </div>

      <div className="section-title" style={{ marginTop: 4 }}>Benchmark Comparison</div>

      <div className="card">
        <div className="card-body" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--text2)', fontSize: 12 }}>
                  Benchmark
                </th>
                {userDatas.map(u => (
                  <th key={u.id} style={{ padding: '10px 10px', textAlign: 'center', color: u.color, fontWeight: 700 }}>
                    {u.emoji} {u.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {BENCH_KEYS.map(bench => (
                <tr key={bench.key} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px', color: 'var(--text2)', fontSize: 12 }}>
                    {bench.label}
                  </td>
                  {userDatas.map(u => {
                    const entries = getAllBenchmarks(u.data, bench.key)
                    const latest = entries[entries.length - 1]
                    return (
                      <td key={u.id} style={{ padding: '10px', textAlign: 'center', fontWeight: 700 }}>
                        {latest
                          ? (bench.type === 'time'
                              ? formatTime(latest.value)
                              : `${latest.value}`)
                          : <span style={{ color: 'var(--text3)', fontWeight: 400 }}>—</span>
                        }
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section-title" style={{ marginTop: 4 }}>Weekly Completion</div>

      <WeeklyGrid userDatas={userDatas} />
    </>
  )
}

function UserCard({ u }) {
  const { data } = u
  if (!data?.startDate) {
    return (
      <div className="user-progress-card">
        <div className="user-progress-header" style={{ backgroundColor: u.color }}>
          <span style={{ fontSize: 20 }}>{u.emoji}</span>
          <span className="user-progress-name">{u.name}</span>
        </div>
        <div className="user-progress-body">
          <div className="no-start">Not started yet</div>
        </div>
      </div>
    )
  }

  const pos = getCurrentPosition(data.startDate)
  const stats = getCompletionStats(data)
  const phase = pos ? getPhase(pos.weekNum) : null

  return (
    <div className="user-progress-card" style={{ borderColor: u.color }}>
      <div className="user-progress-header" style={{ backgroundColor: u.color }}>
        <span style={{ fontSize: 20 }}>{u.emoji}</span>
        <span className="user-progress-name">{u.name}</span>
      </div>
      <div className="user-progress-body">
        <div className="progress-stat">
          <div className="progress-pct" style={{ color: u.color }}>{stats.pct}%</div>
          <div className="progress-sub">{stats.completed} / {stats.total} workouts</div>
        </div>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${stats.pct}%`, backgroundColor: u.color }}
          />
        </div>
        <div className="user-status">
          {pos ? (
            <>
              <strong>Week {pos.weekNum}</strong>
              {phase && (
                <span className="phase-badge" style={{ backgroundColor: phase.color, marginLeft: 6 }}>
                  {phase.name}
                </span>
              )}
            </>
          ) : (
            <span>Program not active</span>
          )}
        </div>
      </div>
    </div>
  )
}

function WeeklyGrid({ userDatas }) {
  return (
    <div className="card">
      <div className="card-body" style={{ padding: '10px 14px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {userDatas.map(u => {
            if (!u.data?.startDate) return null
            const weeks = Array.from({ length: 12 }, (_, i) => {
              let completed = 0, total = 0
              for (let d = 0; d < 7; d++) {
                const day = SCHEDULE[i]?.[d]
                if (day?.workouts?.length) {
                  total++
                  if (u.data.completed?.[`w${i}_d${d}`]) completed++
                }
              }
              return { completed, total }
            })

            return (
              <div key={u.id}>
                <div style={{ fontSize: 12, fontWeight: 700, color: u.color, marginBottom: 4 }}>
                  {u.emoji} {u.name}
                </div>
                <div style={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                  {weeks.map((wk, i) => {
                    const pct = wk.total > 0 ? wk.completed / wk.total : 0
                    const bg = pct === 1 ? u.color
                      : pct > 0 ? `${u.color}88`
                      : 'var(--border)'
                    return (
                      <div
                        key={i}
                        title={`Week ${i + 1}: ${wk.completed}/${wk.total}`}
                        style={{
                          width: 20, height: 20,
                          borderRadius: 4,
                          backgroundColor: bg,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 9, fontWeight: 700,
                          color: pct > 0.3 ? 'white' : 'var(--text3)',
                        }}
                      >
                        {i + 1}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
