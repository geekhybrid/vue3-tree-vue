// Seed snippets for the live examples. Kept in a .js module (not inline in
// markdown) so the literal `</script>` inside each snippet doesn't prematurely
// close the page's own <script setup> block.
//
// Convention: each snippet is an SFC-like string with a <template> block and a
// <script> block. The <script> block is the *body of setup()* and must
// `return { ... }`. `ref`, `reactive`, `computed`, `watch` and `log` are in scope.

const S = 'script' // avoids a literal closing script tag in tooling

const files = `[
  {
    name: 'Documents',
    expanded: true,
    children: [
      { name: 'Resume.docx' },
      { name: 'Budget.xlsx' },
      {
        name: 'Projects',
        children: [
          { name: 'tree-view.md' },
          { name: 'ideas.txt' }
        ]
      }
    ]
  },
  {
    name: 'Photos',
    children: [
      { name: 'beach.png' },
      { name: 'mountains.png' }
    ]
  }
]`

export const quickStart = `<template>
  <vue3-tree-vue :items="items" @onSelect="log" />
</template>
<${S}>
return {
  items: ref(${files})
}
</${S}>`

export const selection = `<template>
  <vue3-tree-vue :items="items" @onSelect="log" />
</template>
<${S}>
// Click a node to select it. The selected node gets the
// .selected-tree-item class (styled in this site's CSS).
return {
  items: ref(${files})
}
</${S}>`

export const checkable = `<template>
  <vue3-tree-vue
    :items="items"
    isCheckable
    checkboxStyle="bootstrap-check"
    @onCheckedChanged="log"
    @onUnchecked="log" />
</template>
<${S}>
// Checking a parent cascades to children; partially-checked
// parents render an indeterminate checkbox automatically.
return {
  items: ref(${files})
}
</${S}>`

export const checkablePreset = `<template>
  <vue3-tree-vue :items="items" isCheckable checkboxStyle="bootstrap-check" @onCheck="log" />
</template>
<${S}>
// Items can start checked or disabled.
return {
  items: ref([
    {
      name: 'Invoices',
      expanded: true,
      checked: true,
      children: [
        { name: 'Q1.pdf' },
        { name: 'Q2.pdf', disabled: true }
      ]
    },
    { name: 'Archive (disabled)', disabled: true }
  ])
}
</${S}>`

export const expandCollapse = `<template>
  <div>
    <button @click="collapseAll">Collapse all</button>
    <button @click="expandAll">Expand all</button>
    <vue3-tree-vue :items="items" @onExpand="log" @onCollapse="log" />
  </div>
</template>
<${S}>
// Expansion is driven by the item.expanded flag — set it
// programmatically and the tree reacts.
const items = ref(${files})
const walk = (nodes, fn) => nodes.forEach(n => {
  fn(n)
  if (n.children) walk(n.children, fn)
})
const collapseAll = () => walk(items.value, n => (n.expanded = false))
const expandAll = () => walk(items.value, n => (n.expanded = true))
return { items, collapseAll, expandAll }
</${S}>`

export const guideLines = `<template>
  <div>
    <label>
      <input type="checkbox" v-model="hide" /> hideGuideLines
    </label>
    <vue3-tree-vue :items="items" :hideGuideLines="hide" />
  </div>
</template>
<${S}>
return {
  hide: ref(false),
  items: ref(${files})
}
</${S}>`

export const lazyLoad = `<template>
  <vue3-tree-vue :items="items" lazyLoad @onExpand="load">
    <!-- Show a spinner on the folder row while its children load. -->
    <template #item-append="item">
      <span v-if="item.loading" class="tree-loader">
        <span class="tree-spinner"></span> Loading…
      </span>
    </template>
  </vue3-tree-vue>
</template>
<${S}>
// With lazyLoad, every node shows an expander. Fetch children on
// demand inside the onExpand handler.
let counter = 0
const items = ref([
  { name: 'Remote folder A', children: [] },
  { name: 'Remote folder B', children: [] }
])
const load = (item) => {
  // Only fetch once: skip if already loaded or currently loading.
  if (!item.children || item.children.length > 0 || item.loading) return

  log('fetching children for ' + item.name + '…')
  item.loading = true

  // Simulate a 1.2s API call.
  setTimeout(() => {
    item.children.push(
      { name: 'loaded-file-' + (++counter) + '.txt' },
      { name: 'loaded-file-' + (++counter) + '.txt' }
    )
    item.loading = false
    log('loaded ' + item.name)
  }, 1200)
}
return { items, load }
</${S}>`

export const dragDrop = `<template>
  <vue3-tree-vue :items="items" @dropValidator="canDrop" />
</template>
<${S}>
// Drag nodes to reorder / re-parent. dropValidator returns a
// Promise<boolean>; return false to reject a drop.
const canDrop = (dropped, host) => {
  log('drop ' + dropped.name + ' -> ' + (host ? host.name : 'root'))
  // Reject dropping onto the Photos folder, as an example.
  return Promise.resolve(!host || host.name !== 'Photos')
}
return {
  items: ref(${files}),
  canDrop
}
</${S}>`

export const itemFlags = `<template>
  <vue3-tree-vue :items="items" />
</template>
<${S}>
return {
  items: ref([
    {
      name: 'Playlists (not draggable)',
      disableDragAndDrop: true,
      expanded: true,
      children: [
        { name: 'Focus.m3u' },
        { name: 'Workout.m3u' }
      ]
    },
    {
      name: 'Always open (collapsible: false)',
      collapsible: false,
      expanded: true,
      children: [
        { name: 'pinned-note.txt' }
      ]
    },
    { name: 'Disabled item', disabled: true }
  ])
}
</${S}>`

export const itemStyling = `<template>
  <vue3-tree-vue :items="items" isCheckable checkboxStyle="bootstrap-check" />
</template>
<${S}>
// styles: apply arbitrary CSS classes per node.
// checkboxStyle: apply a class to every checkbox.
return {
  items: ref([
    {
      name: 'Important',
      styles: ['bold-font'],
      expanded: true,
      children: [
        { name: 'read-me-first.txt', styles: ['bold-font'] },
        { name: 'normal-file.txt' }
      ]
    }
  ])
}
</${S}>`

export const slotIcon = `<template>
  <vue3-tree-vue :items="items">
    <template #item-prepend-icon="item">
      <span v-if="item.children">📁</span>
      <span v-else>📄</span>
    </template>
  </vue3-tree-vue>
</template>
<${S}>
return {
  items: ref(${files})
}
</${S}>`

export const slotName = `<template>
  <vue3-tree-vue :items="items">
    <template #item-name="item">
      <span :style="{ color: item.name.endsWith('.png') ? 'teal' : '' }">
        {{ item.name }}
      </span>
    </template>
  </vue3-tree-vue>
</template>
<${S}>
return {
  items: ref(${files})
}
</${S}>`

export const slotExpander = `<template>
  <vue3-tree-vue :items="items">
    <template #item-expander="item">
      <span style="width: 16px; display: inline-block; text-align: center">
        {{ item.expanded ? '▾' : '▸' }}
      </span>
    </template>
  </vue3-tree-vue>
</template>
<${S}>
return {
  items: ref(${files})
}
</${S}>`

export const slotAppend = `<template>
  <vue3-tree-vue :items="items">
    <template #item-append="item">
      <span class="on-item-hover">
        <button @click.stop="log('action on ' + item.name)">⋯</button>
      </span>
    </template>
  </vue3-tree-vue>
</template>
<${S}>
// The .on-item-hover class only reveals content while hovering the row.
return {
  items: ref(${files})
}
</${S}>`

export const slotChildAppend = `<template>
  <vue3-tree-vue :items="items">
    <template #child-append="parent">
      <button
        v-if="parent.name === 'Documents'"
        @click="add(parent)">
        + Add file to {{ parent.name }}
      </button>
    </template>
  </vue3-tree-vue>
</template>
<${S}>
const items = ref(${files})
let n = 0
const add = (parent) => {
  parent.children.push({ name: 'new-file-' + (++n) + '.txt' })
}
return { items, add }
</${S}>`

export const events = `<template>
  <vue3-tree-vue
    :items="items"
    isCheckable
    checkboxStyle="bootstrap-check"
    @onSelect="log"
    @onCheck="log"
    @onCheckedChanged="log"
    @onUnchecked="log"
    @onExpand="log"
    @onCollapse="log"
    @onContextMenu="log" />
</template>
<${S}>
return {
  items: ref(${files})
}
</${S}>`

// ---------------------------------------------------------------------------
// Showcase snippets (home page). Each node carries its own `icon` emoji, read
// back in the item-prepend-icon slot via {{ item.icon }}.
// ---------------------------------------------------------------------------

export const mediaLibrary = `<template>
  <vue3-tree-vue :items="items" @onSelect="log" @onExpand="log">
    <template #item-prepend-icon="item">
      <!-- Movies renders TWO custom icons via the slot; every other
           node falls back to its own single icon. -->
      <span v-if="item.name === 'Movies'">🎬🍿&nbsp;</span>
      <span v-else-if="item.icon">{{ item.icon }}&nbsp;</span>
    </template>
  </vue3-tree-vue>
</template>
<${S}>
return {
  items: ref([
    {
      name: 'Movies',
      icon: '🎬',
      expanded: true,
      children: [
        { name: 'Inception' },
        { name: 'The Matrix' },
        { name: 'Parasite' }
      ]
    },
    {
      name: 'Music',
      icon: '🎵',
      expanded: true,
      children: [
        {
          name: 'Jazz',
          icon: '🎷',
          expanded: true,
          children: [
            { name: 'Kind of Blue' },
            { name: 'A Love Supreme' }
          ]
        },
        {
          name: 'Classical',
          icon: '🎻',
          children: [
            { name: 'Moonlight Sonata' },
            { name: 'Clair de Lune' }
          ]
        },
        {
          name: 'Rock',
          icon: '🎸',
          children: [
            { name: 'Abbey Road' },
            { name: 'Nevermind' }
          ]
        }
      ]
    }
  ])
}
</${S}>`

export const pizzaBuilder = `<template>
  <vue3-tree-vue
    :items="items"
    isCheckable
    checkboxStyle="bootstrap-check"
    @onCheckedChanged="log">
    <template #item-prepend-icon="item">{{ item.icon }}&nbsp;</template>
  </vue3-tree-vue>
</template>
<${S}>
// Tick the boxes to build your (questionable) pizza.
return {
  items: ref([
    {
      name: 'Your Masterpiece 🍕',
      icon: '👨‍🍳',
      expanded: true,
      children: [
        {
          name: 'Cheeses',
          icon: '🧀',
          expanded: true,
          children: [
            { name: 'Mozzarella', icon: '🧀', checked: true },
            { name: 'Extra cheese (obviously)', icon: '🧀', checked: true },
            { name: 'Blue cheese (bold move)', icon: '🫕' }
          ]
        },
        {
          name: 'Toppings',
          icon: '🥬',
          expanded: true,
          children: [
            { name: 'Pepperoni', icon: '🍖', checked: true },
            { name: 'Mushrooms', icon: '🍄' },
            { name: 'Pineapple (starts wars)', icon: '🍍' },
            { name: 'Ghost peppers', icon: '🌶️' },
            { name: 'A single olive', icon: '🫒' }
          ]
        }
      ]
    }
  ])
}
</${S}>`

export const fileManager = `<template>
  <vue3-tree-vue :items="items" @dropValidator="canDrop">
    <template #item-prepend-icon="item">{{ item.icon }}&nbsp;</template>
  </vue3-tree-vue>
</template>
<${S}>
const canDrop = (dropped, host) => {
  const target = host ? host.name : 'root'
  log('dropValidator: ' + dropped.name + ' -> ' + target)

  // A read-only folder refuses any file dropped into it.
  if (host && host.readOnly) {
    log('  ✗ refused (' + host.name + ' is read-only)')
    return Promise.resolve(false)
  }
  log('  ✓ allowed')
  return Promise.resolve(true)
}
return {
  items: ref([
    {
      name: 'Documents',
      icon: '📁',
      expanded: true,
      children: [
        { name: 'Resume.pdf', icon: '📄' },
        { name: 'Budget.xlsx', icon: '📄' }
      ]
    },
    {
      name: 'Pictures',
      icon: '📁',
      expanded: true,
      children: [
        { name: 'beach.jpg', icon: '🖼️' },
        { name: 'sunset.png', icon: '🖼️' }
      ]
    },
    {
      name: 'Downloads',
      icon: '📁',
      expanded: true,
      children: [
        { name: 'installer.dmg', icon: '📦' },
        { name: 'playlist.mp3', icon: '🎵' }
      ]
    },
    {
      // Read-only folder that is fully locked:
      //  - readOnly           -> dropValidator refuses drops into it
      //  - disableDragAndDrop  -> the folder itself can't be moved anywhere
      //  - each child also sets disableDragAndDrop so its files can't move out
      name: 'Operating System Files (Read-only)',
      icon: '🔒',
      readOnly: true,
      disableDragAndDrop: true,
      expanded: true,
      children: [
        { name: 'kernel.sys', icon: '⚙️', disableDragAndDrop: true },
        { name: 'system.dll', icon: '⚙️', disableDragAndDrop: true }
      ]
    }
  ]),
  canDrop
}
</${S}>`

export const orgChart = `<template>
  <vue3-tree-vue :items="items" @onSelect="log">
    <template #item-prepend-icon="item">{{ item.icon }}&nbsp;</template>
  </vue3-tree-vue>
</template>
<${S}>
// Click anyone to "promote" them (well, to select them).
return {
  items: ref([
    {
      name: 'Reginald, Chief Vibes Officer',
      icon: '🦈',
      expanded: true,
      children: [
        {
          name: 'Head of Snacks',
          icon: '🧑‍🍳',
          expanded: true,
          children: [
            { name: 'Senior Coffee Engineer', icon: '☕' },
            { name: 'Junior Coffee Engineer', icon: '🫖' }
          ]
        },
        {
          name: 'Director of Naps',
          icon: '😴',
          children: [
            { name: 'The Office Cat (does nothing)', icon: '🐈' },
            { name: 'The Office Plant (does less)', icon: '🪴' }
          ]
        },
        { name: 'Intern (secretly runs everything)', icon: '🐣' }
      ]
    }
  ])
}
</${S}>`

export const contextMenu = `<template>
  <div>
    <vue3-tree-vue :items="items" @onContextMenu="onMenu" />
    <div
      v-if="menu.open"
      :style="{ position: 'fixed', top: menu.y + 'px', left: menu.x + 'px',
                background: '#fff', border: '1px solid #ccc', borderRadius: '6px',
                padding: '4px 0', boxShadow: '0 4px 14px rgba(0,0,0,.15)', zIndex: 50 }"
      @click="menu.open = false">
      <div style="padding: 4px 14px; cursor: pointer">Rename “{{ menu.name }}”</div>
      <div style="padding: 4px 14px; cursor: pointer">Delete “{{ menu.name }}”</div>
    </div>
  </div>
</template>
<${S}>
// @onContextMenu fires on right-click with { item, event }.
const menu = reactive({ open: false, x: 0, y: 0, name: '' })
const onMenu = ({ item, event }) => {
  menu.open = true
  menu.x = event.clientX
  menu.y = event.clientY
  menu.name = item.name
  log('context menu on ' + item.name)
}
return {
  items: ref(${files}),
  menu,
  onMenu
}
</${S}>`

export const contextMenuDemo = `<template>
  <div>
    <vue3-tree-vue :items="items" @onContextMenu="onMenu" />

    <div v-if="menu.open" class="demo-ctx" :style="{ top: menu.y + 'px', left: menu.x + 'px' }">
      <div class="demo-ctx__label">{{ menu.name }}</div>
      <div class="demo-ctx__item" @click="run('Open')">Open</div>
      <div class="demo-ctx__item" @click="run('Rename')">Rename</div>
      <div class="demo-ctx__item" @click="run('Duplicate')">Duplicate</div>
      <div class="demo-ctx__sep"></div>
      <div class="demo-ctx__item demo-ctx__item--danger" @click="run('Delete')">Delete</div>
    </div>
  </div>
</template>
<${S}>
const menu = reactive({ open: false, x: 0, y: 0, name: '' })

// onContextMenu fires on right-click with { item, event }.
const onMenu = ({ item, event }) => {
  menu.name = item.name
  menu.x = event.clientX
  menu.y = event.clientY
  menu.open = true
  log('menu opened for: ' + item.name)
}

const run = (action) => {
  log(action + ' -> ' + menu.name)
  menu.open = false
}

return {
  items: ref([
    {
      name: 'project',
      expanded: true,
      children: [
        {
          name: 'src',
          expanded: true,
          children: [
            { name: 'index.ts' },
            { name: 'App.vue' },
            { name: 'router.ts' }
          ]
        },
        { name: 'package.json' },
        { name: 'README.md' }
      ]
    }
  ]),
  menu,
  onMenu,
  run
}
</${S}>`
