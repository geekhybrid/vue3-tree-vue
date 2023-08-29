import { IsValidDropCallback, TreeState, TreeViewItem, _InternalItem } from "../types";

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

    const onDropNode = (dropHost: _InternalItem, event: DragEvent, isDropValid: IsValidDropCallback | undefined, state: TreeState): void => {
        console.log(event.dataTransfer);
        if (event.dataTransfer) {
            const droppedNode = JSON.parse(event.dataTransfer.getData('text/plain')) as _InternalItem;

            removeHoverClass(event)

            if (droppedNode.id === dropHost.id) {
                return
            }

            if (!isDropValid || !isDropValid(droppedNode, dropHost)) return;

            if (!dropHost.children)
                dropHost.children = [];

            state.detach(droppedNode.id);
            dropHost.children.push(droppedNode);
        }
    }


    return {
        addHoverClass,
        removeHoverClass,
        onDragNode,
        onDropNode
    }
}