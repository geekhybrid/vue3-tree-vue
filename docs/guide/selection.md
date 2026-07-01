# Selection

By default the tree is in **single-selection** mode: clicking a node selects it and emits `@onSelect` with that item. The selected node receives the `selected-tree-item` CSS class so you can style it.

<script setup>
import { selection } from '../snippets.js'
</script>

<LiveExample :code="selection" console />

## Styling the selected node

The component adds the `selected-tree-item` class to the selected row. Define it in your own CSS:

```css
.selected-tree-item {
  background: #369870;
  color: #fff;
  border-radius: 4px;
}
```

## Notes

- Selection mode and [checkable mode](/guide/checkable) are mutually exclusive — set `isCheckable` for checkboxes instead.
- The `selected` flag also lives on the item, so you can pre-select a node by setting `selected: true` in your data.
- [Disabled items](/guide/item-flags) can neither be selected nor checked.
