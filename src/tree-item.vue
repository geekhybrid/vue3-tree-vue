<template>
    <div class="d-flex align-items-center" @contextmenu.prevent="$emit('onContextMenu', { item, event: $event })">
            <div class="horizontal-dashes" v-if="$attrs.isNested" />
            <span class="chevron-right" ref="chevron"
                :class="{'hide-chevron': !item.children || item.children.length < 1}"
                @click="toggleExpand()">
            </span>

            <div class="pointer" :class="{'selected-tree-item': !isCheckable && isSelected}" style="width: 100%">
                <div v-if="!isRenaming" @dblclick="beginRenaming">
                    <div v-if="isCheckable" style="display: flex">
                        <input @contextmenu.prevent @change="updateCheckState" type="checkbox" ref="checkbox" />
                        <div class="d-flex" style="margin-left: 0.4em; margin-right: 0.4em">
                            <slot name="icon"></slot>
                            <slot name="prepend"></slot>
                        </div>
                        <label for="checkbox" v-if="!isRenaming">{{ item.name }}</label>
                        <!-- <input v-model="item.name" v-else /> -->
                    </div>
                    <div class="d-flex" v-else @click="treeState?.emitItemSelected(item)">
                        <slot name="icon"></slot>
                        <slot name="prepend"></slot> 
                        <span>{{ item.name }}</span>
                    </div>
                </div>
                <input
                    ref="rename-box"
                    v-model="item.name" v-else
                    v-on:keyup.enter="finishRenaming"
                    @blur="finishRenaming"
                />
            </div>
        </div>
</template>

<script src="./tree-item.ts" lang="ts" />