import { TreeState, TreeViewItem, _InternalItem } from "@/types";

// TODO: Watch children length: When node is deleted: Remove from graph.
/**
 * Initialises the root state of a tree.
 * @param itemSelectedEventHandler A callback when an item is selected.
 * @param itemSelectedEventHandler A callback when an item is checked.
 * @returns 
 */
export function useGraph(
    itemSelectedEventHandler: (args: TreeViewItem) => void,
    itemCheckedEventHandler: (checkedItems: TreeViewItem[]) => void): TreeState {

    const childParentLookUp: Record<string | number, _InternalItem>  = {};
    const nodeLookUp: Record<string, _InternalItem> = {};

    const getParent = (childId: string | number) => childParentLookUp[childId];
    const trackNode = (node: _InternalItem, parentNode: _InternalItem) => {
      if (!node.id) {
        node.id = crypto.randomUUID();
      }

      nodeLookUp[node.id] = node;
      childParentLookUp[node.id] = parentNode
    };
    const untrackNode = (node: _InternalItem) => delete(childParentLookUp[node.id]);

    const emitItemSelected = (node: TreeViewItem) => {
        itemSelectedEventHandler(node);
        Object.values(nodeLookUp).forEach(node => node.selected = false);
        node.selected = true;
    };
    const emitItemCheckedChange = () => itemCheckedEventHandler(Object.values(nodeLookUp).filter(node => node.checked));
    const getNode = (id: string) => nodeLookUp[id];


    return {
        getNode,
        getParent,
        trackNode,
        untrackNode,
        emitItemCheckedChange,
        emitItemSelected
    }
}