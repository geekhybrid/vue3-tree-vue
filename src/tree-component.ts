import { computed, defineComponent, PropType } from "vue";
import { IsValidDropCallback, TreeState, TreeViewItem } from "./types";
import TreeItemComponent from "./tree-item.vue";
import { useTreeViewItemMouseActions } from "../src/composables/use-tree-mouse-actions";
import { useGraph } from "./composables/use-graph";

export default defineComponent({
    name: 'tree-view',
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
        }
    },
    components: { 'treeview-item': TreeItemComponent },
    emits: ['update:selectedItem', 'update:checkedItems', 'onContextMenu'],
    setup(props, { emit, attrs}) {
        const parent = computed<TreeViewItem>(() => attrs.parent as TreeViewItem);

        const treeState = computed<TreeState>(() => props.treeState ?? 
            useGraph(
                props.selectedItem,
                (selectedItem) => emit('update:selectedItem', selectedItem),
                props.checkedItems,
                (checkedItems) => emit('update:checkedItems', checkedItems))
            );

        const toggleVisiblity = (nodeId: string, event: InputEvent): void => {
            const element = document.getElementById(nodeId)?.getElementsByClassName('node-child');
            const target = event.target as HTMLInputElement;
            
            if (!element) return;
            
            target.classList.toggle('rotate-90');
            element[0].classList.toggle('hide');
        };

        return {
            toggleVisiblity,
            ...useTreeViewItemMouseActions(),
            parent,
            treeState
        }
    }
})