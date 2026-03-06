# TMB Training Tracker

A 12-week training program tracker to prepare for the **Tour du Mont Blanc (TMB)** hiking challenge, built with React and Vite.

## Overview

This app helps two athletes (Yoni and Zoe) follow a structured Level 2 training plan leading up to a July 4 departure date. It tracks daily workouts, weekly schedules, benchmark performance tests, and overall progress.

## Training Structure

The 12-week plan is divided into 6 phases:

| Phase | Weeks | Purpose |
|-------|-------|---------|
| **BASE** | 1-3 | Foundation building |
| **RECOVERY** | 4 | Active recovery & benchmark testing |
| **BUILD** | 5-7 | Intensity increase |
| **RECOVERY** | 8 | Mid-program recovery |
| **PEAK** | 9-11 | Maximum intensity |
| **TAPER** | 12 | Pre-departure recovery |

### Workout Types

- **Treadmill** - Steady incline cardio (10-12% grade) and benchmark time trials
- **Stairs** - Single and double-step stair training
- **Resistance** - Bodyweight exercises for quads, glutes, and hip stability
- **Intervals** - High-intensity cardio bursts
- **Hiking** - Long outdoor hikes with optional ascending repeats

## Features

- **Today View** - See today's assigned workouts with detailed instructions, mark as done
- **Week View** - Browse the full 12-week schedule
- **Benchmarks** - Log and track treadmill times and stair ascent counts across the program
- **Progress Dashboard** - Compare both users' completion stats and benchmark results side-by-side
- **Countdown** - Days remaining until departure

## Tech Stack

- **React 18** with hooks for state management
- **Vite** for dev server and builds
- **localStorage** for data persistence (per-user profiles)
- **Plain CSS** with CSS custom properties for theming

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Project Structure

```
src/
  App.jsx              # Main app with navigation and user toggle
  components/
    SetupPage.jsx      # Initial start date configuration
    TodayPage.jsx      # Daily workout view
    WeekPage.jsx       # Weekly schedule browser
    BenchmarksPage.jsx # Benchmark logging and history
    ProgressPage.jsx   # Cross-user progress comparison
    WorkoutItem.jsx    # Reusable workout display component
  data/
    workouts.js        # 30+ workout definitions with instructions
    schedule.js        # 12-week training schedule
  utils/
    progress.js        # localStorage helpers, date utils, stats calculations
```

## CI/CD

A GitHub Actions workflow (`.github/workflows/auto-merge-claude.yml`) auto-merges `claude/**` branches into `main`.
