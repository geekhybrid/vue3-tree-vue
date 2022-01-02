import { computed, defineComponent, nextTick, onMounted, onUnmounted, PropType, ref, watch } from "vue";
import { cascadeStateToDescendants, notifyParentOfSelection } from "./composables/use-tree-traversal";
import { TreeState, TreeViewItem } from "./types";

export default defineComponent({
    inheritAttrs: true,
    props: {
        item: {
            type: Object as PropType<TreeViewItem>,
            required: true
        },
        isCheckable : {
            type: Boolean
        },
        canRename: {
            type: Boolean
        },
        selectedItem: {
            type: Object as PropType<TreeViewItem>            
        },
        treeState: {
            type: Object as PropType<TreeState>
        }
    },
    emits: ["on-rename", "onContextMenu"],

    setup(props, { emit, attrs }){
        const checkbox = ref<HTMLInputElement>();
        const isSelected = computed(() => props.selectedItem?.id == props.item.id);
        const parent = computed<TreeViewItem>(() => attrs.parent as TreeViewItem);

        onMounted(() => {
            props.treeState?.trackNode(props.item, parent.value);
            if (props.treeState?.isNodeExpanded(props.item.id, props.item.type)) {
                toggleExpand();
            }
        });
        onUnmounted(() => props.treeState?.untrackNode(props.item));

        const updateCheckState = () =>  {
            props.item.checkedStatus = checkbox.value?.checked == true ? 'true' : 'false';
            props.treeState!.emitItemCheckedChange(props.item);
            notifyParentOfSelection(props.item!, props.treeState!);
            cascadeStateToDescendants(props.item!, props.treeState!);
        };

        watch(
            () => props.item.checkedStatus, 
            () => {
                if (props.item.checkedStatus == 'indeterminate') {
                    checkbox.value!.indeterminate = true;
                }
                else 
                {
                    checkbox.value!.indeterminate = false;
                    checkbox.value!.checked = props.item.checkedStatus == 'true' ? true : false
                }
            }
        );

        const isRenaming = ref(false);
        const renameBox = ref<HTMLInputElement>();

        const beginRenaming = () => {
            if (!props.canRename) return;

            isRenaming.value = true;
            nextTick().then(() => renameBox.value?.focus());
        }

        const finishRenaming = () => {
            // v-on:blur and key(enter) can cause this to fire twice.
            // this check protects against that.
            if (!isRenaming) return;
            emit("on-rename", props.item);
        }

        const chevron = ref<HTMLSpanElement>();
        const toggleExpand = () => {
            chevron.value?.classList.toggle("rotate-90");
            const element = document.getElementById(props.item.id)?.getElementsByClassName('node-child');
            
            if (!element) return;
            element[0].classList.toggle('hide');
        }

        return {
            toggleExpand,
            chevron,
            isSelected,
            updateCheckState,
            isRenaming,
            beginRenaming,
            finishRenaming,
            parent,
            checkbox
        }
    }
})