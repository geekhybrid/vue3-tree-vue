<template>
    <div class="pointer" :class="{'tree-item-selected': !isCheckable && isSelected}" style="width: 100%">
        <slot name="prepend-icon">
        </slot>
        <div v-if="!isRenaming" @dblclick="beginRenaming">
            <div v-if="isCheckable">
                <input @contextmenu.prevent @change="updateCheckState" type="checkbox" ref="checkbox" />
                <label for="checkbox" v-if="!isRenaming">{{ item.name }}</label>
                <input v-model="item.name" v-else />
            </div>
            <span v-else @click="treeState?.emitItemSelected(item)" >{{ item.name }}</span>
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