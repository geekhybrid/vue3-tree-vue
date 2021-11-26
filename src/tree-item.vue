<template>
    <div>
        <div v-if="!isRenaming" @dblclick="beginRenaming">
            <div v-if="options?.isCheckable" >
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

<script src="./tree-item.ts" />
