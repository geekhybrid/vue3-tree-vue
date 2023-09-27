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
        }
    },
    emits: ["on-rename", "onContextMenu"],

    setup(props, { emit, attrs }){
        const checkbox = ref<HTMLInputElement>();
        const parent = computed<TreeViewItem>(() => attrs.parent as TreeViewItem);
        const treeState = inject<TreeState>(_TREE_STATE_PROVIDER_INJECT_KEY)!;
        const setCheckboxState = () => checkbox.value!.checked = props.item.checked!;

        onMounted(() => {
            treeState.trackNode(props.item, parent.value);
            if (props.item.checked) {
              setCheckboxState();
              updateParentCheckState(props.item!, treeState);
            }
            else
            {
              props.item.checked = parent.value?.checked;
            }
        });

        const updateCheckState = () =>  {
          props.item.checked = checkbox.value?.checked;
          props.item.indeterminate = false;

          updateParentCheckState(props.item!, treeState);
          updateChildrenCheckState(props.item!, treeState);
          treeState.emitItemCheckedChange();
        };

        watch(
            () => props.item.indeterminate, 
            () => checkbox.value!.indeterminate = props.item.indeterminate
        );

        watch(
          () => props.item.checked, 
          () => setCheckboxState()
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

        const chevron = ref<HTMLSpanElement>();
        const toggleExpand = (shouldSet: boolean = true) => {
            chevron.value?.classList.toggle("rotate-90");
            if (shouldSet)
              props.item.expanded = !props.item.expanded;

            if (props.item.expanded)
              treeState.emitItemExpanded(props.item);
            else
              treeState.emitItemCollapsed(props.item);

            const element = document.getElementById(props.item.id)?.getElementsByClassName('node-child');
            
            if (!element || !element[0]) return;
            element[0].classList.toggle('hide');
        }

        return {
            toggleExpand,
            chevron,
            treeState,
            updateCheckState,
            isRenaming,
            beginRenaming,
            finishRenaming,
            parent,
            checkbox
        }
    }
})