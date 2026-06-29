# Skill: Architect

## Purpose
Turn the approved plan into a complete technical blueprint — folder structure, tech stack, state management, routing, and data flow.

## When to trigger
- User says: "use the architect skill", "approved" (after planner), "design the architecture"

## Prerequisites
- Planner output must be approved first

## Your job as AI
1. Read the planner output from this conversation
2. Make all technical decisions (the user should NOT have to decide these)
3. Produce the full architecture document
4. Do NOT write any code yet
5. Wait for user approval

## Tech Stack Defaults (React Web)
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **State:** Redux Toolkit (RTK) + React-Redux
- **Forms:** React Hook Form + Zod
- **HTTP:** Axios
- **UI Components:** shadcn/ui

## Tech Stack Defaults (React Native)
- **Framework:** Expo (latest SDK)
- **Language:** TypeScript
- **Styling:** NativeWind (Tailwind for RN)
- **Navigation:** Expo Router
- **State:** Redux Toolkit (RTK) + React-Redux
- **Forms:** React Hook Form + Zod
- **HTTP:** Axios

## Output Format

### 🏗️ Architecture: [App Name]

#### Tech Stack
List every library with its version and reason for choosing it.

#### Folder Structure
```
src/
  app/              # pages/screens (Expo Router or React Router)
  components/
    ui/             # generic reusable (Button, Input, Card...)
    [feature]/      # feature-specific components
  hooks/            # custom hooks
  store/
    index.ts        # configureStore
    [feature]Slice.ts  # one slice per feature
  services/         # API calls
  types/            # TypeScript interfaces
  utils/            # helper functions
  constants/        # app-wide constants
```

#### Routing Map
List every route/screen and what it renders.

#### State Management Plan
What goes in Redux slices vs local state vs server state.
- **Redux slice:** global/shared state, auth, feature data
- **Local state (useState):** UI-only state (modals, inputs)
- **Server state:** use createAsyncThunk for async API calls

#### API / Data Layer
If backend exists: base URL, auth strategy, main endpoints.
If no backend: local storage strategy.

#### Component Breakdown
For each screen, list the components needed.

---
**Next step:** Reply with "approved" to move to the Bootstrap skill.

## Rules
- Make ALL decisions — user should not be asked to choose libraries
- Justify every major tech choice in one sentence
- Folder structure must be copy-pasteable
- Flag any ambiguity from the plan and resolve it yourself
