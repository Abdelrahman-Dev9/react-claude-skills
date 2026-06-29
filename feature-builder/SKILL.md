# Skill: Feature Builder

## Purpose
Build one complete feature end-to-end — components, logic, state, routing, and types. Zero code from the user.

## When to trigger
- User says: "use the feature-builder skill", "build the [X] feature", "implement [X]"

## Prerequisites
- Project is bootstrapped and running

## Your job as AI
1. Identify which feature to build from the conversation
2. Plan the feature implementation (show the plan first, wait for "ok" or "go ahead")
3. Write ALL files for the feature
4. Connect it to existing router, store, and services
5. Make sure no existing file is broken

## Feature Implementation Plan (show before coding)

```
### 🔨 Feature: [Feature Name]

**Files to CREATE:**
- src/app/[route].tsx
- src/components/[feature]/ComponentA.tsx
- src/components/[feature]/ComponentB.tsx
- src/hooks/useFeatureName.ts
- src/services/featureService.ts
- src/store/[feature]Slice.ts

**Files to MODIFY:**
- src/App.tsx → add route
- src/store/index.ts → add slice to configureStore
- src/types/index.ts → add types

**Behavior:**
- What the user sees
- What happens on each interaction
- Error states handled
```

Wait for user to say "go ahead" or "ok" before writing code.

## Code Standards to follow

### Components
- Functional components only, never class components
- Props always typed with TypeScript interface
- One component per file
- Named exports (not default) for components inside feature folders
- Default export only for page/screen components

### Example component structure:
```tsx
interface Props {
  title: string
  onPress: () => void
}

export function FeatureCard({ title, onPress }: Props) {
  return (
    // JSX here
  )
}
```

### Hooks
- Custom hook for every piece of non-trivial logic
- Hook name starts with `use`
- Returns named object, not array (except useState-like hooks)
- Use `useSelector` and `useDispatch` from react-redux inside hooks

### State (Redux Toolkit)
- One slice per feature using `createSlice()`
- Actions and reducers co-located in the slice file
- Use `useSelector` to read state, `useDispatch` to dispatch actions
- Async logic goes in `createAsyncThunk`
- No direct state mutations outside of slice reducers
- Register every new slice in `src/store/index.ts` configureStore

### Example slice structure:
```ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface FeatureState {
  items: Item[]
  loading: boolean
  error: string | null
}

const initialState: FeatureState = {
  items: [],
  loading: false,
  error: null,
}

export const fetchItems = createAsyncThunk('feature/fetchItems', async () => {
  const response = await featureService.getAll()
  return response.data
})

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => { state.loading = true })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Something went wrong'
      })
  },
})

export const { addItem } = featureSlice.actions
export default featureSlice.reducer
```

### API Calls
- All API calls go in `services/` folder
- Use the Axios instance from `services/api.ts`
- Return typed responses
- Call services from `createAsyncThunk`, never directly from components

### Error Handling
- Every async thunk must handle pending/fulfilled/rejected
- Show user-facing error messages from Redux state
- Loading states driven by Redux `loading` field

### Styling
- Tailwind only — no inline styles, no CSS files (unless global)
- Mobile-first for React web
- For React Native: NativeWind classes

## After writing all files, produce:

```
### ✅ Feature Complete: [Feature Name]

**Files created:** [list]
**Files modified:** [list]

**To test:**
1. [Step 1]
2. [Step 2]

**Next:** Run the Review skill to check the code quality.
```

## Rules
- Write COMPLETE files — no "// rest of the code" shortcuts
- Never leave TODOs in the code
- If a feature depends on an API that doesn't exist yet, mock it cleanly
- Handle empty states, loading states, and error states always
- Accessibility: add aria labels, proper semantic HTML (web) or accessibilityLabel (RN)
