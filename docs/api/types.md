# Types

TypeScript types exported from `vue3-tree-vue`.

## `TreeViewItem`

The shape of every node in the tree.

```ts
export interface TreeViewItem {
  name: string                 // Display label (required)
  id?: string | number         // Stable id — auto-generated (UUID) if omitted
  children?: TreeViewItem[]     // Child nodes; presence makes this a branch
  checked?: boolean            // Checkbox state (checkable mode)
  selected?: boolean           // Selection state (selection mode)
  expanded?: boolean           // Open/closed state — reactive & programmatic
  disabled?: boolean           // Cannot be selected or checked
  disableDragAndDrop?: boolean // Cannot be dragged
  collapsible?: boolean        // When false, children are always visible
  styles?: string[]            // CSS class names applied to the node
  meta?: any                   // Arbitrary per-node data
}
```

See [Item Flags](/guide/item-flags) for how each field behaves.

## `IsValidDropCallback`

The signature of the [`dropValidator`](/guide/drag-and-drop) callback.

```ts
export type IsValidDropCallback = (
  droppedItem: TreeViewItem,
  dropHost: TreeViewItem | undefined // undefined === dropping at the root
) => Promise<boolean>              // resolve true to allow, false to reject
```

## Importing

```ts
import Vue3TreeVue from 'vue3-tree-vue'
import type { TreeViewItem, IsValidDropCallback } from 'vue3-tree-vue'
import 'vue3-tree-vue/dist/style.css'
```
