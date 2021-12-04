<template>
    <ul id="explorer" class="explorer">
        <li v-for="treeViewItem in items" 
            :key="treeViewItem.id" 
            :id="treeViewItem.id"
            draggable
            @dragover.stop.prevent
            @dragenter.stop.prevent
            @dragstart.stop="onDragNode(treeViewItem, $event)"
            @drop.prevent.stop="onDropNode(treeViewItem, $event, onDropValidator)"
            @dragover.stop="addHoverClass"
            @dragleave.stop="removeHoverClass">

            <div class="d-flex align-items-center"
                @contextmenu.prevent="$emit('onContextMenu', { item: treeViewItem, event: $event })">
                    <div class="horizontal-dashes"
                        v-if="$attrs.isNested" />
                    <span class="chevron-right"
                        :class="{'hide-chevron': !treeViewItem.children || treeViewItem.children.length < 1}"
                        @click="toggleVisiblity(treeViewItem.id, $event)">
                    </span>

                    <treeview-item class="pointer tree-view-item"
                        :item="treeViewItem"
                        :parent="parent"
                        :isCheckable="isCheckable"
                        :selectedItem="selectedItem"
                        :treeState="treeState"
                        @contextmenu.prevent="$emit('onContextMenu', { item: treeViewItem, event: $event })">
                        <template v-slot:icon><slot name="item-prepend-icon" v-bind="treeViewItem"></slot></template>
                    </treeview-item>
            </div>
            
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

<style scoped src="./tree-component.css" />
<script src="./tree-component.ts" lang="ts" />   