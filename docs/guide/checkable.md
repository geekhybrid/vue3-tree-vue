# Checkable Items

Set `isCheckable` to render a checkbox on every node. Checking a parent cascades down to its children, and a parent whose children are only partially checked automatically shows an **indeterminate** (tri-state) checkbox.

<script setup>
import { checkable, checkablePreset } from '../snippets.js'
</script>

<LiveExample :code="checkable" console />

## Pre-checked and disabled items

Set `checked: true` to start a node checked, or `disabled: true` to make it non-interactive.

<LiveExample :code="checkablePreset" console />

## Which event should I use?

The component emits three check-related events — pick based on what you need:

| Event | Payload | Use when |
| ----- | ------- | -------- |
| `@onCheck` | `TreeViewItem[]` — **all** currently checked nodes | You want the full checked set (may fire multiple times as cascades settle). |
| `@onCheckedChanged` | `TreeViewItem` — the single toggled node | You want to react to one node being checked. |
| `@onUnchecked` | `TreeViewItem` — the single unchecked node | You specifically want to know when a node is unchecked. |

::: tip
`onCheck` may fire more than once for a single click while the change propagates through deep hierarchies. If you only care about individual nodes, prefer `onCheckedChanged` / `onUnchecked`.
:::

See the full list on the [Events reference](/api/events) or try them all on the [Events guide](/guide/events).
