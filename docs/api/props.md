# Props

Props accepted by the `vue3-tree-vue` component.

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `items` | `TreeViewItem[]` | `[]` (required) | The tree data. See [`TreeViewItem`](/api/types). |
| `isCheckable` | `boolean` | `false` | Render checkboxes instead of single-selection. See [Checkable Items](/guide/checkable). |
| `hideGuideLines` | `boolean` | `false` | Hide the dashed parent→child guide lines. See [Guide Lines](/guide/guide-lines). |
| `lazyLoad` | `boolean` | `false` | Show an expander on every node so children can be loaded on demand. See [Lazy Loading](/guide/lazy-loading). |
| `checkboxStyle` | `string` | `undefined` | CSS class name applied to every checkbox. See [Item Styling](/guide/item-styling). |
| `dropValidator` | `IsValidDropCallback` | `undefined` | Async callback validating drag & drop. Bound as `@dropValidator`. See [Drag & Drop](/guide/drag-and-drop). |

::: details Advanced / internal
| Prop | Type | Description |
| ---- | ---- | ----------- |
| `treeState` | `TreeState` | Internal shared state object. Normally provided automatically via `provide`/`inject`; you rarely set this yourself. |

The `dropValidator` callback is also accepted internally as the `onDropValidator` prop; use the `@dropValidator` event binding shown in the [Drag & Drop guide](/guide/drag-and-drop).
:::

## Related

- [Events](/api/events)
- [Slots](/api/slots)
- [Types](/api/types)
