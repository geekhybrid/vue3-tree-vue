import { TreeState, TreeViewItem, _InternalItem } from "@/types";
import { Ref } from "vue";


export function uuidv4() {
  return ('10000000-1000-4000-8000-100000000000').replace(/[018]/g, c =>
    (Number.parseFloat(c) ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> Number.parseFloat(c) / 4).toString(16)
  );
}


// TODO: Watch children length: When node is deleted: Remove from graph.
/**
 * Initialises the root state of a tree.
 * @param itemSelectedEventHandler A callback when an item is selected.
 * @param itemSelectedEventHandler A callback when an item is checked.
 * @returns 
 */
export function useGraph(
    items: Ref<TreeViewItem[]>,
    itemSelectedEventHandler: (selectedItem: TreeViewItem) => void,
    itemCheckedEventHandler: (checkedItems: TreeViewItem[]) => void,
    itemExpandedEventHandler: (expandedItem: TreeViewItem) => void,
    itemCollapsedEventHandler: (collapsedItem: TreeViewItem) => void): TreeState {
    const childParentLookUp: Record<string | number, _InternalItem | undefined>  = {};
    const nodeLookUp: Record<string, _InternalItem> = {};

    const getParent = (childId: string | number) => childParentLookUp[childId];
    const trackNode = (node: _InternalItem, parentNode: _InternalItem | undefined) => {
      if (!node.id) {
        node.id = uuidv4();
      }

      nodeLookUp[node.id] = node;
      childParentLookUp[node.id] = parentNode
    };

    const detach = (id: string | number) => {
      const parent = childParentLookUp[id];
      if (parent == null) {
        items.value = items.value.filter(item => item.id != id);
      }
      else {
        parent.children = parent.children?.filter(child => child.id != id);
      }
      delete(childParentLookUp[id]);
    }

    const attach = (item: _InternalItem) => {
      items.value.push(item);
      trackNode(item, undefined);
    }

    const emitItemSelected = (node: TreeViewItem) => {
        if (node.disabled === true) {
            return;
        }
        itemSelectedEventHandler(node);
        Object.values(nodeLookUp).forEach(node => node.selected = false);
        node.selected = true;
    };
    const emitItemCheckedChange = 
      () => itemCheckedEventHandler(Object.values(nodeLookUp).filter(node => node.checked && !node.disabled));

    const getNode = (id: string) => nodeLookUp[id];


    return {
        getNode,
        getParent,
        trackNode,
        detach,
        emitItemCheckedChange,
        emitItemSelected,
        emitItemExpanded: itemExpandedEventHandler,
        emitItemCollapsed: itemCollapsedEventHandler,
        attach
    }
}