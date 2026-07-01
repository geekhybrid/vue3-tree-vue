# Events

Events emitted by the `vue3-tree-vue` component. Try them interactively on the [Events guide](/guide/events).

| Event | Payload | Description |
| ----- | ------- | ----------- |
| `@onSelect` | `TreeViewItem` | A node was selected (selection mode only). |
| `@onCheck` | `TreeViewItem[]` | Emits **all** currently checked nodes. May fire multiple times per interaction as deep hierarchies settle. |
| `@onCheckedChanged` | `TreeViewItem` | A specific node was checked. |
| `@onUnchecked` | `TreeViewItem` | A specific node was unchecked. |
| `@onExpand` | `TreeViewItem` | A node was expanded (used for [lazy loading](/guide/lazy-loading)). |
| `@onCollapse` | `TreeViewItem` | A node was collapsed. |
| `@onContextMenu` | `{ item: TreeViewItem, event: MouseEvent }` | A node was right-clicked. See [Context Menu](/guide/context-menu). |
| `@dropValidator` | `(dropped, host) => Promise<boolean>` | Callback to allow/reject a drop. See [Drag & Drop](/guide/drag-and-drop). |

## Signatures

```ts
import type { TreeViewItem } from 'vue3-tree-vue'

function onSelect(item: TreeViewItem): void
function onCheck(checkedItems: TreeViewItem[]): void
function onCheckedChanged(item: TreeViewItem): void
function onUnchecked(item: TreeViewItem): void
function onExpand(item: TreeViewItem): void
function onCollapse(item: TreeViewItem): void
function onContextMenu(payload: { item: TreeViewItem; event: MouseEvent }): void
```

::: tip
`@onContextMenu` is not covered by the original README — it's fully documented under [Context Menu](/guide/context-menu).
:::
