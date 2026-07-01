---
layout: home

hero:
  name: vue3-tree-vue
  text: Interactive tree views for Vue 3
  tagline: A flexible, recursive tree-view component — checkboxes, drag & drop, lazy loading, slots and more. Every example below is live and editable.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Reference
      link: /api/props
    - theme: alt
      text: View on GitHub
      link: https://github.com/geekhybrid/vue3-tree-vue

features:
  - title: Selectable & Checkable
    details: Single-select mode or cascading checkboxes with automatic indeterminate (tri-state) parents.
    link: /guide/checkable
  - title: Drag & Drop
    details: Reorder and re-parent nodes with async drop validation via a Promise-returning callback.
    link: /guide/drag-and-drop
  - title: Lazy Loading
    details: Load children on demand when a node is expanded — perfect for large or remote trees.
    link: /guide/lazy-loading
  - title: Customisable Slots
    details: Customize icons, labels, expanders and trailing actions on every node.
    link: /guide/slots
  - title: Per-item Styling
    details: Apply CSS classes per node, style checkboxes, and highlight the selected item.
    link: /guide/item-styling
  - title: Context Menu
    details: Right-click any node to build your own context menus with the onContextMenu event.
    link: /guide/context-menu
---

<script setup>
import {
  mediaLibrary, pizzaBuilder, fileManager, contextMenuDemo
} from './snippets.js'
</script>

## Install

```bash
npm i vue3-tree-vue
```

### Expand & Collapse

::: tip What to look for
Click any folder to **expand or collapse** it. Notice that the **Movies** node renders **two custom icons** (🎬🍿) through the `item-prepend-icon` slot, while every other node falls back to its own single icon — the same slot can give one node bespoke content.
:::

<LiveExample :code="mediaLibrary" tabs :height="300" console />

### Checkable Items

Set `isCheckable` to get checkboxes. Checking a parent cascades to its children, and partially-checked parents render an indeterminate (tri-state) box.

<LiveExample :code="pizzaBuilder" tabs :height="300" console />

### Drag & Drop

Drag a file onto a folder to move it. The async `dropValidator` callback decides which drops are allowed.

::: tip What to look for
Drag a file onto a folder to re-parent it — the async **`dropValidator(dropped, host)`** runs first and must resolve `true` for the move to happen. The **Operating System Files (Read-only)** folder is fully locked:

- it **refuses incoming files** — the validator returns `false` for read-only folders,
- the **folder itself can't be moved** into another folder — it sets **`disableDragAndDrop: true`**, and
- **none of its files can be moved out** either — each one sets `disableDragAndDrop: true` too.

Watch the event console to see each move — and each refusal.
:::

<LiveExample :code="fileManager" tabs :height="300" console />

### Context Menu

Right-click any file to fire the `onContextMenu` event and drive your own menu — payload is `{ item, event }`.

<LiveExample :code="contextMenuDemo" tabs :height="300" console />

---

Ready to build your own? Head to **[Getting Started](/guide/getting-started)** or browse the **[API reference](/api/props)**.
