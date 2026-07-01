// Turns an editable, SFC-like snippet string into a live Vue component.
//
// The snippet is split into a <template> block and a <script> block. The
// template is compiled to a render function with @vue/compiler-dom, and the
// script is treated as the *body of setup()* (it must `return { ... }`).
//
// Everything runs against the app's own `vue` runtime and the library aliased
// from ../../src, so there is a single Vue instance and provide/inject inside
// the tree works correctly.
import * as Vue from 'vue'
import { compile } from '@vue/compiler-dom'
import Vue3TreeVue from 'vue3-tree-vue'

const { ref, reactive, computed, watch, defineComponent } = Vue

export interface ParsedSnippet {
  template: string
  script: string
}

export function parseSnippet(code: string): ParsedSnippet {
  // Greedy to the LAST </template> so nested slot <template #...> blocks are
  // kept inside the outer template rather than truncating at the first close.
  const templateMatch = code.match(/<template>([\s\S]*)<\/template>/i)
  const scriptMatch = code.match(/<script[^>]*>([\s\S]*?)<\/script>/i)
  return {
    template: (templateMatch ? templateMatch[1] : code).trim(),
    script: (scriptMatch ? scriptMatch[1] : 'return {}').trim()
  }
}

/**
 * Build a renderable component from a snippet.
 * @param code   the editable snippet
 * @param log    a sink for event handlers (snippets can call `log(...)`)
 * Throws on template compile / script eval errors — callers should catch and
 * surface the message.
 */
export function buildPreview(code: string, log: (...args: any[]) => void) {
  const { template, script } = parseSnippet(code)

  // Compile the template to a standalone render function.
  const { code: renderCode } = compile(template, { mode: 'function' })
  const render = new Function('Vue', renderCode)(Vue)

  // Strip any import lines so authentic-looking SFC snippets still evaluate.
  const setupBody = script.replace(/^\s*import\s.+$/gm, '')

  return defineComponent({
    name: 'LivePreview',
    components: { 'vue3-tree-vue': Vue3TreeVue },
    setup() {
      const factory = new Function(
        'ref',
        'reactive',
        'computed',
        'watch',
        'log',
        setupBody
      )
      const state = factory(ref, reactive, computed, watch, log)
      // `log` is always exposed to the template so snippets can bind
      // handlers like @onSelect="log" without redefining it.
      return { log, ...(state && typeof state === 'object' ? state : {}) }
    },
    render
  })
}
