import { IsValidDropCallback, TreeState, TreeViewItem, _InternalItem, _TREE_STATE_PROVIDER_INJECT_KEY } from "./types";
import TreeItemComponent from "./tree-item.vue";
import { useTreeViewItemMouseActions } from "../src/composables/use-tree-mouse-actions";
import { useGraph } from "./composables/use-graph";
import { computed, defineComponent, inject, PropType, provide, ref } from "vue";

export default defineComponent({
    name: 'tree-view',
    props: {
        items: {
            type: Array as PropType<TreeViewItem[]>,
            required: true,
            default: () => { return []}
        },
        isCheckable: {
            type: Boolean
        },
        hideGuideLines : {
            type: Boolean,
            default: false
        },
        onDropValidator: {
            type: Function as PropType<IsValidDropCallback>,
            default: () => { () => true; }
        },
        treeState: {
            type: Object as PropType<TreeState>
        },
        checkboxStyle: {
          type: String
        },
        lazyLoad: {
            type: Boolean
        }
    },
    components: { 'treeview-item': TreeItemComponent },
    emits: ['onContextMenu', 'onSelect', 'onCheck', 'onExpand', 'onCollapse'],
    
    setup(props, { emit, attrs}) {
        const parent = computed<TreeViewItem>(() => attrs.parent as TreeViewItem);
        const internalItems = computed<_InternalItem[]>(() => props.items.map(item => item as _InternalItem));

        const treeState = ref<TreeState>();
        // Create a tree state object for only root nodes.
        treeState.value = inject<TreeState | undefined>(_TREE_STATE_PROVIDER_INJECT_KEY, undefined);

        if (!treeState.value) {
          treeState.value = useGraph(
            (selectedItem: TreeViewItem) => emit('onSelect', selectedItem),
            (checkedItems: TreeViewItem[]) => emit('onCheck', checkedItems),
            (expandedItem: TreeViewItem) => emit('onExpand', expandedItem),
            (collapsedItem: TreeViewItem) => emit('onCollapse', collapsedItem)
          );
  
          provide<TreeState>(_TREE_STATE_PROVIDER_INJECT_KEY, treeState.value); 
        }
        
        return {
            ...useTreeViewItemMouseActions(),
            parent,
            internalItems,
            treeState
        }
    }
})