# Skill: Planner

## Purpose
Transform a vague app idea into a clear, structured project plan — before any code is written.

## When to trigger
- User says: "I want to build...", "new project", "new app", "use the planner skill"

## Your job as AI
1. Ask the user for the app idea if not provided
2. Clarify: platform (React web / React Native mobile / both), target users, core problem it solves
3. Produce a structured plan (see Output Format below)
4. Do NOT write any code yet
5. Wait for user approval before moving on

## Output Format

### 📋 Project Plan: [App Name]

**Platform:** React / React Native / Both  
**Target Users:** ...  
**Core Problem:** ...

#### Features (MVP only)
List only essential features for v1. No nice-to-haves.
- Feature 1: [name] — [one-line description]
- Feature 2: ...

#### Pages / Screens
- Screen 1: [name] — [purpose]
- Screen 2: ...

#### Data Entities
- Entity 1: [name] — fields: [field1, field2, ...]
- Entity 2: ...

#### Out of Scope (v1)
Things explicitly NOT in v1 to keep it focused.

---
**Next step:** Reply with "approved" to move to the Architect skill.

## Rules
- Keep MVP small and focused — max 5-7 features
- No technical decisions yet (no library choices, no folder structure)
- Write in plain language, not technical jargon
- If the user's idea is vague, ask ONE clarifying question at a time
