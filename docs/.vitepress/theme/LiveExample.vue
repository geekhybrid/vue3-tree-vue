<script setup lang="ts">
import { ref, shallowRef, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { buildPreview } from './compile'

const props = withDefaults(
  defineProps<{
    /** The initial editable snippet (template + script). */
    code: string
    /** Show the event console panel below the preview. */
    console?: boolean
    /** Editor height in px. */
    height?: number
    /** Use a Visual / Code tab layout instead of the side-by-side split. */
    tabs?: boolean
    /** Which tab is active first when `tabs` is on. */
    defaultTab?: 'visual' | 'code'
    /** Optional short caption shown in the bar. */
    title?: string
  }>(),
  { console: false, height: 220, tabs: false, defaultTab: 'visual', title: '' }
)

const activeTab = ref<'visual' | 'code'>(props.defaultTab)
const src = ref(props.code.trim())
const previewComp = shallowRef<any>(null)
const error = ref<string | null>(null)
const logs = ref<string[]>([])
const copied = ref(false)
const editorEl = ref<HTMLDivElement | null>(null)

let view: any = null
let timer: any = null

function log(...args: any[]) {
  const line = args
    .map((a) => {
      if (a instanceof Event) return `[${a.type} event]`
      try {
        return typeof a === 'string' ? a : JSON.stringify(a, replacer, 0)
      } catch {
        return String(a)
      }
    })
    .join(' ')
  logs.value = [...logs.value.slice(-40), line]
}

// Avoid dumping huge reactive children arrays / circular refs into the console.
function replacer(key: string, value: any) {
  if (key === 'children' && Array.isArray(value)) return `[${value.length} children]`
  return value
}

function rebuild() {
  try {
    previewComp.value = buildPreview(src.value, log)
    error.value = null
  } catch (e: any) {
    error.value = e?.message ?? String(e)
  }
}

function scheduleRebuild() {
  clearTimeout(timer)
  timer = setTimeout(rebuild, 300)
}

async function copy() {
  try {
    await navigator.clipboard.writeText(toFullSfc(src.value))
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch {
    /* clipboard unavailable */
  }
}

function reset() {
  src.value = props.code.trim()
  if (view) {
    view.dispatch({
      changes: { from: 0, to: view.state.doc.length, insert: src.value }
    })
  }
  logs.value = []
  rebuild()
}

async function switchTab(tab: 'visual' | 'code') {
  activeTab.value = tab
  // CodeMirror mounts while hidden in tab mode; re-measure when it's revealed.
  if (tab === 'code') {
    await nextTick()
    view?.requestMeasure()
  }
}

// Assemble a real, copy-pasteable SFC from the snippet.
function toFullSfc(snippet: string): string {
  const t = snippet.match(/<template>([\s\S]*)<\/template>/i)
  const s = snippet.match(/<script[^>]*>([\s\S]*?)<\/script>/i)
  const template = (t ? t[1] : snippet).trim()
  const body = (s ? s[1] : 'return {}').trim()
  return (
    `<script>\n` +
    `import Vue3TreeVue from 'vue3-tree-vue'\n` +
    `import 'vue3-tree-vue/dist/style.css'\n` +
    `import { ref, reactive, computed, watch } from 'vue'\n\n` +
    `export default {\n` +
    `  components: { Vue3TreeVue },\n` +
    `  setup() {\n` +
    body.replace(/^/gm, '    ') +
    `\n  }\n` +
    `}\n` +
    `<\/script>\n\n` +
    `<template>\n` +
    template.replace(/^/gm, '  ') +
    `\n<\/template>\n`
  )
}

onMounted(async () => {
  rebuild()
  // CodeMirror is browser-only — load it after mount so SSR builds succeed.
  const [{ EditorView, basicSetup }, { html }] = await Promise.all([
    import('codemirror'),
    import('@codemirror/lang-html')
  ])
  const { EditorState } = await import('@codemirror/state')

  const updateListener = EditorView.updateListener.of((v: any) => {
    if (v.docChanged) {
      src.value = v.state.doc.toString()
      scheduleRebuild()
    }
  })

  view = new EditorView({
    parent: editorEl.value!,
    state: EditorState.create({
      doc: src.value,
      extensions: [
        basicSetup,
        html(),
        updateListener,
        EditorView.lineWrapping,
        EditorView.theme({
          '&': {
            height: props.height + 'px',
            fontSize: '13px',
            backgroundColor: 'transparent'
          },
          // Apply the mono font to every text-bearing layer — CodeMirror sets
          // its own `monospace` on .cm-content/.cm-gutters otherwise.
          '.cm-scroller': {
            overflow: 'auto',
            fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace",
            lineHeight: '1.7'
          },
          '.cm-content': {
            fontFamily: 'inherit',
            padding: '10px 0'
          },
          '.cm-gutters': {
            fontFamily: 'inherit',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--vp-c-text-3)'
          },
          '.cm-activeLine, .cm-activeLineGutter': {
            backgroundColor: 'var(--vp-c-bg-soft)'
          },
          '.cm-lineNumbers .cm-gutterElement': { padding: '0 6px 0 12px' }
        })
      ]
    })
  })
})

onBeforeUnmount(() => {
  clearTimeout(timer)
  view?.destroy()
})

watch(() => props.code, reset)
</script>

<template>
  <div class="live-example" :class="{ 'live-example--tabs': tabs }">
    <div class="live-example__bar">
      <span v-if="tabs" class="live-example__tablist">
        <button
          type="button"
          class="live-example__tab"
          :class="{ 'is-active': activeTab === 'visual' }"
          @click="switchTab('visual')">Visual</button>
        <button
          type="button"
          class="live-example__tab"
          :class="{ 'is-active': activeTab === 'code' }"
          @click="switchTab('code')">Code</button>
        <span v-if="title" class="live-example__title">{{ title }}</span>
      </span>
      <span v-else class="live-example__label">
        {{ title || 'Editable — change the code, see it live' }}
      </span>
      <span class="live-example__actions">
        <button type="button" @click="reset">Reset</button>
        <button type="button" @click="copy">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2.2" stroke-linecap="round"
               stroke-linejoin="round" aria-hidden="true">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          {{ copied ? 'Copied!' : 'Copy Code' }}
        </button>
      </span>
    </div>

    <div :class="tabs ? 'live-example__stack' : 'live-example__grid'">
      <div
        v-show="!tabs || activeTab === 'code'"
        ref="editorEl"
        class="live-example__editor"
        :style="{ minHeight: height + 'px' }" />

      <div
        v-show="!tabs || activeTab === 'visual'"
        class="live-example__preview"
        :style="tabs ? { minHeight: height + 'px' } : {}">
        <ClientOnly>
          <div v-if="error" class="live-example__error">{{ error }}</div>
          <component :is="previewComp" v-else-if="previewComp" />
        </ClientOnly>
      </div>
    </div>

    <div v-if="console" class="live-example__console">
      <div class="live-example__console-head">
        <span class="live-example__console-tab">Event console</span>
        <button type="button" @click="logs = []">Clear</button>
      </div>
      <div v-if="logs.length" class="live-example__console-body">
        <code v-for="(l, i) in logs" :key="i">{{ l }}</code>
      </div>
      <div v-else class="live-example__console-empty">Interact with the tree to see emitted events…</div>
    </div>
  </div>
</template>

<style scoped>
.live-example {
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  margin: 18px 0;
  background: var(--vp-c-bg);
}
.live-example__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background: transparent;
  border-bottom: 1px solid var(--vp-c-divider);
  font-size: 12px;
}
.live-example__label {
  color: var(--vp-c-text-2);
  padding: 8px 0;
}
.live-example__tablist {
  display: flex;
  align-items: stretch;
  gap: 20px;
}
/* Standard underline tabs (no button/pill styling). */
.live-example__tab {
  font-size: 13px;
  padding: 10px 1px;
  border: none;
  background: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px; /* sit the underline on the bar's bottom border */
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-weight: 500;
  transition: color 0.2s, border-color 0.2s;
}
.live-example__tab:hover {
  color: var(--vp-c-text-1);
}
.live-example__tab.is-active {
  color: var(--vp-c-brand-1);
  border-bottom-color: var(--vp-c-brand-1);
}
.live-example__title {
  margin-left: 8px;
  font-size: 12px;
  color: var(--vp-c-text-3);
}
.live-example__stack .live-example__editor {
  border-right: none;
}
.live-example__actions button {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-left: 8px;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
}
.live-example__actions button svg {
  opacity: 0.8;
}
.live-example__actions button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}
.live-example__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 720px) {
  .live-example__grid {
    grid-template-columns: 1fr;
  }
}
.live-example__editor {
  border-right: 1px solid var(--vp-c-divider);
  overflow: hidden;
}
@media (max-width: 720px) {
  .live-example__editor {
    border-right: none;
    border-bottom: 1px solid var(--vp-c-divider);
  }
}
.live-example__preview {
  padding: 14px 16px;
  overflow: auto;
  background: var(--vp-c-bg);
}
.live-example__error {
  color: var(--vp-c-danger-1, #d33);
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  white-space: pre-wrap;
}
.live-example__console {
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  font-size: 12px;
}
.live-example__console-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}
/* "Event console" styled as an underline tab, mirroring the top tabs. */
.live-example__console-tab {
  padding: 9px 2px;
  margin-bottom: -1px;
  color: var(--vp-c-brand-1);
  font-weight: 500;
  font-size: 13px;
  border-bottom: 2px solid var(--vp-c-brand-1);
}
.live-example__console-head button {
  font-size: 12px;
  background: none;
  border: none;
  color: var(--vp-c-brand-1);
  cursor: pointer;
}
.live-example__console-body {
  margin: 0;
  padding: 8px 12px 10px;
  max-height: 150px;
  overflow: auto;
}
.live-example__console-body code {
  display: block;
  padding: 1px 0;
  background: transparent;
  border: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  white-space: pre-wrap;
  word-break: break-word;
}
.live-example__console-empty {
  padding: 8px 12px 10px;
  color: var(--vp-c-text-3);
}
</style>
