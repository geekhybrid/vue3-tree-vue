import { TreeViewItem } from "../types";

export function useTreeViewItemMouseActions() {
    const addHoverClass = (event: DragEvent): void => {
        const target = event.currentTarget as HTMLElement;

        if (target) {
            target.classList.add('drag-over')
        }
    }

    const removeHoverClass =(event: DragEvent): void => {
        const target = event.currentTarget as HTMLElement;

        if (target) {
            target.classList.remove('drag-over');
        }
    }

    const onDragNode = (item: TreeViewItem, event: DragEvent): void => {
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', JSON.stringify(item));
        }
    }

    const onDropNode = (dropHost: TreeViewItem, event: DragEvent, isDropValid: (item1: TreeViewItem, item2: TreeViewItem) => boolean): void => {
        if (event.dataTransfer) {
            const droppedNode = JSON.parse(event.dataTransfer.getData('text/plain')) as TreeViewItem;

            removeHoverClass(event)

            if (droppedNode.id === dropHost.id) {
                return
            }
            
            if (!isDropValid(droppedNode, dropHost)) return;
        }
    }


    return {
        addHoverClass,
        removeHoverClass,
        onDragNode,
        onDropNode
    }
}