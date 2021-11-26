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

            <div class="d-flex align-items-center" @contextmenu.prevent="$emit('onContextMenu', { item: treeViewItem, event: $event })">
                <div class="horizontal-dashes" />
                <span class="chevron-right" v-if="treeViewItem.children && treeViewItem.children.length > 0" @click="toggleVisiblity(treeViewItem.id, $event)"></span>
                <div class="icon-area">
                    <slot v-bind="treeViewItem">
                    </slot>
                </div>
                <treeview-item class="my-1 pointer" :item="treeViewItem"
                    @contextmenu.prevent="$emit('onContextMenu', { item: treeViewItem, event: $event })"/>
            </div>
            
            <div class="node-child hide" :class="{'hide-guidelines': hideGuideLines}">
                <tree-view :items="treeViewItem.children" nested :hideGuideLines="hideGuideLines"
                    @onContextMenu="$emit('onContextMenu', $event)"
                    v-if="treeViewItem.children && treeViewItem.children.length > 0" >
                    <template v-for="(_, slot) of $slots" v-slot:[slot]="props">
                        <slot :name="slot" v-bind="props"/>
                    </template>
                </tree-view>
            </div>
        </li>
    </ul>
</template>

<script src="./tree-component.ts" lang="ts" />
<style scoped lang="scss" src="./tree.scss" />