import { defineComponent, nextTick, onMounted, PropType, ref } from "vue";
import { TreeItemOptions, TreeViewItem, TreeViewItemEvent } from "../types";

export default defineComponent({
    props: {
        item: {
            type: Object as PropType<TreeViewItem>,
            required: true
        },
        onCheckedChanged: {
            type: Function as PropType<TreeViewItemEvent>,
            required: true
        },
        options : {
            type: Object as PropType<TreeItemOptions>
        },
    },
    emits: ["on-rename", "changed"],

    setup(props, { emit }){
        const isChecked = ref(false);

        const updateCheckState = () => emit("changed", { item: props.item, status: isChecked ? 'True' : 'False' })
        onMounted(() => isChecked.value = props.item.checkedStatus == 'True' ? true : false);

        const isRenaming = ref(false);
        const renameBox = ref<HTMLInputElement>();

        const beginRenaming = () => {
            if (!props.options) return;

            if (!props.options.canRename) return;

            isRenaming.value = true;
            nextTick().then(() => renameBox.value?.focus());
        }

        const finishRenaming = () => {
            // v-on:blur and key(enter) can cause this to fire twice.
            // this check protects against that.
            if (!isRenaming) return;
            emit("on-rename", props.item);
        }

        return {
            isChecked,
            updateCheckState,
            isRenaming,
            beginRenaming,
            finishRenaming
        }
    }
})