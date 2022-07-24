<template>
    <ul>
        <li v-for="treeViewItem in items" 
            :key="treeViewItem.id" 
            :id="treeViewItem.id"
            draggable
            @dragover.stop.prevent
            @dragenter.stop.prevent
            @dragstart.stop="onDragTreeItem(treeViewItem, $event)"
            @drop.prevent.stop="onDropTreeItem(treeViewItem, $event, onDropValidator)"
        >

            <div class="tree__tree-item">
                <TreeItem
                    :item="treeViewItem"
                    :parent="parent"
                    :isCheckable="isCheckable"
                    :selectedItem="selectedItem"
                    :treeState="treeState"
                    @contextmenu.prevent="$emit('onContextMenu', { item: treeViewItem, event: $event })"
                >
                    <template v-slot:icon>
                        <slot name="item-prepend-icon" v-bind="treeViewItem"></slot>
                    </template>
                    <template v-slot:prepend>
                        <slot name="item-prepend" v-bind="treeViewItem"></slot>
                    </template>
                </TreeItem>
            </div>
            
            
            <div class="tree-item__children tree-item__children--hidden"
                :class="{'tree-item--guidelines-hidden': hideGuideLines}"
                v-if="treeViewItem.children && treeViewItem.children.length > 0"
            >
                <TreeView :items="treeViewItem.children"
                    :hideGuideLines="hideGuideLines"
                    :isNested="true"
                    :parent="treeViewItem"
                    :selectedItem="selectedItem"
                    :checkedItems="checkedItems"
                    :treeState="treeState"
                    :isCheckable="isCheckable"
                    @onContextMenu="$emit('onContextMenu', $event)"
                >
                    <template v-for="(_, slot) of $slots" v-slot:[slot]="props">
                        <slot :name="slot" v-bind="props" />
                    </template>
                </TreeView>
            </div>
        </li>
    </ul>
</template>
<script src="./tree-component.ts" lang="ts" />   