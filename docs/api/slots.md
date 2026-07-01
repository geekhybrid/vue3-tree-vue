# Slots

Every slot is a **scoped** slot and receives the node's `TreeViewItem` as its slot props. See live examples on the [Slots guide](/guide/slots).

| Slot | Slot props | Description |
| ---- | ---------- | ----------- |
| `item-prepend-icon` | `TreeViewItem` | Icon rendered before the label. |
| `item-prepend` | `TreeViewItem` | Content between the icon and the label. |
| `item-expander` | `TreeViewItem` | Custom expand/collapse control (replaces the default chevron). |
| `item-name` | `TreeViewItem` | The node's label. |
| `item-append` | `TreeViewItem` | Content after the label — typically row actions. |
| `child-append` | `TreeViewItem` (the **parent**) | Content rendered at the bottom of a parent's children. |

## Usage

```vue
<vue3-tree-vue :items="items">
  <template #item-prepend-icon="item">
    <span v-if="item.children">📁</span>
    <span v-else>📄</span>
  </template>

  <template #item-append="item">
    <span class="on-item-hover">
      <button @click.stop="edit(item)">Edit</button>
    </span>
  </template>
</vue3-tree-vue>
```

The `on-item-hover` class reveals content only while the row is hovered — see [Styling](/api/styling).
