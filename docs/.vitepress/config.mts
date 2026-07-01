import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

// Resolve the library straight from this repo's source so the docs always
// render the current code (single Vue instance — see docs/.vitepress/theme/compile.ts).
// Point at the component directly (it uses only relative imports) rather than
// entry.esm.ts, which relies on the library's own "@/" alias — a global "@/"
// alias here would hijack VitePress's own internal "@/" imports.
const libEntry = fileURLToPath(new URL('../../src/tree-component.vue', import.meta.url))

export default defineConfig({
  title: 'vue3-tree-vue',
  description: 'A flexible, recursive tree-view component for Vue 3 — with live, editable examples.',
  lang: 'en-US',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    // Typography: Geist (headings) · Inter (body) · JetBrains Mono (code)
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Geist:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap'
    }],
    ['meta', { name: 'theme-color', content: '#42b883' }],
    ['meta', { property: 'og:title', content: 'vue3-tree-vue' }],
    ['meta', { property: 'og:description', content: 'A flexible, recursive tree-view component for Vue 3.' }]
  ],

  themeConfig: {
    nav: [
      { text: 'Docs', link: '/guide/getting-started' },
      {
        text: 'v2.0.16',
        items: [
          { text: 'npm', link: 'https://www.npmjs.com/package/vue3-tree-vue' },
          { text: 'Changelog', link: 'https://github.com/geekhybrid/vue3-tree-vue/releases' }
        ]
      }
    ],

    // A single unified sidebar shown across all pages — guide and API reference
    // merged into one continuous navigation.
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' }
        ]
      },
      {
        text: 'Features',
        items: [
          { text: 'Selection', link: '/guide/selection' },
          { text: 'Checkable Items', link: '/guide/checkable' },
          { text: 'Expand & Collapse', link: '/guide/expand-collapse' },
          { text: 'Guide Lines', link: '/guide/guide-lines' },
          { text: 'Lazy Loading', link: '/guide/lazy-loading' },
          { text: 'Drag & Drop', link: '/guide/drag-and-drop' },
          { text: 'Item Flags', link: '/guide/item-flags' },
          { text: 'Item Styling', link: '/guide/item-styling' },
          { text: 'Slots', link: '/guide/slots' },
          { text: 'Context Menu', link: '/guide/context-menu' },
          { text: 'Events', link: '/guide/events' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { text: 'Props', link: '/api/props' },
          { text: 'Events', link: '/api/events' },
          { text: 'Slots', link: '/api/slots' },
          { text: 'Types', link: '/api/types' },
          { text: 'Styling', link: '/api/styling' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/geekhybrid/vue3-tree-vue' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © Enyi Francis Hocaha'
    }
  },

  vite: {
    resolve: {
      alias: [
        // Render the library from source instead of an installed package.
        { find: 'vue3-tree-vue', replacement: libEntry }
      ]
    }
  }
})
