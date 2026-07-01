# Lazy Loading

Set `lazyLoad` to render an expander on **every** node, even those without loaded children yet. Then populate `children` inside the `@onExpand` handler — ideal for large trees or data fetched from an API.

<script setup>
import { lazyLoad } from '../snippets.js'
</script>

Expand **Remote folder A** or **B** — the demo simulates a 1.2s API call and shows a spinner on the folder row while it loads.

<LiveExample :code="lazyLoad" console />

## How it works

1. `lazyLoad` forces every node to display an expander (normally only nodes with children get one).
2. When the user expands a node, `@onExpand` fires with that item.
3. In the handler, fetch the children and push them onto `item.children`. The tree re-renders reactively.

```ts
const onExpand = async (item) => {
  if (item.children?.length || item.loading) return // fetch once
  item.loading = true
  const kids = await fetchChildrenFromApi(item.id)
  item.children.push(...kids)
  item.loading = false
}
```

## Showing a loader

Track a `loading` flag on the item and render a spinner through the [`item-append`](/guide/slots) slot while the fetch is in flight:

```vue
<vue3-tree-vue :items="items" lazyLoad @onExpand="onExpand">
  <template #item-append="item">
    <span v-if="item.loading" class="tree-loader">
      <span class="tree-spinner"></span> Loading…
    </span>
  </template>
</vue3-tree-vue>
```

::: tip
Guard against re-fetching by checking whether `children` is already populated (or a fetch is in flight), as shown above.
:::
