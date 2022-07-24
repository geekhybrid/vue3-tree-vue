import { TreeViewItem } from "../types";

// TODO: Complete Drag and Drop Feature
export function useTreeViewItemMouseActions() {
    const onDragTreeItem = (item: TreeViewItem, event: DragEvent): void => {
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', JSON.stringify(item));
        }
    }

    const onDropTreeItem = (dropHost: TreeViewItem, event: DragEvent, isDropValid: (item1: TreeViewItem, item2: TreeViewItem) => boolean): void => {
        if (event.dataTransfer) {
            const droppedNode = JSON.parse(event.dataTransfer.getData('text/plain')) as TreeViewItem;


            if (droppedNode.id === dropHost.id) {
                return
            }
            
            if (!isDropValid(droppedNode, dropHost)) return;
        }
    }


    return {
        onDragTreeItem,
        onDropTreeItem
    }
}