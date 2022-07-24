import { IsValidDropCallback, TreeState, TreeViewItem } from "./types";
import TreeItem from "./tree-item.vue";
import { useTreeViewItemMouseActions } from "../src/composables/use-tree-mouse-actions";
import { useGraph } from "./composables/use-graph";
import { computed, defineComponent, PropType, ref } from "vue";

export default defineComponent({
    name: 'TreeView',
    props: {
        items: {
            type: Array as PropType<TreeViewItem[]>,
            required: true,
            default: () => { return []}
        },
        selectedItem: {
            type: Object as PropType<TreeViewItem>,
        },
        checkedItems: {
            type: Array as PropType<TreeViewItem[]>
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
        expandedTypes: {
            type: Object as PropType<string[]>,
            default: () => []
        },
        expandedIds: {
            type: Object as PropType<string[]>,
            default: () => []
        },
        expandAll : {
            type: Boolean as PropType<boolean>,
            default: false
        }
    },
    components: { TreeItem },
    emits: ['update:selectedItem', 'update:checkedItems', 'onContextMenu', 'onSelect', 'onCheck'],
    
    setup(props, { emit, attrs}) {
        const parent = computed<TreeViewItem>(() => attrs.parent as TreeViewItem);

        const treeState = ref<TreeState>();
        var expandedKeys = new Set<string>([...props.expandedTypes, ...props.expandedIds]);
            // Create a tree state object for only root nodes.
        if (props.treeState != null) {
            treeState.value = props.treeState;
        }
        else {
            treeState.value = useGraph(
                props.selectedItem,
                (selectedItem) => emit('update:selectedItem', selectedItem),
                props.checkedItems,
                (checkedItems) => emit('update:checkedItems', checkedItems),
                (id: string, type: string) => expandedKeys.has(id) || expandedKeys.has(type) || props.expandAll,
                (eventArguments) => emit('onSelect', eventArguments),
                (eventArguments) => emit('onCheck', eventArguments)
            );
        }

        return {
            ...useTreeViewItemMouseActions(),
            parent,
            treeState
        }
    }
})