# Skill: Documentation

## Purpose
Keep the project documented so any developer (or future you) can understand, run, and extend the project without asking questions.

## When to trigger
- User says: "use the documentation skill", "update the docs", "document the project"
- After major features or refactors

## Your job as AI
1. Read the entire project structure
2. Generate/update all documentation files
3. Make sure docs reflect the CURRENT state of the code (not the plan)

## Files to produce

### 1. `README.md` (root)
```markdown
# [App Name]

[One paragraph description of what the app does and who it's for]

## Tech Stack
[List with links]

## Getting Started

### Prerequisites
- Bun v1.0+
- [Any other requirements]

### Installation
\`\`\`bash
git clone [repo]
cd [app-name]
bun install
cp .env.example .env   # fill in your values
bun run dev
\`\`\`

### Environment Variables
| Variable | Description | Required |
|---|---|---|
| VITE_API_URL | Backend API base URL | ✅ |

## Project Structure
[Folder tree with one-line description of each folder]

## Available Scripts
| Script | Description |
|---|---|
| `bun run dev` | Start dev server |
| `bun run build` | Production build |
| `bun run test` | Run tests |
| `bun run lint` | Check code quality |

## Features
[List of implemented features with brief description]
```

### 2. `CONTRIBUTING.md`
```markdown
# How to contribute / add features

## Workflow
1. Use the planner skill for new features
2. Use the feature-builder skill to implement
3. Use the review skill to check
4. Use the testing skill to test

## Code Standards
- Redux Toolkit for all global state (one slice per feature)
- createAsyncThunk for all async operations
- Services layer for all API calls
- Typed hooks: useAppDispatch and useAppSelector

## Folder Structure
[Where to put new files]
```

### 3. Inline Code Comments
For complex logic only — add JSDoc comments:
```ts
/**
 * Refreshes the auth token if it's expired.
 * Automatically called by the Axios interceptor on 401 responses.
 */
async function refreshToken(): Promise<string> {
```

## Rules
- Write for a developer who has never seen this project
- Keep README focused — link to other docs for details
- Update docs every time a feature is added (don't let them go stale)
- No docs for obvious things — don't comment `// increment count` on `count++`
- Code examples in docs must actually work
- Always use `bun` commands in docs, never `npm`
