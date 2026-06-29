# Skill: Testing

## Purpose
Write tests for the entire codebase — unit tests for logic, component tests for UI, and integration tests for critical flows.

## When to trigger
- User says: "use the testing skill", "write tests", "add tests before release"

## Prerequisites
- At least one feature is complete and reviewed

## Test Stack
- **React Web:** Vitest + React Testing Library + MSW (API mocking)
- **React Native:** Jest + React Native Testing Library

## Setup (if not already done)

### React Web
```bash
bun add -d vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom msw
```

Add to `vite.config.ts`:
```ts
test: {
  globals: true,
  environment: 'jsdom',
  setupFiles: './src/test/setup.ts',
}
```

Create `src/test/setup.ts`:
```ts
import '@testing-library/jest-dom'
```

### React Native
```bash
bunx expo install jest-expo @testing-library/react-native
```

## What to test

### 1. Redux Slices (highest priority)
Test reducers and async thunks.

```ts
// store/todoSlice.test.ts
import todoReducer, { addTodo, toggleTodo } from './todoSlice'

describe('todoSlice', () => {
  it('adds a todo', () => {
    const state = todoReducer(undefined, addTodo({ title: 'Buy milk' }))
    expect(state.items).toHaveLength(1)
    expect(state.items[0].title).toBe('Buy milk')
  })

  it('toggles a todo', () => {
    const initial = { items: [{ id: '1', title: 'Test', completed: false }], loading: false, error: null }
    const state = todoReducer(initial, toggleTodo('1'))
    expect(state.items[0].completed).toBe(true)
  })
})
```

### 2. Custom Hooks (high priority)
Test all state logic and side effects.

```ts
// hooks/useTodos.test.ts
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from '../store'
import { useTodos } from './useTodos'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)

describe('useTodos', () => {
  it('returns empty list initially', () => {
    const { result } = renderHook(() => useTodos(), { wrapper })
    expect(result.current.todos).toHaveLength(0)
  })
})
```

### 3. Components (UI behavior)
Test what the user sees and does — not implementation details.

```tsx
// components/TodoItem.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { store } from '../store'
import { TodoItem } from './TodoItem'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
)

describe('TodoItem', () => {
  it('renders todo title', () => {
    render(<TodoItem id="1" title="Buy milk" completed={false} />, { wrapper })
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
  })
})
```

### 4. Async Thunks (with MSW mocking)
Test that API calls are made correctly and state is updated.

```ts
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { store } from '../store'
import { fetchTodos } from '../store/todoSlice'

const server = setupServer(
  http.get('/api/todos', () => HttpResponse.json([{ id: '1', title: 'Test', completed: false }]))
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('fetchTodos thunk', () => {
  it('loads todos into state', async () => {
    await store.dispatch(fetchTodos())
    expect(store.getState().todos.items).toHaveLength(1)
  })
})
```

## Output Format

After writing all tests:
```
### 🧪 Tests Written

| File | Tests | Coverage |
|---|---|---|
| store/todoSlice.test.ts | 6 tests | add, toggle, delete, fetch pending/fulfilled/rejected |
| hooks/useTodos.test.ts | 4 tests | empty list, add, filter, error state |
| components/TodoItem.test.tsx | 3 tests | render, toggle, delete |

**Run tests:**
bun run test         # watch mode
bun run test:run     # single run
bun run test:coverage  # with coverage report

**Target:** All critical paths covered. Aim for 70%+ coverage on slices and hooks.
```

## Rules
- Test behavior, not implementation (don't test internal state directly)
- Every async thunk needs a test for pending, fulfilled, AND rejected
- Mock all API calls — never hit real APIs in tests
- Always wrap components with Redux Provider in tests
- Test file lives next to the file it tests: `todoSlice.ts` → `todoSlice.test.ts`
- No test should depend on another test
- Use `describe` blocks to group related tests
