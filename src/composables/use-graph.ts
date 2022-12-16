import { ItemEventArgs, TreeState, TreeViewItem } from "@/types";

/**
 * Initialises the root state of a tree.
 * @param selectedItem A preselected item
 * @param onItemSelected Callback for itemselected
 * @param checkedItems An array of prechecked items
 * @param onItemsChecked Callback for itemChecked
 * @param isNodeExpanded A callback to verify if node is preset to expanded
 * @param itemSelectedEventHandler A callback when an item is selected.
 * @param itemSelectedEventHandler A callback when an item is checked.
 * @returns 
 */
export function useGraph(
    selectedItem: TreeViewItem | undefined,
    onItemSelected: (item: TreeViewItem) => void,
    checkedItems: TreeViewItem[] | undefined,
    onItemsChecked: (selectedItems: TreeViewItem[]) => void,
    isNodeExpanded: (id: string, type: string) => boolean,
    itemSelectedEventHandler: (args: ItemEventArgs) => void,
    itemCheckedEventHandler: (args: ItemEventArgs) => void): TreeState {

    const childParentLookUp: {[childId: string]: TreeViewItem | undefined } = {};

    const getParent = (childId: string) => childParentLookUp[childId];
    const trackNode = (node: TreeViewItem, parentNode: TreeViewItem) => childParentLookUp[node.id] = parentNode;
    const untrackNode = (node: TreeViewItem) => delete(childParentLookUp[node.id])

    const checkedItemsLookup: {[childId: string]: TreeViewItem } = {};
    checkedItems?.forEach(node => checkedItemsLookup[node.id] = node);

    const emitItemSelected = (node: TreeViewItem) => {
        itemSelectedEventHandler({
            item: node,
            change: 'selected'
        });

        if (node === selectedItem) return;

        selectedItem = node;
        onItemSelected(node);
    };
    const emitItemCheckedChange = (node: TreeViewItem) => {
        itemCheckedEventHandler({
            item: node,
            change: node.checkedStatus!
        });

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
        isNodeExpanded,
    }
}