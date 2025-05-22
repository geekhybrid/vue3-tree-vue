<template>
    <div class="vue3-tree-vue">
      <ul id="explorer" class="explorer tree-item-node-parent"
        :class="{'no-guide': hideGuideLines}"
        :draggable="onDropValidator != undefined"
        @dragover.stop.prevent
        @dragenter.stop.prevent
        @dragover.stop="addRootHoverClass($event, parent == null)"
        @dragleave.stop="removeRootHoverClass($event, parent == null)"
        @drop.prevent.stop="onDropNode(undefined, $event, onDropValidator, treeState); removeRootHoverClass($event, parent == null)">
        <li v-for="treeViewItem in internalItems" 
            :key="treeViewItem.id"
            :id="treeViewItem.id"
            class="tree-item-node"
            :class="{
                'tree-item-node-checkable': isCheckable,
            }"
            >
            <treeview-item class="pointer tree-view-item"
                :item="treeViewItem"
                :parent="parent"
                :hideGuideLines="hideGuideLines"
                @dragover.stop.prevent
                @dragenter.stop.prevent
                :draggable="onDropValidator != undefined"
                @dragstart.stop="onDragNode(treeViewItem, $event)"
                @dragleave.stop="removeHoverClass"
                @drop.prevent.stop="onDropNode(treeViewItem, $event, onDropValidator, treeState)"
                @dragover.stop="addHoverClass"
                :checkboxStyle="checkboxStyle"
                :isCheckable="isCheckable"
                :treeState="treeState"
                :lazyLoad="lazyLoad"
                @contextmenu.prevent="$emit('onContextMenu', { item: treeViewItem, event: $event })">
                <template v-slot:icon><slot name="item-prepend-icon" v-bind="treeViewItem"></slot></template>
                <template v-slot:prepend><slot name="item-prepend" v-bind="treeViewItem"></slot></template>
                <template v-slot:expander><slot name="item-expander" v-bind="treeViewItem"></slot></template>
                <template v-slot:name><slot name="item-name" v-bind="treeViewItem"></slot></template>
                <template v-slot:append><slot name="item-append" v-bind="treeViewItem"></slot></template>
            </treeview-item>
            <div class="node-child"
                :class="{'nested': parent != null, 'root': parent == undefined, 'hide': !treeViewItem.expanded, 'hide-guidelines': hideGuideLines }"
                v-if="treeViewItem.children && treeViewItem.children.length > 0">
                    <tree-view :items="treeViewItem.children"
                        :hideGuideLines="hideGuideLines"
                        :isNested="true"
                        @dropValidator="onDropValidator"
                        :lazyLoad="lazyLoad"
                        :checkboxStyle="checkboxStyle"
                        :parent="treeViewItem"
                        :isCheckable="isCheckable"
                        @onContextMenu="$emit('onContextMenu', $event)">
                        <template v-for="(_, slot) of $slots" v-slot:[slot]="props">
                            <slot :name="slot" v-bind="props"></slot>
                        </template>
                    </tree-view>
            </div>
        </li>
    </ul>
    <li style="list-style: none;">
        <slot v-if="parent" name="child-append" v-bind="parent"></slot>
    </li>
  </div>
</template>
<style src="./style.css" lang="css" />
<script src="./tree-component.ts" lang="ts" />   