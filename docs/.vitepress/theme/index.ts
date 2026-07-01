import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import LiveExample from './LiveExample.vue'

// The tree component's stylesheet, imported from source by relative path.
// Applied globally so every live preview is styled.
import '../../../src/style.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LiveExample', LiveExample)
  }
} satisfies Theme
