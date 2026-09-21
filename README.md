# Portfolio — Baha Eddine Dridi

Personal developer portfolio: a single scrolling page built with Next.js 16 (App
Router), React 19, Tailwind CSS 4 and Motion.

## Getting started

```bash
npm install
```

```bash
npm run dev
```

The site runs at http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Project structure

```
src/
  app/                 Route files, global CSS, metadata, sitemap and robots
  components/
    sections/          One file per page section — thin, data-driven
    layouts/           Navbar, Footer, loading and background chrome
    projects/          Project carousel, card, modal, gallery
    experience/        Timeline and its items
    skills/            Constellation, nodes, connections, legend
    effects/           Canvas / WebGL / decorative animation components
    ui/                Primitives (button, badge, sheet)
  data/                All site content — edit these, not the components
  hooks/               Shared hooks (theme, media queries, carousel rotation)
  lib/                 Pure helpers: icons, motion tokens, constellation maths
  types/               Shared type definitions
```

### Editing content

Everything that reads as content lives in `src/data/` and none of it requires
touching a component:

| File | Holds |
| --- | --- |
| `projects.ts` | The project carousel entries |
| `experience.ts` | The professional timeline |
| `skills.ts` | Skill nodes, categories and constellation layout |
| `contact.ts` | Contact channels |
| `navigation.ts` | Section ids and nav labels (navbar **and** footer) |
| `site.ts` | Name, tagline, canonical URL, social links |
| `lotties.ts` | Lottie animation URLs |

## Conventions

- **Icons come from one place.** Import from `@/lib/icons`, which re-exports
  `react-icons` under intent-revealing names. `src/lib/techIcons.ts` is the
  separate registry for technology brand marks used by the skills constellation.
- **Animation tokens live in `@/lib/motion`.** Reach for the shared variants and
  transitions rather than re-declaring durations and easings per component.
- **Theme is the `dark` class on `<html>`.** Read it with `useTheme()`; an inline
  script in the layout applies it before first paint to avoid a flash.
- **Client components still server-render.** Only components that genuinely need
  a browser API (WebGL, canvas) use `dynamic(..., { ssr: false })`.

## Known constraints

- **TypeScript is pinned to 5.x.** TS 7 compiles and builds fine, but
  `typescript-eslint` does not support it yet
  ([typescript-eslint#10940](https://github.com/typescript-eslint/typescript-eslint/issues/10940)),
  which breaks `npm run lint`.
- **ESLint is pinned to 9.x.** `eslint-config-next` 16 bundles an
  `eslint-plugin-react` that is not ESLint 10 compatible.
