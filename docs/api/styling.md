# Styling

The component ships a single stylesheet you must import once:

```ts
import 'vue3-tree-vue/dist/style.css'
```

All internal styles are namespaced under the `.vue3-tree-vue` root class to avoid clashing with your app.

## Public classes

These are the classes you're meant to target or use in your own markup:

| Class | Description |
| ----- | ----------- |
| `selected-tree-item` | Applied to the selected node in [selection mode](/guide/selection). Define it to highlight the selection. |
| `on-item-hover` | Use inside the `item-append` / `child-append` [slots](/guide/slots) to reveal content only while the node's row is hovered. |

```css
.selected-tree-item {
  background: #369870;
  color: #fff;
  border-radius: 4px;
}
```

## Per-node and checkbox classes

- **`styles`** on an item applies arbitrary classes to that node's row.
- **`checkboxStyle`** applies a class to every checkbox.

See [Item Styling](/guide/item-styling) for live examples.
