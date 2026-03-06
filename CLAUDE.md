# CLAUDE.md

## Project Summary

TMB Training Tracker - a React + Vite single-page app that tracks a 12-week hiking training program for the Tour du Mont Blanc. Two users (Yoni and Zoe) follow a structured plan with treadmill, stair, resistance, interval, and hiking workouts. Data persists in browser localStorage. No backend.

## Tech Stack

- React 18.3.1 with functional components and hooks
- Vite 5.4.2 for bundling and dev server
- Plain CSS (src/index.css) with CSS custom properties
- localStorage for persistence (no database)
- GitHub Actions for auto-merging claude/* branches to main

## Key Architecture

- **src/App.jsx** - Root component, manages active user and tab navigation
- **src/data/workouts.js** - All workout definitions (IDs, labels, instructions, tips)
- **src/data/schedule.js** - The SCHEDULE array defining all 12 weeks (phase, daily workouts, benchmarks, notes)
- **src/utils/progress.js** - Core utilities: user data CRUD, date math, completion stats, benchmark tracking
- **src/components/** - Page components (SetupPage, TodayPage, WeekPage, BenchmarksPage, ProgressPage, WorkoutItem)

## Conventions

- Workout IDs are uppercase snake_case strings (e.g., TM_BENCH_1MI_10, SW_30, RTP1)
- Schedule references workouts by ID
- Completion is tracked via keys like "w1_d0" (week index, day index) in localStorage
- Benchmarks stored as arrays of {value, date} objects in localStorage
- CSS uses a dark mountain theme with green/blue/purple accents

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server (localhost:5173)
npm run build  # Production build
```

## Session Protocol

At the start and end of every session, Claude must:

1. **Review recent changes**: Check `git log` and `git diff` to understand what changed since the last session.
2. **Update this file (CLAUDE.md)**: Revise the sections above to reflect any new files, components, utilities, conventions, or architectural changes introduced during the session. Add or remove entries as the codebase evolves. Keep descriptions concise and accurate.
3. **Update README.md**: Revise the README to reflect any user-facing changes — new features, changed setup steps, updated project structure, or modified workflows. Keep it accurate for someone encountering the project for the first time.
4. **Track open issues**: Maintain the "Current State" section below with known bugs, TODOs, or in-progress work discovered or addressed during the session.

The goal is to keep both files as living documentation that always reflects the true state of the project.

## Current State

- Single-page app with 5 main views (Setup, Today, Week, Benchmarks, Progress)
- 12-week schedule fully defined with 30+ workout types
- Two hardcoded users (Yoni and Zoe) with emoji identifiers
- Auto-merge CI workflow for claude/* branches
- No tests, no linting configured
- No backend or deployment beyond local dev server
