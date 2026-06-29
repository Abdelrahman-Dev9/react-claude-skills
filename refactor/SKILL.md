# Skill: Refactor

## Purpose
Improve the overall codebase quality without changing behavior — reduce duplication, improve structure, and make the code easier to extend.

## When to trigger
- User says: "use the refactor skill", "clean up the code", "code is getting messy"
- After 3+ features are built
- When files are getting too large or similar code appears in multiple places

## Your job as AI
1. Scan all source files in the project
2. Identify refactoring opportunities (see Patterns below)
3. Show refactoring plan and wait for "go ahead"
4. Apply all refactors
5. Verify nothing broke (check all imports still resolve)

## Common Refactoring Patterns

### 1. Extract Shared Components
If similar JSX appears in 2+ places → extract to `components/ui/`

### 2. Extract Custom Hooks
If stateful logic appears in 2+ components → extract to `hooks/`

### 3. Split Large Files
If a file exceeds 150-200 lines → split by responsibility

### 4. Consolidate Types
If types are scattered across files → centralize in `types/index.ts`

### 5. Simplify Store
If slices have redundant state (data that can be derived) → remove derived state, compute it in selectors using `createSelector` from RTK

### 6. API Layer Cleanup
If components or hooks call axios directly → move all calls to `services/` and invoke from `createAsyncThunk`

### 7. Constants Extraction
If magic strings/numbers appear in code → move to `constants/`

### 8. Barrel Exports
If imports are deep (`../../components/feature/Component`) → add `index.ts` barrel files

### 9. Typed Redux Hooks
If components use raw `useDispatch` and `useSelector` → extract typed versions:
```ts
// hooks/redux.ts
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
  useSelector(selector)
```

## Output Format

```
### ♻️ Refactor Plan

**Issues found:**
1. [Component] duplicated in [File A] and [File B] → extract to components/ui/
2. [Logic] repeated in [Hook A] and [Hook B] → extract to hooks/useShared.ts
3. [File] is 280 lines → split into [File A] and [File B]

**Files to CREATE:** [list]
**Files to MODIFY:** [list]
**Files to DELETE:** [list]

Reply "go ahead" to apply all refactors.
```

After applying:
```
### ✅ Refactor Complete

**Before:** X files, ~Y lines total
**After:** X files, ~Y lines total (Z% reduction in duplication)

**Changes made:**
- [list of what changed and why]
```

## Rules
- Never change behavior — only structure
- After every refactor, verify imports still work
- If a refactor would break an existing test, note it
- Small focused refactors > one giant refactor
- Don't refactor code that's about to be deleted
