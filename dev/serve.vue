<script lang="ts">
import { defineComponent, ref } from 'vue';
import Vue3TreeVue from '@/tree-component.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3TreeVue
  },

  setup() {
    return {
      selectedItem: ref(),
      selectedItems: ref(),
      isCheckable: ref(false),
      items: [
        {
          name: 'Personal',
          id: 1,
          type: 'folder',
          children: [       
              {
                name: 'Items can be selected / Checked',
                id: 3,
                type: '.doc'
              }
          ]
        },
        {
          name: 'Public',
          id: 2,
          type: 'folder',
          children: [       
              {
                name: 'Vue.js Resume',
                id: 32,
                type: '.doc'
              },
              {
                name: '.Net Full Stack Resume',
                id: 34,
                type: '.doc'
              }
          ]
        }
      ]
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
      <vue3-tree-vue :items="items" :isCheckable="isCheckable" 
        v-model:selectedItem="selectedItem" v-model:selectedItems="selectedItems" style="width: 350px">
        <template v-slot:prepend-icon="treeViewItem" >
            <img src="./assets/folder.svg" alt="folder" 
                v-if="treeViewItem.type === 'folder'"
                height="20" width="20">

            <img src="./assets/word.svg"
                v-if="treeViewItem.type === '.doc'"
                height="20" width="20">
        </template>
      </vue3-tree-vue>
   </div>
  </div>
</template>
