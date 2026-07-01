# Getting Started

`vue3-tree-vue` renders hierarchical data as an interactive tree. It supports selection, checkboxes, drag & drop, lazy loading and fully customizable node rendering through slots.

## Installation

```bash
npm i vue3-tree-vue
```

## Register the component

Register it globally as a plugin:

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import Vue3TreeVue from 'vue3-tree-vue'
import 'vue3-tree-vue/dist/style.css' // don't forget the stylesheet

createApp(App).use(Vue3TreeVue).mount('#app')
```

…or import it locally in a single component:

```vue
<script setup>
import Vue3TreeVue from 'vue3-tree-vue'
import 'vue3-tree-vue/dist/style.css'
</script>
```

::: tip
The stylesheet (`vue3-tree-vue/dist/style.css`) is required — without it the tree has no indentation, guide lines or chevrons.
:::

## Your first tree

Provide an array of items. Each item needs a `name`; `children` makes it a branch.

<script setup>
import { quickStart } from '../snippets.js'
</script>

<LiveExample :code="quickStart" console />

Every example on this site is **live** — edit the code on the left and the preview updates as you type. Click **Copy SFC** to grab a ready-to-paste single-file component.

## What's next

- [Selection](/guide/selection) and [Checkable items](/guide/checkable)
- [Drag & drop](/guide/drag-and-drop) and [Lazy loading](/guide/lazy-loading)
- [Slots](/guide/slots) for custom node rendering
- The full [API reference](/api/props)
