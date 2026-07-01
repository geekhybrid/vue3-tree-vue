# Events

The tree emits an event for every meaningful interaction. The example below wires up **all** of them — interact with the tree and watch the event console.

<script setup>
import { events } from '../snippets.js'
</script>

<LiveExample :code="events" :height="260" console />

## All events

| Event | Payload | Fired when |
| ----- | ------- | ---------- |
| `@onSelect` | `TreeViewItem` | A node is selected (selection mode). |
| `@onCheck` | `TreeViewItem[]` | Any checkbox changes — emits **all** checked nodes. May fire multiple times per click. |
| `@onCheckedChanged` | `TreeViewItem` | A specific node is checked. |
| `@onUnchecked` | `TreeViewItem` | A specific node is unchecked. |
| `@onExpand` | `TreeViewItem` | A node is expanded (use for [lazy loading](/guide/lazy-loading)). |
| `@onCollapse` | `TreeViewItem` | A node is collapsed. |
| `@onContextMenu` | `{ item, event }` | A node is right-clicked (see [Context Menu](/guide/context-menu)). |

## Check events, compared

- **`@onCheck`** gives you the entire checked set — convenient when you mirror the selection elsewhere. It can fire several times as a cascade settles through deep hierarchies.
- **`@onCheckedChanged`** and **`@onUnchecked`** report a single node each, which is usually what you want for per-item logic.

See the [Events API reference](/api/events) for the full signatures.
