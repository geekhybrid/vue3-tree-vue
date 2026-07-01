# Item Flags

Individual nodes accept a handful of boolean flags that change their behavior. Mix and match them per item.

<script setup>
import { itemFlags } from '../snippets.js'
</script>

<LiveExample :code="itemFlags" />

## Available flags

| Flag | Effect |
| ---- | ------ |
| `disabled` | The node can neither be selected nor checked; it renders muted. |
| `disableDragAndDrop` | The node cannot be dragged (see [Drag & Drop](/guide/drag-and-drop)). |
| `collapsible` | When `false`, the node's children are always visible and the expander is hidden. |
| `expanded` | Controls open/closed state; can be set [programmatically](/guide/expand-collapse). |
| `checked` | Initial checkbox state in [checkable mode](/guide/checkable). |
| `selected` | Marks the node as selected in selection mode. |

## Other item fields

| Field | Purpose |
| ----- | ------- |
| `id` | A stable `string \| number` identifier. Auto-generated if omitted — provide your own when you need to reference nodes. |
| `meta` | Arbitrary data (`any`) you can attach to a node and read back in event handlers or slots. |
| `styles` | An array of CSS class names applied to the node — see [Item Styling](/guide/item-styling). |

See the complete [`TreeViewItem` type](/api/types).
