# Skill: Bootstrap

## Purpose
Set up the project from zero to a running app with all config, folder structure, and base files in place — ready for feature development.

## When to trigger
- User says: "use the bootstrap skill", "set up the project", "initialize the project"

## Prerequisites
- Architecture must be approved

## Your job as AI
1. Read the approved architecture from this conversation
2. Generate ALL setup commands and files
3. Create the complete folder structure with placeholder files
4. Set up config files (TypeScript, ESLint, Tailwind, etc.)
5. Create a working "Hello World" that proves the setup is correct

## What to produce (React Web — Vite)

### Step 1: Init commands
```bash
bun create vite@latest [app-name] -- --template react-ts
cd [app-name]
bun install
```

### Step 2: Install all dependencies
One block with ALL installs — user runs this once.
```bash
bun add @reduxjs/toolkit react-redux react-router-dom axios react-hook-form zod
bun add -d tailwindcss postcss autoprefixer @types/react @types/react-dom
```

### Step 3: Config files
Generate the full content of:
- `tsconfig.json`
- `vite.config.ts`
- `tailwind.config.ts`
- `postcss.config.js`
- `.eslintrc.json`
- `.prettierrc`
- `src/index.css` (Tailwind directives)

### Step 4: Folder structure
Create every folder and an `index.ts` barrel file where needed.

### Step 5: Base files
- `src/App.tsx` — router setup with all routes
- `src/main.tsx` — entry point wrapped with Redux Provider
- `src/store/index.ts` — configureStore with empty reducers
- `src/services/api.ts` — Axios instance with base config
- `src/types/index.ts` — shared TypeScript types from the plan
- `src/constants/index.ts` — app constants

### Step 6: Verify
Tell the user exactly what to run and what they should see:
```bash
bun run dev
# → App should open at http://localhost:5173 showing [description]
```

## What to produce (React Native — Expo)

### Step 1: Init
```bash
bunx create-expo-app@latest [app-name] --template blank-typescript
cd [app-name]
```

### Step 2: Dependencies
```bash
bun add @reduxjs/toolkit react-redux axios react-hook-form zod
bun add nativewind
bun add -d tailwindcss
```

### Step 3: Config files
- `app.json`
- `tsconfig.json`
- `babel.config.js`
- `tailwind.config.js` (NativeWind)

### Step 4: Base files
- `app/_layout.tsx` — root layout with navigation + Redux Provider
- `app/index.tsx` — home screen
- `store/index.ts` — configureStore
- `store/[feature]Slice.ts` — example slice
- `services/api.ts` — Axios
- `types/index.ts`
- `constants/index.ts`

### Step 5: Verify
```bash
bunx expo start
# → Scan QR code, should see [description]
```

## Rules
- Every command must be copy-pasteable and runnable as-is
- No placeholders like `YOUR_API_KEY` without explaining where to get it
- The app must actually run after bootstrap — no broken imports
- Generate complete file contents, not snippets
- Always use `bun add` instead of `npm install`
- Always use `bun run` instead of `npm run`
