# Drag & Drop

Nodes are draggable out of the box. To control where drops are allowed, provide a `@dropValidator` callback. It receives the dragged item and the drop target (or `undefined` when dropping at the root) and returns a `Promise<boolean>` — resolve `true` to allow the drop, `false` to reject it.

<script setup>
import { dragDrop } from '../snippets.js'
</script>

<LiveExample :code="dragDrop" console />

## The validator callback

```ts
import type { TreeViewItem } from 'vue3-tree-vue'

const onBeforeDrop = (
  dropped: TreeViewItem,
  host: TreeViewItem | undefined // undefined === dropping at the root
): Promise<boolean> => {
  // Run any (possibly async) validation you like.
  return Promise.resolve(dropped !== host)
}
```

Because it returns a Promise, you can `await` an API call to decide server-side whether a move is permitted.

## Preventing drag on specific nodes

Set `disableDragAndDrop: true` on an item to make it non-draggable. See [Item Flags](/guide/item-flags).

```ts
{ name: 'Locked folder', disableDragAndDrop: true }
```
