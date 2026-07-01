# Guide Lines

The tree draws dashed guide lines connecting parents to their children. Set `hideGuideLines` to remove them for a cleaner look. Toggle the checkbox in the preview to compare.

<script setup>
import { guideLines } from '../snippets.js'
</script>

<LiveExample :code="guideLines" />

```vue
<vue3-tree-vue :items="items" :hideGuideLines="true" />
```

`hideGuideLines` defaults to `false`.
