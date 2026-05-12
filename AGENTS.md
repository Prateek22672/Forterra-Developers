# AI Agent Guide for this Repository

## Project context
- This is a frontend app built with React 19, Vite, Tailwind CSS, GSAP, and Lenis.
- The project is using ESM/JSX in a plain JavaScript React app, not TypeScript.
- The app entrypoint is `src/main.jsx`; main UI scaffolding lives in `src/App.jsx`.
- Key work is likely in `src/components/`, `src/pages/`, and `src/hooks/`.

## Build and verify
- Install dependencies: `npm install`
- Start development server: `npm run dev`
- Build production output: `npm run build`
- Lint code: `npm run lint`

## What agents should know
- Do not assume a backend exists; this repository is a client-side Vite app.
- Keep changes aligned with the existing React + Vite + Tailwind setup.
- Tailwind is enabled through `@tailwindcss/vite` in `vite.config.js`.
- ESLint is configured with `@eslint/js`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.
- Use project script names exactly as defined in `package.json`.

## When editing code
- Preserve JSX and React conventions used throughout `src/`.
- If adding CSS or layout changes, prefer updating `src/index.css` and component-level styles.
- Run `npm run lint` after edits to verify formatting and rule compliance.
- If you make functional changes, verify manually in `npm run dev` or `npm run build` because there are no automated tests.

## Notes for `gemeni`
- If the workspace is referred to as `gemeni`, treat it as this `graphic` React/Vite app.
- Focus on the single-page app behavior and smooth scrolling/animation UX when enhancing the project.
