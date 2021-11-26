<script lang="ts">
import { defineComponent } from 'vue';
import Vue3TreeVue from '@/tree-component.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    Vue3TreeVue
  },

  setup() {
    return {
      items: [
        {
          name: 'Personal',
          id: 1,
          type: 'folder',
          children: [       
              {
                name: 'V-Copa',
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
                name: 'V-Copa',
                id: 32,
                type: '.doc'
              },
              {
                name: 'M-Copa',
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
    <vue3-tree-vue :items="items" :isCheckable="true">
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
</template>
