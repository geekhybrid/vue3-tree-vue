import { TreeState, TreeViewItem } from "@/types";

export function useGraph(
    selectedItem: TreeViewItem | undefined,
    onItemSelected: (item: TreeViewItem) => void,
    checkedItems: TreeViewItem[] | undefined,
    onItemsChecked: (selectedItems: TreeViewItem[]) => void): TreeState {

    const childParentLookUp: {[childId: string]: TreeViewItem | undefined } = {};

    const getParent = (childId: string) => childParentLookUp[childId];
    const trackNode = (node: TreeViewItem, parentNode: TreeViewItem) => childParentLookUp[node.id] = parentNode;
    const untrackNode = (node: TreeViewItem) => delete(childParentLookUp[node.id])

    const checkedItemsLookup: {[childId: string]: TreeViewItem } = {};
    checkedItems?.forEach(node => checkedItemsLookup[node.id] = node);

    const emitItemSelected = (node: TreeViewItem) => {
        if (node === selectedItem) return;
        selectedItem = node;
        onItemSelected(node);
    };
    const emitItemCheckedChange = (node: TreeViewItem) => {
        if (node.checkedStatus == 'true')
        checkedItemsLookup[node.id] = node;
        else
            delete(checkedItemsLookup[node.id]);

        onItemsChecked(Object.values(checkedItemsLookup));
    };


    return {
        getParent,
        trackNode,
        untrackNode,
        emitItemCheckedChange,
        emitItemSelected,
    }
}