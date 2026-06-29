# Skill: Review

## Purpose
Audit the last feature built and catch bugs, bad patterns, missing edge cases, and code quality issues — before moving to the next feature.

## When to trigger
- User says: "use the review skill", "review the code", "check what was built"

## Your job as AI
1. Read all files created/modified in the last feature
2. Run through every checklist item below
3. Produce a detailed review report
4. If issues found: fix them immediately (don't just list them)
5. If clean: confirm and suggest moving to next feature

## Review Checklist

### 🐛 Bugs & Logic
- [ ] No infinite re-render loops (missing dependency arrays, etc.)
- [ ] All async functions properly awaited
- [ ] No race conditions in API calls
- [ ] State updates don't cause stale closures
- [ ] Array/object mutations avoided (immutability respected — RTK uses Immer so mutations inside reducers are fine)

### 🔒 TypeScript
- [ ] No `any` types used
- [ ] All props interfaces defined
- [ ] API responses typed
- [ ] No `@ts-ignore` comments
- [ ] Enums or const objects used for magic strings
- [ ] Redux state and dispatch properly typed with RootState and AppDispatch

### 🎨 UI / UX
- [ ] Loading state shown for every async action
- [ ] Error state shown and user-friendly (no raw error messages)
- [ ] Empty state handled (no blank screens)
- [ ] Form validation messages shown inline
- [ ] Responsive on mobile (web) / works on small screens (RN)

### 🧹 Code Quality
- [ ] No duplicate code (DRY principle)
- [ ] No commented-out code left behind
- [ ] No console.log statements
- [ ] Functions do one thing only
- [ ] No files over 200 lines (split if needed)
- [ ] Imports organized (external → internal → relative)

### 🔗 Integration
- [ ] New route added to router
- [ ] Slice registered in configureStore
- [ ] API service used inside createAsyncThunk (not raw fetch/axios in components)
- [ ] No hardcoded URLs or magic numbers

### ♿ Accessibility (Web)
- [ ] Buttons have descriptive labels
- [ ] Images have alt text
- [ ] Forms have labels for inputs
- [ ] Color contrast sufficient

## Output Format

```
### 🔍 Code Review: [Feature Name]

**Status:** ✅ Clean / ⚠️ Issues Found / 🔴 Critical Issues

#### Issues Found
| # | Severity | File | Issue | Fix |
|---|---|---|---|---|
| 1 | 🔴 Critical | ComponentA.tsx | Missing error boundary | Added try/catch |
| 2 | 🟡 Warning | featureSlice.ts | Missing rejected case in extraReducers | Added error handling |
| 3 | 🔵 Minor | types/index.ts | Unused type definition | Removed |

#### Fixes Applied
[List files modified during review with what changed]

#### Summary
- X issues found, X fixed automatically
- Code is now ready for next feature / needs manual input for [X]
```

## Severity Levels
- 🔴 **Critical** — will cause bugs or crashes, fixed immediately
- 🟡 **Warning** — bad pattern, performance issue, or missing state handling, fixed immediately
- 🔵 **Minor** — style, naming, or organization, fixed if quick

## Rules
- Fix issues immediately, don't just report them
- If a fix is complex, explain the approach before applying
- Never give a "looks good" review without running through the full checklist
- After fixing, re-check the fixed code didn't break anything
