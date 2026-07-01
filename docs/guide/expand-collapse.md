# Expand & Collapse

Any node with `children` shows an expander. Expansion state is driven by the item's `expanded` flag, which means you can control it **programmatically** — set `expanded` on your data and the tree reacts. Expanding and collapsing emit `@onExpand` and `@onCollapse`.

<script setup>
import { expandCollapse } from '../snippets.js'
</script>

<LiveExample :code="expandCollapse" console />

## Programmatic control

Because `expanded` is just a reactive property on each item, you can drive the tree from your own code — the "Collapse all" / "Expand all" buttons above simply walk the tree and toggle `expanded`. Setting it programmatically still fires the `onExpand` / `onCollapse` events.

```ts
// collapse everything
const walk = (nodes, fn) => nodes.forEach(n => {
  fn(n)
  if (n.children) walk(n.children, fn)
})
walk(items.value, n => (n.expanded = false))
```

## Non-collapsible nodes

Set `collapsible: false` on an item to keep its children permanently visible (the expander is hidden). See [Item Flags](/guide/item-flags).

## Related

- [Lazy Loading](/guide/lazy-loading) uses `@onExpand` to fetch children on demand.
