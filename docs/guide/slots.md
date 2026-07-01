# Slots

The component exposes six named slots for customizing node rendering. Every slot is a scoped slot that receives the node's `TreeViewItem` as its slot props.

<script setup>
import {
  slotIcon, slotName, slotExpander, slotAppend, slotChildAppend
} from '../snippets.js'
</script>

| Slot | Where it renders |
| ---- | ---------------- |
| `item-prepend-icon` | An icon before the node label. |
| `item-prepend` | Content between the icon and the label. |
| `item-expander` | A custom expand/collapse control (replaces the chevron). |
| `item-name` | The node's label. |
| `item-append` | Content after the label (great for row actions). |
| `child-append` | Content at the bottom of a parent's list of children. |

## `item-prepend-icon`

Add an icon per node. The slot props are the item, so you can branch on its fields.

<LiveExample :code="slotIcon" />

## `item-name`

Fully control how the label renders.

<LiveExample :code="slotName" />

## `item-expander`

Replace the default chevron with your own indicator.

<LiveExample :code="slotExpander" />

## `item-append` (with `on-item-hover`)

Add trailing actions. Wrap them in the `on-item-hover` class to reveal them only while the row is hovered.

<LiveExample :code="slotAppend" console />

## `child-append`

Render content beneath a parent's children — for example an "Add item" button. The slot props are the **parent** item.

<LiveExample :code="slotChildAppend" />

::: tip
All slot examples above are editable — try changing the emoji, colors, or the condition that shows the button.
:::
