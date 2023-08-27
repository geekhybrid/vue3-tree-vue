A Simple vue3 project for rendering items in a tree.

`npm i vue3-tree-vue`


```html
<template>    
    <vue3-tree-vue :items="items" 
                   :isCheckable="false"  //Set to true if you want to get checkable items
                   :hideGuideLines="false"
                   @onCheck="onItemChecked" 
                   @onSelect="onItemSelected"
                   >
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
```ts
  setup() {
    const onItemChecked = (checkedItems: TreeViewItem[]) => console.log(checkedItems);
    const onItemSelected = (item: TreeViewItem) => console.log(item);
    const items = ref<TreeViewItem[]>([]); // define your tree items here.
    
    return {
      onItemChecked,
      onItemSelected,
      items
    }
  }
```

![image](https://user-images.githubusercontent.com/39003759/144714401-f0c005d0-80e9-4288-aa7a-80b035145e77.png)



![image](https://user-images.githubusercontent.com/39003759/144714480-b29d8483-6cbf-45ac-9a43-a0e5c7b5e138.png)


## Properties

| Property      | Default | Description |
| ----------- | ----------- |-------------
| items | Empty array      | An array of `TreeViewItem`.       |
| hideGuideLines | `false` | Determines the visibility of the guidelines
| isCheckable | `false` | Defines if items can be selected (one at a time) or selected (using a checkbox)
| checkboxStyle | undefined | Defines the style to be applied to the checkboxes on the tree.

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
| item-expander | Defines a slot to house an content for the expander. 