# Item Styling

Style the tree at three levels: per-node classes via `styles`, checkbox classes via `checkboxStyle`, and the built-in `selected-tree-item` / `on-item-hover` classes.

<script setup>
import { itemStyling } from '../snippets.js'
</script>

## Per-node classes with `styles`

Give any node a `styles` array of CSS class names. They're applied to that node's row. Below, `bold-font` and a `fancy-checkbox` class are used (both defined in this site's CSS).

<LiveExample :code="itemStyling" />

```ts
{ name: 'Important', styles: ['bold-font', 'highlight'] }
```

```css
.bold-font { font-weight: 700; }
```

## Styling checkboxes with `checkboxStyle`

The `checkboxStyle` prop applies a class to every checkbox in the tree:

```vue
<vue3-tree-vue :items="items" isCheckable checkboxStyle="fancy-checkbox" />
```

```css
.fancy-checkbox { accent-color: #369870; width: 16px; height: 16px; }
```

## Built-in classes

| Class | Description |
| ----- | ----------- |
| `selected-tree-item` | Applied to the selected node in [selection mode](/guide/selection). Define it to highlight selection. |
| `on-item-hover` | Use inside the `item-append` / `child-append` [slots](/guide/slots) to reveal content only when the row is hovered. |

See the [Styling reference](/api/styling) for the full list.
