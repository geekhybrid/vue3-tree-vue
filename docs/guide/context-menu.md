# Context Menu

::: info New
The `@onContextMenu` event isn't in the original README — it's documented here for the first time.
:::

Right-clicking a node emits `@onContextMenu` with the node and the raw DOM event: `{ item, event }`. Use it to build your own right-click menus. Right-click a node in the preview to open a menu:

<script setup>
import { contextMenu } from '../snippets.js'
</script>

<LiveExample :code="contextMenu" console />

## Payload

```ts
const onContextMenu = ({ item, event }: { item: TreeViewItem; event: MouseEvent }) => {
  event // the native MouseEvent — has clientX / clientY for positioning
  item  // the TreeViewItem that was right-clicked
}
```

The component already calls `preventDefault()` on the native context-menu event, so the browser's default menu won't appear — you're free to render your own.

```vue
<vue3-tree-vue :items="items" @onContextMenu="onContextMenu" />
```
