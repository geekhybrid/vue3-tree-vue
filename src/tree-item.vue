<template>
    <div class="pointer" :class="{'tree-item-selected': !isCheckable && isSelected}" @click="$emit('selected', item)" style="width: 100%">
        <div v-if="!isRenaming" @dblclick="beginRenaming">
            <div v-if="isCheckable" >
                <input @contextmenu.prevent @change="updateCheckState" type="checkbox" ref="checkbox" v-model="isChecked" />
                <label for="checkbox" v-if="!isRenaming">{{ item.name }}</label>
                <input v-model="item.name" v-else />
            </div>
            <span v-else>{{ item.name }}</span>
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