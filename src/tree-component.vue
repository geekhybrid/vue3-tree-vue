<template>
    <ul id="explorer" class="explorer tree-item-node-parent">
        <li v-for="treeViewItem in items" 
            :key="treeViewItem.id" 
            :id="treeViewItem.id"
            draggable
            @dragover.stop.prevent
            @dragenter.stop.prevent
            @dragstart.stop="onDragNode(treeViewItem, $event)"
            @drop.prevent.stop="onDropNode(treeViewItem, $event, onDropValidator)"
            @dragover.stop="addHoverClass"
            class="tree-item-node"
            @dragleave.stop="removeHoverClass">

            <treeview-item class="pointer tree-view-item" 
                :item="treeViewItem"
                :parent="parent"
                :isCheckable="isCheckable"
                :selectedItem="selectedItem"
                :treeState="treeState"
                @contextmenu.prevent="$emit('onContextMenu', { item: treeViewItem, event: $event })">
                <template v-slot:icon><slot name="item-prepend-icon" v-bind="treeViewItem"></slot></template>
                <template v-slot:prepend><slot name="item-prepend" v-bind="treeViewItem"></slot></template>
            </treeview-item>
            
            <div class="node-child hide"
                :class="{'hide-guidelines': hideGuideLines}" 
                v-if="treeViewItem.children && treeViewItem.children.length > 0">
                    <tree-view :items="treeViewItem.children"
                        :hideGuideLines="hideGuideLines"
                        :isNested="true"
                        :parent="treeViewItem"
                        :selectedItem="selectedItem"
                        :checkedItems="checkedItems"
                        :treeState="treeState"
                        :isCheckable="isCheckable"
                        @onContextMenu="$emit('onContextMenu', $event)">
                        <template v-for="(_, slot) of $slots" v-slot:[slot]="props">
                            <slot :name="slot" v-bind="props"/>
                        </template>
                    </tree-view>
            </div>
        </li>
    </ul>
</template>
<script src="./tree-component.ts" lang="ts" />   