<template>
  <div class="d-flex align-items-center" @contextmenu.prevent="$emit('onContextMenu', { item, event: $event })">
    <div class="guide-line" v-if="parent != null && !hideGuideLines"></div>

    <div @click="toggleExpand()" v-if="(lazyLoad || (item.children && item.children.length > 0)) && (item.collapsible == undefined || item.collapsible == true)">
      <slot name="expander" v-bind="item">
        <span class="chevron-right" :class="{'rotate-90' : item.expanded }"></span>
      </slot>
    </div>

    <div class="pointer tree-item" :class="styles" style="width: 100%">
      <div v-if="!isRenaming" @dblclick="beginRenaming">
        <div v-if="isCheckable" class="tree-item__checkbox-area">
          <input @contextmenu.prevent @change="updateCheckState" type="checkbox" ref="checkbox" :disabled="item.disabled" :class="checkboxStyle" />
          <div class="d-flex">
            <div class="tiny_horizontal_margin">
              <slot name="icon"></slot>
            </div>
            <div class="tiny_horizontal_margin">
              <slot name="prepend"></slot>
            </div>
          </div>
          <label for="checkbox" v-if="!isRenaming" class="pointer">{{ item.name }}</label>
          &nbsp;
          <slot name="append"></slot>
        </div>
        <div class="d-flex" v-else @click="treeState?.emitItemSelected(item)">
          <div class="tiny_horizontal_margin">
            <slot name="icon"></slot>
          </div>
          <div class="tiny_horizontal_margin">
            <slot name="prepend"></slot>
          </div>
          <slot name="name">
            <span>{{ item.name }}</span>
          </slot>
          &nbsp;
          <slot name="append"></slot>
        </div>
      </div>
      <input ref="rename-box" v-model="item.name" v-else v-on:keyup.enter="finishRenaming" @blur="finishRenaming" />
    </div>
  </div>
</template>

<script src="./tree-item.ts" lang="ts" />