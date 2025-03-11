import { computed, defineComponent, inject, nextTick, onMounted, PropType, ref, watch } from "vue";
import { updateChildrenCheckState, updateParentCheckState } from "./composables/use-tree-traversal";
import { TreeState, TreeViewItem, _InternalItem, _TREE_STATE_PROVIDER_INJECT_KEY } from "./types";

export default defineComponent({
    inheritAttrs: true,
    props: {
        item: {
            type: Object as PropType<_InternalItem>,
            required: true
        },
        isCheckable : {
            type: Boolean
        },
        canRename: {
            type: Boolean
        },
        checkboxStyle: {
            type: String
        },
        lazyLoad: {
            type: Boolean
        },
        hideGuideLines: {
          type: Boolean
        }
    },
    emits: ["on-rename", "onContextMenu"],

    setup(props, { emit, attrs }){
        const checkbox = ref<HTMLInputElement>();
        const parent = computed<TreeViewItem>(() => attrs.parent as TreeViewItem);
        const treeState = inject<TreeState>(_TREE_STATE_PROVIDER_INJECT_KEY)!;
        
        const setCheckboxState = () => {
            if (checkbox.value && props.item.checked !== undefined) {
                checkbox.value.checked = props.item.checked;
            }
        };

        onMounted(() => {
            treeState.trackNode(props.item, parent.value);
            if (props.item.checked) {
              nextTick(() => {
                setCheckboxState();
                updateParentCheckState(props.item!, treeState);
              });
            }
            else if (parent.value?.checked !== undefined) {
              props.item.checked = parent.value.checked;
            }
        });

        const styles = computed(() => {
    
            var style: Record<string, boolean | undefined> = {
                'selected-tree-item': !props.isCheckable && props.item.selected
            }

            if (props.item.styles) {
                props.item.styles.forEach(s => style[s] = true)
            }

            return style;
        });

        const updateCheckState = () =>  {
          if (checkbox.value) {
            props.item.checked = checkbox.value.checked;
            props.item.indeterminate = false;

            updateParentCheckState(props.item!, treeState);
            updateChildrenCheckState(props.item!, treeState);
            treeState.emitItemCheckedChange();
          }
        };

        watch(
            () => props.item.indeterminate, 
            () => {
                if (checkbox.value && props.item.indeterminate !== undefined) {
                    checkbox.value.indeterminate = props.item.indeterminate;
                }
            }
        );

        watch(
          () => props.item.checked, 
          () => nextTick(setCheckboxState)
        );

        watch(
          () => props.item.expanded,
          () => toggleExpand(false)
        )

        watch(
          () => props.item.children?.length,
          () => props.item.children?.forEach(child => treeState?.trackNode(child, props.item))
        )

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

        const toggleExpand = (shouldSet: boolean = true) => {
            /// `expanded` can be set programmatically. When this is the case `shouldSet` is false
            /// see watch(props.item.expanded)
            /// the component should not bother flipping the expanded or firing the 
            /// expanded/collapsed events.

            if (shouldSet) {
                props.item.expanded = !props.item.expanded;
            }

            if (props.item.expanded) {
                treeState?.emitItemExpanded(props.item);
            }
            else {
                treeState?.emitItemCollapsed(props.item);
            }
        }

        return {
            styles,
            checkbox,
            parent,
            treeState,
            isRenaming,
            renameBox,
            updateCheckState,
            beginRenaming,
            finishRenaming,
            toggleExpand
        }
    }
})