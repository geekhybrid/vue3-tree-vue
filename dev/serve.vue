<script lang="ts">
import json from './tree.json';
import Vue3TreeVue from '@/tree-component.vue';
import { ref } from '@vue/reactivity';
import { defineComponent } from '@vue/runtime-core';
import '@/style.css';
import { TreeViewItem } from '@/types';

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3TreeVue
  },

  setup() {
    const items = ref(json)

    const onItemChecked = (checkedItems: TreeViewItem[]) => console.table(checkedItems);
    const onItemSelected = (item: TreeViewItem) => console.log(item);

    return {
      isCheckable: ref(true),
      items,
      onItemChecked,
      onItemSelected
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
          :lazy-load="true"
          @onSelect="onItemSelected"
          @onCheck="onItemChecked"
          :expandAll="true"
          style="width: 800px; display: block; border-right: 1px solid gray">
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
      </div>
   </div>
  </div>
</template>

<style scoped>
* {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
}
</style>
