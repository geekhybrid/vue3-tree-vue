<script lang="ts">
import json from './tree.json';
import Vue3TreeVue from '@/tree-component.vue';
import { ref } from '@vue/reactivity';
import { defineComponent } from '@vue/runtime-core';
import '@/style.css';
import { ItemEventArgs } from '@/types';

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3TreeVue
  },

  setup() {
    const items = ref(json)

    const onItemChecked = (arg: ItemEventArgs) => console.log(arg.item.name, arg.change);
    const onItemSelected = (arg: ItemEventArgs) => console.log(arg.item.name);

    return {
      selectedItem: ref(),
      selectedItems: ref(),
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
          v-model:selectedItem="selectedItem"
          v-model:checkedItems="selectedItems"
          @onSelect="onItemSelected"
          @onCheck="onItemChecked"
          :expandAll="true"
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
          <template v-slot:item-expander="item">
            <div class="d-flex" style="display: flex; justify-content: center; vertical-align: center; justify-items: center; align-items: center; margin-right: 10px;" :style="{background: item.type == 'folder' ? 'blue' : 'red', height: '14px', width: '14px', 'margin-right': '0.2em', 'border-radius': '4px'}">
              <span style="color: white;">-</span>
            </div>
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

<style scoped>
* {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 14px;
}
</style>
