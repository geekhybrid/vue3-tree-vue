import { defineComponent, PropType } from "vue";
import { IsValidDropCallback, SelectionMode, TreeViewItem } from "./types";
import TreeItemComponent from "./tree-item.vue";
import { useTreeViewItemMouseActions } from "../src/composables/use-tree-mouse-actions";

export default defineComponent({
    name: 'tree-view',
    props: {
        items: {
            type: Array as PropType<TreeViewItem[]>,
            required: true,
            default: () => { return []}
        },
        selectionMode: {
            type: Object as PropType<SelectionMode>,
            default: ''
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
        }
    },
    components: { 'treeview-item': TreeItemComponent },

    setup() {
        const toggleVisiblity = (nodeId: string, event: InputEvent): void => {
            const element = document.getElementById(nodeId)?.getElementsByClassName('node-child');
            const target = event.target as HTMLInputElement;
            
            if (!element) return;
            
            target.classList.toggle('rotate-90');
            element[0].classList.toggle('hide');
        };

        return {
            toggleVisiblity,
            ...useTreeViewItemMouseActions()
        }
    }
})