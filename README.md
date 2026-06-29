# React Claude Skills 🤖

Claude Code skills for React / React Native projects.
Writes 100% of the code for you — your only job is to **review and approve**.

## Stack
- ⚛️ React 18 + Vite **or** Expo (React Native)
- 🔷 TypeScript
- 🎨 Tailwind CSS / NativeWind
- 🗂️ Redux Toolkit + React-Redux
- 📡 Axios
- 📋 React Hook Form + Zod
- 🧪 Vitest + React Testing Library
- 📦 Bun (package manager)

## Installation

```bash
bun add github:your-username/react-claude-skills
```

After install, the `skills/` folder is automatically copied to your project root.

## Workflow

```
planner → architect → bootstrap → feature-builder (×N) → review → refactor → testing → documentation → deployment
```

## Usage in Claude Code

```bash
claude "use the planner skill: I want to build a [describe your app]"
claude "use the architect skill to design the architecture"
claude "use the bootstrap skill to set up the project"
claude "use the feature-builder skill to build the [feature name] feature"
claude "use the review skill"
claude "use the refactor skill"
claude "use the testing skill"
claude "use the documentation skill"
claude "use the deployment skill"
```

## Skills

| Skill | When to use |
|---|---|
| `planner` | Starting a new project |
| `architect` | After plan is approved |
| `bootstrap` | Before writing any code |
| `feature-builder` | For every new feature |
| `review` | After every feature |
| `refactor` | When code gets messy |
| `testing` | Before release |
| `documentation` | Keep docs updated |
| `deployment` | Final release |
