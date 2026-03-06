// All workout type definitions with full inline instructions

export const WORKOUT_TYPES = {
  // ── TREADMILL WORKOUTS ────────────────────────────────────────────────────

  TM_BENCH_1MI_10PCT: {
    id: 'TM_BENCH_1MI_10PCT',
    label: 'Treadmill Benchmark',
    shortLabel: 'TM Benchmark',
    type: 'treadmill',
    color: '#3B82F6',
    emoji: '⏱️',
    steps: [
      { duration: '30 min', instruction: 'Gradually ramp incline up to 10% over 30 minutes. Walk at a comfortable pace (around 3.5–3.7 mph).' },
      { duration: 'timed', instruction: 'When 30 min is reached: STOP the treadmill, reset distance to 0, then time how long it takes to walk exactly 1 mile at 10% incline. Record this time.' },
    ],
    tips: 'Do not hold the handrails — swing your arms naturally. Slow the treadmill if needed to avoid gripping. Record your finish time in the benchmark tracker.',
  },

  TM_BENCH_2MI_10PCT: {
    id: 'TM_BENCH_2MI_10PCT',
    label: 'Treadmill Benchmark',
    shortLabel: 'TM Benchmark',
    type: 'treadmill',
    color: '#3B82F6',
    emoji: '⏱️',
    steps: [
      { duration: '15 min', instruction: 'Gradually ramp incline up to 10% over 15 minutes. Walk at around 3.3–3.5 mph.' },
      { duration: 'timed', instruction: 'When 15 min is reached: STOP the treadmill, reset distance to 0, then time how long it takes to walk exactly 2 miles at 10% incline. Record this time.' },
    ],
    tips: 'Arms free, no handrail holding. Record your finish time in the benchmark tracker.',
  },

  TM_BENCH_2MI_12PCT: {
    id: 'TM_BENCH_2MI_12PCT',
    label: 'Treadmill Benchmark',
    shortLabel: 'TM Benchmark',
    type: 'treadmill',
    color: '#3B82F6',
    emoji: '⏱️',
    steps: [
      { duration: '15 min', instruction: 'Gradually ramp incline up to 12% over 15 minutes. Walk at around 3.1–3.3 mph.' },
      { duration: 'timed', instruction: 'When 15 min is reached: STOP the treadmill, reset distance to 0, then time how long it takes to walk exactly 2 miles at 12% incline. Record this time.' },
    ],
    tips: 'This is steep — it should feel hard. Arms free. Record your finish time in the benchmark tracker.',
  },

  TM5: {
    id: 'TM5',
    label: 'Treadmill 5',
    shortLabel: 'TM5',
    type: 'treadmill',
    color: '#3B82F6',
    emoji: '🚶',
    totalTime: '45 min',
    steps: [
      { duration: '10 min', instruction: 'Gradually work incline up to 3%.' },
      { duration: '5 min',  instruction: '3.9 mph at 3% incline.' },
      { duration: '10 min', instruction: '3.8 mph at 4% incline.' },
      { duration: '15 min', instruction: '3.7 mph at 5% incline.' },
      { duration: '5 min',  instruction: 'Easy walking cooldown at 0% incline (Zone 1).' },
    ],
    tips: 'Light taper workout — keep it easy. This is Week 12; you\'re fresh for the TMB.',
  },

  TM7: {
    id: 'TM7',
    label: 'Treadmill 7',
    shortLabel: 'TM7',
    type: 'treadmill',
    color: '#3B82F6',
    emoji: '🚶',
    totalTime: '60 min',
    steps: [
      { duration: '10 min', instruction: 'Gradually work incline up to 5%.' },
      { duration: '10 min', instruction: '3.7 mph at 5% incline.' },
      { duration: '15 min', instruction: '3.6 mph at 6% incline.' },
      { duration: '20 min', instruction: '3.5 mph at 7% incline.' },
      { duration: '5 min',  instruction: 'Easy walking cooldown at 0% incline (Zone 1).' },
    ],
    tips: 'Steady incline work. No handrails — swing your arms for natural hip movement.',
  },

  TM8: {
    id: 'TM8',
    label: 'Treadmill 8',
    shortLabel: 'TM8',
    type: 'treadmill',
    color: '#3B82F6',
    emoji: '🚶',
    totalTime: '60 min',
    steps: [
      { duration: '10 min', instruction: 'Gradually work incline up to 6%.' },
      { duration: '10 min', instruction: '3.6 mph at 6% incline.' },
      { duration: '15 min', instruction: '3.5 mph at 7% incline.' },
      { duration: '20 min', instruction: '3.3 mph at 8% incline.' },
      { duration: '5 min',  instruction: 'Easy walking cooldown at 0% incline (Zone 1).' },
    ],
    tips: 'Adjust speeds up/down as needed. Never hold handrails unless safety requires it.',
  },

  TM9: {
    id: 'TM9',
    label: 'Treadmill 9',
    shortLabel: 'TM9',
    type: 'treadmill',
    color: '#3B82F6',
    emoji: '🚶',
    totalTime: '60 min',
    steps: [
      { duration: '10 min', instruction: 'Gradually work incline up to 7%.' },
      { duration: '10 min', instruction: '3.5 mph at 7% incline.' },
      { duration: '15 min', instruction: '3.3 mph at 8% incline.' },
      { duration: '20 min', instruction: '3.1 mph at 9% incline.' },
      { duration: '5 min',  instruction: 'Easy walking cooldown at 0% incline (Zone 1).' },
    ],
    tips: 'Getting steep. Focus on posture — chest up, arms swinging. Slow down rather than grabbing the rails.',
  },

  TM10: {
    id: 'TM10',
    label: 'Treadmill 10',
    shortLabel: 'TM10',
    type: 'treadmill',
    color: '#3B82F6',
    emoji: '🚶',
    totalTime: '60 min',
    steps: [
      { duration: '10 min', instruction: 'Gradually work incline up to 8%.' },
      { duration: '10 min', instruction: '3.3 mph at 8% incline.' },
      { duration: '15 min', instruction: '3.1 mph at 9% incline.' },
      { duration: '20 min', instruction: '2.9 mph at 10% incline.' },
      { duration: '5 min',  instruction: 'Easy walking cooldown at 0% incline (Zone 1).' },
    ],
    tips: 'Peak treadmill effort. This simulates sustained TMB gradient. Trust your fitness.',
  },

  // ── STAIR WORKOUTS ────────────────────────────────────────────────────────

  SW_30: {
    id: 'SW_30',
    label: 'Stair Walk — 30 min',
    shortLabel: 'SW 30min',
    type: 'stairs',
    color: '#8B5CF6',
    emoji: '🪜',
    totalTime: '30+ min',
    steps: [
      { duration: '30+ min', instruction: 'Walk stairs continuously: up to the top, down to the bottom, repeat. Any stairs work — building stairwell, stadium bleachers, parking deck.' },
    ],
    tips: 'Intensity: Zones 2–4. Keep hands near the rail for safety. If your knees are stiff, warm up with 5–10 min easy walking first.',
  },

  SW_40: {
    id: 'SW_40',
    label: 'Stair Walk — 40 min (benchmark)',
    shortLabel: 'SW 40min',
    type: 'stairs',
    color: '#8B5CF6',
    emoji: '🪜',
    totalTime: '40 min',
    steps: [
      { duration: '40 min', instruction: 'Walk stairs continuously for exactly 40 minutes. Count how many times you reach the top using a tally counter or notes app. Record your count.' },
    ],
    tips: 'Use the same staircase each benchmark week so counts are comparable. If you\'re on different stairs, go hard for 40 min anyway — but note the discrepancy.',
  },

  SW_DSW_10_25: {
    id: 'SW_DSW_10_25',
    label: 'Stair Walk + Double Stair Walk',
    shortLabel: 'SW + DSW',
    type: 'stairs',
    color: '#8B5CF6',
    emoji: '🪜',
    totalTime: '35 min',
    steps: [
      { duration: '10 min', instruction: 'SW: Walk stairs normally (1 step at a time up, 1 step down). Continuous reps.' },
      { duration: '25+ min', instruction: 'DSW: Immediately transition to double stair walking — 2 steps at a time going up, 1 step down. Continue for 25+ minutes.' },
      { duration: '5+ min', instruction: 'Cooldown: slow flat walking without pack.' },
    ],
    tips: 'Zones 3–4 during DSW. Keep hands near handrail on doubles — don\'t rush the transition between segments.',
  },

  SW_DSW_10_30: {
    id: 'SW_DSW_10_30',
    label: 'Stair Walk + Double Stair Walk',
    shortLabel: 'SW + DSW',
    type: 'stairs',
    color: '#8B5CF6',
    emoji: '🪜',
    totalTime: '40 min',
    steps: [
      { duration: '10 min', instruction: 'SW: Walk stairs normally (1 step at a time up, 1 step down). Continuous reps.' },
      { duration: '30+ min', instruction: 'DSW: Immediately transition to 2 steps up, 1 step down. Continue for 30+ minutes.' },
      { duration: '5+ min', instruction: 'Cooldown: slow flat walking without pack.' },
    ],
    tips: 'This is the hardest stair session so far. Zones 3–4. Maintain form over pace.',
  },

  SW_DSW_10_35: {
    id: 'SW_DSW_10_35',
    label: 'Stair Walk + Double Stair Walk',
    shortLabel: 'SW + DSW',
    type: 'stairs',
    color: '#8B5CF6',
    emoji: '🪜',
    totalTime: '45 min',
    steps: [
      { duration: '10 min', instruction: 'SW: Walk stairs normally (1 step at a time up, 1 step down).' },
      { duration: '35+ min', instruction: 'DSW: 2 steps up, 1 step down. Continue for 35+ minutes.' },
      { duration: '5+ min', instruction: 'Cooldown: slow flat walking without pack.' },
    ],
    tips: 'Peak stair volume. Zones 3–4. This is directly training the steep TMB cols.',
  },

  // ── RESISTANCE TRAINING ───────────────────────────────────────────────────

  RTP1: {
    id: 'RTP1',
    label: 'Resistance Training — Phase 1',
    shortLabel: 'RTP Phase 1',
    type: 'resistance',
    color: '#F97316',
    emoji: '💪',
    sets: '2–3 sets of each',
    exercises: [
      {
        name: 'Bodyweight Squats',
        reps: '15 reps per set',
        url: 'https://youtu.be/lwU-mdNhoYo',
      },
      {
        name: 'Single-Leg Mummy Pose — Hip Flexion',
        reps: '30–60 seconds per leg',
        url: 'https://youtu.be/y0DYMCqE_yQ',
      },
      {
        name: 'Reverse Lunges — Alternating',
        reps: '12 reps per leg',
        url: 'https://youtu.be/7Glng5UIf4o',
      },
      {
        name: 'Single Leg Lean-Over with Superman Arms',
        reps: '12 reps per leg',
        url: 'https://youtu.be/I62LCEKjTfI',
      },
    ],
    tips: 'These exercises target the exact muscles you\'ll need on the TMB — quads, glutes, hip flexors, and single-leg stability. Don\'t rush them.',
  },

  RTP12: {
    id: 'RTP12',
    label: 'Resistance Training — Phase 1 or 2',
    shortLabel: 'RTP Phase 1 or 2',
    type: 'resistance',
    color: '#F97316',
    emoji: '💪',
    sets: '2–3 sets of each',
    note: 'Choose Phase 1 if you need a lighter day. Move to Phase 2 as you build strength.',
    phase1: {
      label: 'Phase 1',
      exercises: [
        { name: 'Bodyweight Squats', reps: '15 reps per set', url: 'https://youtu.be/lwU-mdNhoYo' },
        { name: 'Single-Leg Mummy Pose — Hip Flexion', reps: '30–60 sec/leg', url: 'https://youtu.be/y0DYMCqE_yQ' },
        { name: 'Reverse Lunges — Alternating', reps: '12 reps per leg', url: 'https://youtu.be/7Glng5UIf4o' },
        { name: 'Single Leg Lean-Over with Superman Arms', reps: '12 reps per leg', url: 'https://youtu.be/I62LCEKjTfI' },
      ],
    },
    phase2: {
      label: 'Phase 2',
      exercises: [
        { name: 'Bodyweight Squats (Raised Heels)', reps: '15 reps per set', url: 'https://youtu.be/ndUy5Q3DQ0A' },
        { name: 'Single Leg Lean-Over with Superman Arms', reps: '12 reps per leg', url: 'https://youtu.be/I62LCEKjTfI' },
        { name: 'Walking Lunge — Arm Chop', reps: '12 reps per leg', url: 'https://youtu.be/9RLHu2-f0yw' },
        { name: 'Single Leg Balance — Lean Over (Suspended Leg Back)', reps: '12 reps per leg', url: 'https://youtu.be/KyG2VcZ_2ws' },
        { name: 'Lateral Bounds — Pause (skip if ankle/knee/hip/back pain)', reps: '5–10 reps per leg', url: 'https://youtu.be/0keJDyTc_HQ' },
      ],
    },
    tips: 'Phase 2 adds single-leg balance demands and lateral movement — closer to what rugged terrain requires.',
  },

  // ── INTERVAL TRAINING ─────────────────────────────────────────────────────

  INT30L2: {
    id: 'INT30L2',
    label: 'Interval Training — 30 sec (L2)',
    shortLabel: 'Intervals 30s',
    type: 'interval',
    color: '#EF4444',
    emoji: '🔥',
    totalIntervals: 10,
    steps: [
      { instruction: 'Warm-up: 5–10 min, gradually increasing intensity to Zone 3. You should be sweating before the first interval.' },
      { instruction: 'Intervals 1–5: 30 sec work (Zone 4–5) / 30 sec rest. After interval 5, rest up to 1 minute if needed.' },
      { instruction: 'Intervals 6–10: 30 sec work (Zone 4–5) / 30 sec rest.' },
      { instruction: 'Cooldown: 5+ min at Zone 1–2.' },
    ],
    modes: 'Elliptical, bike, stepper, running, or slideboard. Your choice.',
    tips: 'Zone 4–5 means unable to hold a conversation. Full rest between — get off the machine and walk around if needed. Stop if you feel dizzy, lightheaded, or chest pain.',
  },

  INT30L3: {
    id: 'INT30L3',
    label: 'Interval Training — 30 sec (L3)',
    shortLabel: 'Intervals 30s+',
    type: 'interval',
    color: '#EF4444',
    emoji: '🔥',
    totalIntervals: '10–15',
    steps: [
      { instruction: 'Warm-up: 5–10 min, gradually increasing intensity to Zone 3.' },
      { instruction: 'Intervals 1–5: 30 sec work (Zone 4–5) / 30 sec rest. After interval 5, rest up to 1 minute if needed.' },
      { instruction: 'Intervals 6–10: 30 sec work (Zone 4–5) / 30 sec rest.' },
      { instruction: 'OPTIONAL — rest 2 min then do intervals 11–15: 30 sec work / 30–60 sec rest.' },
      { instruction: 'Cooldown: 5+ min at Zone 1–2.' },
    ],
    modes: 'Elliptical, bike, stepper, running, or slideboard.',
    tips: 'The optional intervals 11–15 are bonus. Add them as you get fitter.',
  },

  INT60L2: {
    id: 'INT60L2',
    label: 'Interval Training — 60 sec (L2)',
    shortLabel: 'Intervals 60s',
    type: 'interval',
    color: '#EF4444',
    emoji: '🔥',
    totalIntervals: 10,
    steps: [
      { instruction: 'Warm-up: 5–10 min to Zone 3.' },
      { instruction: 'Intervals 1–5: 60 sec work (Zone 4–5) / 60 sec rest. After interval 5, rest up to 2 minutes if needed.' },
      { instruction: 'Intervals 6–10: 60 sec work (Zone 4–5) / 60 sec rest.' },
      { instruction: 'Cooldown: 5+ min at Zone 1–2.' },
    ],
    modes: 'Elliptical, bike, stepper, running, or slideboard.',
    tips: 'Longer work intervals — significantly harder than the 30-sec version. Full commitment during work, full rest during recovery.',
  },

  // ── HIKING ───────────────────────────────────────────────────────────────

  HIKE: {
    id: 'HIKE',
    label: 'Hike',
    shortLabel: 'Hike',
    type: 'hike',
    color: '#22C55E',
    emoji: '🥾',
    steps: [
      { instruction: 'Hike outdoors for the indicated time wearing the recommended pack weight. Terrain similar to the TMB (rolling hills, real trails) is ideal but rarely practical in NYC.' },
      { instruction: 'Urban substitutes: any combination of — stairs in your building or a parking deck, hills in Prospect Park or Fort Greene Park, elevated walking paths, Palisades if accessible.' },
    ],
    tips: 'On pavement for extended periods: joints will feel more stress. Walk on grass/dirt when possible. The TMB has real terrain under foot — mix it up as much as you can.',
  },

  HIKE_AR: {
    id: 'HIKE_AR',
    label: 'Hike + Ascending Repeats',
    shortLabel: 'Hike + AR',
    type: 'hike',
    color: '#22C55E',
    emoji: '🥾',
    steps: [
      { instruction: 'Hike for the indicated time/duration first (with pack if specified). You need 30+ minutes of hiking before starting Ascending Repeats.' },
      { instruction: 'ASCENDING REPEATS: Find a descending section of trail or hill. Remove pack. Walk downhill for exactly 1 minute. At the 1-minute mark, turn around and jog or briskly walk back up to where your pack is. Walk back down for 1 minute. That\'s 1 rep.' },
      { instruction: 'Repeat for the indicated number of reps. Target Zone 4–5 on the ascent.' },
      { instruction: 'After repeats: hydrate and continue your hike at normal pace.' },
    ],
    tips: 'Remove pack during ARs unless you\'re worried about theft. The sprint/fast-walk up is the point — go hard. Stop if lightheaded, dizzy, or nauseous. These simulate the steep grinds on the TMB cols.',
  },

  // ── WALKING / REST ────────────────────────────────────────────────────────

  WALK: {
    id: 'WALK',
    label: 'Easy Walk',
    shortLabel: 'Walk',
    type: 'walk',
    color: '#6B7280',
    emoji: '🚶',
    steps: [
      { instruction: 'Walk outdoors or on treadmill at Zone 2–3 for the indicated time. Flat or easy terrain.' },
    ],
    tips: 'This is an active recovery day. Don\'t push it. If you\'re tired, stay at Zone 2.',
  },

  OFF_XT: {
    id: 'OFF_XT',
    label: 'Rest or Cross-Train',
    shortLabel: 'Off / XT',
    type: 'rest',
    color: '#9CA3AF',
    emoji: '🛌',
    steps: [
      { instruction: 'Take the day completely off, or cross-train at Zone 1–2 intensity.' },
    ],
    options: 'Biking, swimming, paddling, elliptical, easy yoga, or just rest. Cross-training means doing something NOT in your program. But easy walking is always fine.',
    tips: 'Recovery is training. Your body adapts when you rest, not while you\'re working. Take it seriously.',
  },

  DEPARTURE: {
    id: 'DEPARTURE',
    label: 'Departure Day',
    shortLabel: 'Departure',
    type: 'special',
    color: '#7C3AED',
    emoji: '✈️',
    steps: [
      { instruction: 'Travel day. You\'re ready. Stay hydrated on the flight/train.' },
    ],
    tips: 'Light stretch at the airport. Walk as much as possible during travel. Don\'t try to fit in a workout today.',
  },

  ADVENTURING: {
    id: 'ADVENTURING',
    label: 'Tour du Mont Blanc',
    shortLabel: 'TMB!',
    type: 'special',
    color: '#7C3AED',
    emoji: '⛰️',
    steps: [
      { instruction: 'You did the work. Now have the time of your life.' },
    ],
    tips: '',
  },
}

export function getWorkout(id) {
  return WORKOUT_TYPES[id] || null
}

export const TYPE_ORDER = ['treadmill', 'interval', 'hike', 'stairs', 'resistance', 'walk', 'rest', 'special']
