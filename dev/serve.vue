<script lang="ts">
import { defineComponent } from 'vue';
import Vue3TreeVue from '@/vue3-tree-vue.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3TreeVue
  }
});
</script>

<template>
  <div id="app">
    <vue3-tree-vue />
  </div>
</template>
