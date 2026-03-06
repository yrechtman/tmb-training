// 12-week Level 2 Training Schedule
// Days: index 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
//
// Each day: { workouts: string[], note?: string, duration?: string,
//             pack?: string, ar?: string,
//             benchmark?: { key, type, label },
//             beatBenchmark?: { key, label } }

export const PHASES = [
  { name: 'BASE',     color: '#4A7C59', weeks: [1, 2, 3] },
  { name: 'RECOVERY', color: '#6B8F71', weeks: [4] },
  { name: 'BUILD',    color: '#B5651D', weeks: [5, 6, 7] },
  { name: 'RECOVERY', color: '#6B8F71', weeks: [8] },
  { name: 'PEAK',     color: '#8B4513', weeks: [9, 10, 11] },
  { name: 'TAPER',    color: '#5B7B8A', weeks: [12] },
]

export function getPhase(weekNum) {
  return PHASES.find(p => p.weeks.includes(weekNum)) || PHASES[0]
}

export const SCHEDULE = [
  // ─── WEEK 1 · BASE ────────────────────────────────────────────────────────
  [
    { // Mon
      workouts: ['TM_BENCH_1MI_10PCT'],
      benchmark: { key: 'TM_1MI_10PCT', type: 'time', label: '1 mile @ 10% incline' },
      note: 'Record your time — this is your Week 1 baseline you\'ll try to beat in Week 4.',
    },
    { workouts: ['RTP1'] }, // Tue
    { workouts: ['RTP1'] }, // Wed
    { workouts: ['SW_30'] }, // Thu
    { workouts: ['INT30L2', 'RTP1'] }, // Fri
    { workouts: ['HIKE'], duration: '2+ hours', pack: 'essentials only (water, snacks, first aid, a layer)' }, // Sat
    { workouts: ['HIKE'], duration: '2+ hours', pack: 'essentials only' }, // Sun
  ],

  // ─── WEEK 2 · BASE ────────────────────────────────────────────────────────
  [
    { workouts: ['TM8'] }, // Mon
    { workouts: ['RTP1'] }, // Tue
    { workouts: ['RTP1'] }, // Wed
    { workouts: ['SW_30'] }, // Thu
    { workouts: ['INT30L2', 'RTP1'] }, // Fri
    { workouts: ['HIKE'], duration: '2+ hours', pack: 'essentials only' }, // Sat
    { // Sun
      workouts: ['HIKE_AR'],
      duration: '2+ hours',
      pack: 'essentials only',
      ar: '5–10 Ascending Repeats',
    },
  ],

  // ─── WEEK 3 · BASE ────────────────────────────────────────────────────────
  [
    { workouts: ['TM9'] }, // Mon
    { workouts: ['RTP1'] }, // Tue
    { workouts: ['RTP1'] }, // Wed
    { // Thu
      workouts: ['SW_40'],
      benchmark: { key: 'SW_ASCENTS', type: 'count', label: 'Stair ascents in 40 min' },
      note: 'Count your ascents with a tally counter or phone. This is your Week 3 baseline.',
    },
    { workouts: ['INT30L2', 'RTP12'] }, // Fri
    { workouts: ['HIKE'], duration: '2+ hours', pack: 'essentials only' }, // Sat
    { // Sun
      workouts: ['HIKE_AR'],
      duration: '2+ hours',
      pack: 'essentials only',
      ar: '5–10 Ascending Repeats',
    },
  ],

  // ─── WEEK 4 · RECOVERY ────────────────────────────────────────────────────
  [
    { // Mon
      workouts: ['TM_BENCH_1MI_10PCT'],
      benchmark: { key: 'TM_1MI_10PCT', type: 'time', label: '1 mile @ 10% incline' },
      beatBenchmark: { key: 'TM_1MI_10PCT', label: 'your Week 1 time' },
      note: 'Try to beat your Week 1 time.',
    },
    { workouts: ['RTP1'] }, // Tue
    { workouts: ['RTP12'] }, // Wed
    { workouts: ['RTP12'] }, // Thu
    { workouts: ['INT30L3', 'RTP1'] }, // Fri
    { workouts: ['OFF_XT'] }, // Sat
    { workouts: ['WALK'], duration: 'up to 2 hours' }, // Sun
  ],

  // ─── WEEK 5 · BUILD ───────────────────────────────────────────────────────
  [
    { // Mon
      workouts: ['TM_BENCH_2MI_10PCT'],
      benchmark: { key: 'TM_2MI_10PCT', type: 'time', label: '2 miles @ 10% incline' },
      note: 'Record your time — this is your Week 5 baseline you\'ll try to beat in Week 8.',
    },
    { workouts: ['RTP12'] }, // Tue
    { workouts: ['RTP12'] }, // Wed
    { // Thu
      workouts: ['SW_40'],
      benchmark: { key: 'SW_ASCENTS', type: 'count', label: 'Stair ascents in 40 min' },
      beatBenchmark: { key: 'SW_ASCENTS', label: 'your Week 3 count' },
      note: 'Try to beat your Week 3 ascent count.',
    },
    { workouts: ['INT30L3', 'RTP12'] }, // Fri
    { // Sat
      workouts: ['HIKE_AR'],
      duration: '2–3 hours',
      pack: '10–15 lbs',
      ar: '5–10 Ascending Repeats',
    },
    { workouts: ['OFF_XT'] }, // Sun
  ],

  // ─── WEEK 6 · BUILD ───────────────────────────────────────────────────────
  [
    { workouts: ['TM9'] }, // Mon
    { workouts: ['RTP12'] }, // Tue
    { workouts: ['SW_DSW_10_25'] }, // Wed
    { workouts: ['SW_DSW_10_30'] }, // Thu
    { workouts: ['RTP12'] }, // Fri
    { // Sat
      workouts: ['HIKE_AR'],
      duration: '2–3 hours',
      pack: '10–15 lbs',
      ar: '5–10 Ascending Repeats',
    },
    { workouts: ['OFF_XT'] }, // Sun
  ],

  // ─── WEEK 7 · BUILD ───────────────────────────────────────────────────────
  [
    { workouts: ['TM10'] }, // Mon
    { workouts: ['RTP12'] }, // Tue
    { workouts: ['RTP12'] }, // Wed
    { workouts: ['HIKE'], duration: '3 hours', pack: '15 lbs' }, // Thu
    { workouts: ['RTP12'] }, // Fri
    { workouts: ['OFF_XT'] }, // Sat
    { workouts: ['HIKE'], duration: '2+ hours', pack: '15 lbs' }, // Sun
  ],

  // ─── WEEK 8 · RECOVERY ────────────────────────────────────────────────────
  [
    { // Mon
      workouts: ['TM_BENCH_2MI_10PCT'],
      benchmark: { key: 'TM_2MI_10PCT', type: 'time', label: '2 miles @ 10% incline' },
      beatBenchmark: { key: 'TM_2MI_10PCT', label: 'your Week 5 time' },
      note: 'Try to beat your Week 5 time.',
    },
    { workouts: ['RTP12'] }, // Tue
    { workouts: ['RTP12'] }, // Wed
    { workouts: ['RTP12'] }, // Thu
    { workouts: ['INT60L2', 'RTP12'] }, // Fri
    { workouts: ['TM7'] }, // Sat
    { workouts: ['WALK'], duration: 'up to 3 hours' }, // Sun
  ],

  // ─── WEEK 9 · PEAK ────────────────────────────────────────────────────────
  [
    { // Mon
      workouts: ['TM_BENCH_2MI_12PCT'],
      benchmark: { key: 'TM_2MI_12PCT', type: 'time', label: '2 miles @ 12% incline' },
      note: 'Record your time — this is your Week 9 baseline you\'ll try to beat in Week 11.',
    },
    { workouts: ['RTP12'] }, // Tue
    { workouts: ['SW_DSW_10_35'] }, // Wed
    { workouts: ['RTP12'] }, // Thu
    { workouts: ['RTP12'] }, // Fri
    { // Sat
      workouts: ['HIKE_AR'],
      duration: '3+ hours',
      pack: '15+ lbs',
      ar: '5–10 Ascending Repeats',
    },
    { workouts: ['OFF_XT'] }, // Sun
  ],

  // ─── WEEK 10 · PEAK ───────────────────────────────────────────────────────
  [
    { workouts: ['TM10'] }, // Mon
    { workouts: ['RTP12'] }, // Tue
    { workouts: ['SW_DSW_10_35'] }, // Wed
    { workouts: ['RTP12'] }, // Thu
    { workouts: ['RTP12'] }, // Fri
    { workouts: ['HIKE'], duration: '3+ hours', pack: '15+ lbs' }, // Sat
    { workouts: ['HIKE'], duration: '3+ hours', pack: '15 lbs' }, // Sun
  ],

  // ─── WEEK 11 · PEAK ───────────────────────────────────────────────────────
  [
    { // Mon
      workouts: ['TM_BENCH_2MI_12PCT'],
      benchmark: { key: 'TM_2MI_12PCT', type: 'time', label: '2 miles @ 12% incline' },
      beatBenchmark: { key: 'TM_2MI_12PCT', label: 'your Week 9 time' },
      note: 'Try to beat your Week 9 time.',
    },
    { workouts: ['RTP12'] }, // Tue
    { // Wed
      workouts: ['SW_40'],
      benchmark: { key: 'SW_ASCENTS', type: 'count', label: 'Stair ascents in 40 min' },
      beatBenchmark: { key: 'SW_ASCENTS', label: 'your Week 5 count' },
      note: 'Try to beat your Week 5 ascent count.',
    },
    { workouts: ['RTP12'] }, // Thu
    { workouts: ['RTP12'] }, // Fri
    { // Sat
      workouts: ['HIKE_AR'],
      duration: '2 hours',
      pack: '20 lbs',
      ar: '5+ Ascending Repeats',
    },
    { workouts: ['OFF_XT'] }, // Sun
  ],

  // ─── WEEK 12 · TAPER ──────────────────────────────────────────────────────
  [
    { workouts: ['OFF_XT'] }, // Mon
    { workouts: ['TM5'] }, // Tue
    { workouts: ['WALK'], duration: 'up to 2 hours' }, // Wed
    { workouts: ['OFF_XT'] }, // Thu
    { workouts: ['DEPARTURE'] }, // Fri
    { workouts: ['ADVENTURING'] }, // Sat
    { workouts: ['ADVENTURING'] }, // Sun
  ],
]
