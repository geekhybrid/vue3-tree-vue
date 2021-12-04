<template>
    <div class="pointer" :class="{'tree-item-selected': !isCheckable && isSelected}" style="width: 100%">
        <div v-if="!isRenaming" @dblclick="beginRenaming">
            <div v-if="isCheckable" style="display: flex">
                <input @contextmenu.prevent @change="updateCheckState" type="checkbox" ref="checkbox" />
                <div style="margin-left: 0.4em; margin-right: 0.4em">
                    <slot name="icon"></slot>
                </div>
                <label for="checkbox" v-if="!isRenaming">{{ item.name }}</label>
                <!-- <input v-model="item.name" v-else /> -->
            </div>
            <span v-else @click="treeState?.emitItemSelected(item)"><slot name="icon"></slot> {{ item.name }}</span>
        </div>
        <input
            ref="rename-box"
            v-model="item.name" v-else
            v-on:keyup.enter="finishRenaming"
            @blur="finishRenaming"
        />
    </div>
</template>

<script src="./tree-item.ts" lang="ts" />
<style scoped lang="css" src="./tree-item.css" />