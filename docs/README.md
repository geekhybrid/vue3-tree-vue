# vue3-tree-vue docs

Interactive documentation for `vue3-tree-vue`, built with [VitePress](https://vitepress.dev). Every example is live and editable — the previews render the library straight from `../src` (aliased in `.vitepress/config.mts`), so the docs always match the current source.

## Local development

From the repo root:

```bash
npm --prefix docs install
npm --prefix docs run docs:dev      # dev server with HMR
npm --prefix docs run docs:build    # production build -> .vitepress/dist
npm --prefix docs run docs:preview  # serve the production build
```

(Convenience aliases `npm run docs:dev` / `docs:build` / `docs:preview` also exist at the repo root.)

## Deploying to Vercel

The site builds from **this repo** and needs `../src`, so point Vercel at the repo root with the docs directory as the project root:

1. Import the GitHub repo into Vercel.
2. Set **Root Directory** to `docs`.
3. Framework preset: **VitePress** (or rely on the committed `docs/vercel.json`).
   - Build command: `npm run docs:build`
   - Output directory: `.vitepress/dist`
   - Install command: `npm install`
4. Deploy.

> Vercel checks out the whole repository, so the `../src` alias resolves during the build. No separate library build step is required.

## How the interactive examples work

- `.vitepress/theme/LiveExample.vue` — the editor (CodeMirror 6) + live preview component.
- `.vitepress/theme/compile.ts` — compiles the edited snippet (`<template>` via `@vue/compiler-dom`, `<script>` as the body of `setup()`) into a live component, using the app's single Vue instance so the tree's `provide`/`inject` works.
- `snippets.js` — the seed snippet for each example (kept out of the markdown so a snippet's own `</script>` doesn't close the page's script block).
