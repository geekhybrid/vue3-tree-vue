A Simple vue3 project for rendering items in a tree.

`npm i vue3-tree-vue`
## Handling Selected Items:

```html
<template>    
    <!-- Default makes items selectable (one at a time) -->
    <vue3-tree-vue :items="items" 
                   :isCheckable="false"
                   :hideGuideLines="false"
                   v-model:selectedItem="selectedItem">
      <!-- Applying some simple styling to tree-items -->
       <template v-slot:item-prepend-icon="treeViewItem" >
              <img src="./assets/folder.svg"
                   alt="folder"
                   v-if="treeViewItem.type === 'folder'"
                   height="20" width="20" />
       </template>
    </vue3-tree-vue>
</template>
```

![image](https://user-images.githubusercontent.com/39003759/144714401-f0c005d0-80e9-4288-aa7a-80b035145e77.png)

## Handling Checked Items

```ts
  setup() {
    const selectedItems = ref<TreeViewItem[]>([]);
    const items = ref<TreeViewItem[]>([]); // define your tree items here.
    
    return {
      selectedItems,
      items
    }
  }
```
```html
<template>
    <vue3-tree-vue :items="items" 
                   :isCheckable="true"
                   :hideGuideLines="false"
                   v-model:checkedItems="selectedItems"/>
</template>
```


![image](https://user-images.githubusercontent.com/39003759/144714480-b29d8483-6cbf-45ac-9a43-a0e5c7b5e138.png)


## Properties

| Property      | Default | Description |
| ----------- | ----------- |-------------
| items | Empty array      | An array of `TreeViewItem`.       |
| hideGuideLines | `false` | Determines the visibility of the guidelines
| selectedItem | `undefined`   | Defines the item that is selected on the tree
| checkedItems | An empty array | Defines the items that are checked on the tree
| isCheckable | `false` | Defines if items can be selected (one at a time) or selected (using a checkbox)
| expandedTypes | An empty array | Defines an array of strings. Each node which a `type` present in this array will be expanded by default.
| expandedIds | An empty array | Defines an array of strings. Each node which an `id` present in this array will be expanded by default.
| expandAll | false | If `true` all nodes in the tree will be expanded by default.

## Event Handlers
| Events      | Description |
| ----------- | -------------
| onSelect    | Callback function when an item is selected from the tree .Returns an `ItemEventArgs`.
| onCheck     | Callback function when an item is checked/unchecked from the tree. 

<blockquote> The `onCheck` event may be fired more than once to show the change in state of deep hierachies. </blockquote>

## Styles

| Class | Description |
| ----------- |-------------
| selected-tree-item | Defines the style for the `selectedItem`

## Slots
| Name | Description |
| ----------- |-------------
| item-prepend-icon | Defines the node's prepend icon.
| item-prepend | Defines a slot to house an content before the node's label. 