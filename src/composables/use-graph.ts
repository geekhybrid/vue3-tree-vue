import { TreeState, TreeViewItem, _InternalItem } from "@/types";
import { Ref } from "vue";

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
        node.id = crypto.randomUUID();
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