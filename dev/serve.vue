<script lang="ts">
import json from './tree.json';
import Vue3TreeVue from '@/tree-component.vue';
import { ref } from '@vue/reactivity';
import { defineComponent } from '@vue/runtime-core';
import { TreeViewItem, IsValidDropCallback } from '@/types';

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3TreeVue
  },

  setup() {
    const items = ref(json)

    const onItemChecked = (checkedItems: TreeViewItem[]) => console.table(checkedItems);
    const onItemSelected = (item: TreeViewItem) => console.log(item);
  
    const makeApiCallToSeeIfDropIsValid: IsValidDropCallback = async (_source, _destination) => {
      await fetch('www.wikipedia.com').then(() => true);
      return true;
    }
  
    return {
      isCheckable: ref(true),
      hideGuidelines: ref(false),
      items,
      onItemChecked,
      onItemSelected,
      makeApiCallToSeeIfDropIsValid
    }
  }
});
</script>

<template>
  <div id="app">
   <div style="display: block">
    <span>
      <label>Use check items</label>
      <input type="checkbox" v-model="isCheckable" />

    </span>
    &nbsp;
    <span>
      <label>Hide Guidelines</label>
      <input type="checkbox" v-model="hideGuidelines" />
    </span>
      <button @click="items.forEach(item => item.expanded = false)">Collapse all</button>
      <hr>
      <div style="display: flex">
        <vue3-tree-vue :items="items"
          :isCheckable="isCheckable"
          :hideGuideLines="hideGuidelines"
          :lazy-load="false"
          @dropValidator="makeApiCallToSeeIfDropIsValid"
          @onSelect="onItemSelected"
          @onCheck="onItemChecked"
          style="width: 800px; display: block; border-right: 1px solid gray;">
          <template v-slot:item-expander="item">
            <span> {{  item.expanded ? '-' : '+' }}</span>
          </template>
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

          <template v-slot:item-append="treeViewItem">
              <span class="on-item-hover" v-if="treeViewItem.type === 'emails'"><button title="New Email"> item-append</button></span>
          </template>

          <template v-slot:child-append="treeViewItem">
            <span  v-if="treeViewItem.id === 6">
              <button>child-append for Unsolved Problems</button>
            </span>
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

button {
    background: none;
    border: 1px dashed blue;
    border-radius:  4px;
    color: blue;
    cursor: pointer;
}
</style>
