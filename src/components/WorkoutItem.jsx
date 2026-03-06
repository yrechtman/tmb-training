import { useState } from 'react'
import { WORKOUT_TYPES } from '../data/workouts.js'

export default function WorkoutItem({ workoutId, dayData, userColor }) {
  const [open, setOpen] = useState(false)
  const [rtpPhase, setRtpPhase] = useState(1)
  const w = WORKOUT_TYPES[workoutId]
  if (!w) return null

  const isRTP12 = workoutId === 'RTP12'

  return (
    <div className="workout-item">
      <div className="workout-item-header" onClick={() => setOpen(o => !o)}>
        <span style={{ fontSize: 20 }}>{w.emoji}</span>
        <div style={{ flex: 1 }}>
          <div className="workout-item-label">{w.label}</div>
          <div className="workout-meta" style={{ marginTop: 3 }}>
            <span
              className="type-chip"
              style={{ backgroundColor: w.color }}
            >
              {w.type}
            </span>
            {w.totalTime && (
              <span className="workout-meta-tag">{w.totalTime}</span>
            )}
            {dayData?.duration && (
              <span className="workout-meta-tag">{dayData.duration}</span>
            )}
            {dayData?.pack && (
              <span className="workout-meta-tag">🎒 {dayData.pack}</span>
            )}
            {dayData?.ar && (
              <span className="workout-meta-tag">🔁 {dayData.ar}</span>
            )}
          </div>
        </div>
        <span className={`expand-icon${open ? ' open' : ''}`}>▼</span>
      </div>

      {open && (
        <div className="workout-item-body">

          {/* RTP Phase toggle */}
          {isRTP12 && (
            <div className="rtp-phase-toggle">
              <button
                className={`phase-toggle-btn${rtpPhase === 1 ? ' active' : ''}`}
                onClick={() => setRtpPhase(1)}
              >
                Phase 1 (lighter)
              </button>
              <button
                className={`phase-toggle-btn${rtpPhase === 2 ? ' active' : ''}`}
                onClick={() => setRtpPhase(2)}
              >
                Phase 2 (harder)
              </button>
            </div>
          )}

          {/* Treadmill steps */}
          {w.steps && (
            <div className="steps-list">
              {w.steps.map((step, i) => (
                <div key={i} className="step-row">
                  <span className="step-duration">{step.duration || `${i + 1}.`}</span>
                  <span className="step-text">{step.instruction}</span>
                </div>
              ))}
            </div>
          )}

          {/* Interval steps */}
          {w.modes && (
            <div className="tips-box">
              <strong>Equipment:</strong> {w.modes}
            </div>
          )}

          {/* Resistance exercises */}
          {w.exercises && (
            <ExerciseList exercises={w.exercises} sets={w.sets} />
          )}

          {isRTP12 && rtpPhase === 1 && w.phase1 && (
            <ExerciseList exercises={w.phase1.exercises} sets={w.sets} />
          )}

          {isRTP12 && rtpPhase === 2 && w.phase2 && (
            <ExerciseList exercises={w.phase2.exercises} sets={w.sets} />
          )}

          {/* Options for rest */}
          {w.options && (
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.5 }}>{w.options}</p>
          )}

          {/* Tips */}
          {w.tips && (
            <div className="tips-box">
              <strong>Tip:</strong> {w.tips}
            </div>
          )}

        </div>
      )}
    </div>
  )
}

function ExerciseList({ exercises, sets }) {
  return (
    <div>
      <div className="section-title">{sets || '2–3 sets of each'}</div>
      <div className="exercise-list">
        {exercises.map((ex, i) => (
          <div key={i} className="exercise-row">
            <span className="exercise-name">{i + 1}. {ex.name}</span>
            <span className="exercise-reps">{ex.reps}</span>
            {ex.url && (
              <a href={ex.url} target="_blank" rel="noopener noreferrer" className="exercise-link">
                Demo ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
