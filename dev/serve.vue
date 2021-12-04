<script lang="ts">
import json from './tree.json';
import Vue3TreeVue from '@/tree-component.vue';
import { ref } from '@vue/reactivity';
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3TreeVue
  },

  setup() {
    const items = ref(json)
    return {
      selectedItem: ref(),
      selectedItems: ref(),
      isCheckable: ref(true),
      items
    }
  }
});
</script>

<template>
  <div id="app">
   <div style="display: block">
      <label>Use check items</label>
      <input type="checkbox" v-model="isCheckable" />
      <hr>
      <div style="display: flex">
        <vue3-tree-vue :items="items"
          :isCheckable="isCheckable"
          :hideGuideLines="false"
          v-model:selectedItem="selectedItem"
          v-model:checkedItems="selectedItems"
          style="width: 500px; display: block; border-right: 1px solid gray">
          <template v-slot:item-prepend-icon="treeViewItem" >
              <img src="./assets/folder.svg" alt="folder" 
                  v-if="treeViewItem.type === 'folder'"
                  height="20" width="20">

              <img src="./assets/word.svg"
                  v-if="treeViewItem.type === '.doc'"
                  height="20" width="20">

              <img src="./assets/excel.svg"
                  v-if="treeViewItem.type === '.excel'"
                  height="20" width="20">

                  
              <img src="./assets/playlist.svg"
                  v-if="treeViewItem.type === '.playlist'"
                  height="20" width="20">

              <img src="./assets/email.png"
                  v-if="treeViewItem.type === 'emails'"
                  height="20" width="20">
          </template>
        </vue3-tree-vue>

        <div style="max-width: 600px">
          <div style="margin: 0.4em">
            Selected Item {{ selectedItem?.name }}
          </div>
          <div style="margin: 0.4em">
            {{ selectedItems?.map(node => node.name) }}
          </div>
        </div>
      </div>
   </div>
  </div>
</template>
