import { IsValidDropCallback, TreeState, TreeViewItem, _InternalItem } from "../types";

export function useTreeViewItemMouseActions() {
    const addHoverClass = (event: DragEvent): void => {
        const target = event.currentTarget as HTMLElement;

        if (target) {
            target.classList.add('tree-item__drag-over')
        }
    }

    const addRootHoverClass = (event: DragEvent, isRootNode: boolean): void => {
      if (!isRootNode) return;
      const target = event.currentTarget as HTMLElement;

        if (target) {
            target.classList.add('root__drag-over')
        }
    }

    const removeRootHoverClass =(event: DragEvent, isRootNode: Boolean): void => {
      if (!isRootNode) return;
      const target = event.currentTarget as HTMLElement;
      if (target) {
          target.classList.remove('root__drag-over');
      }
    }

    const removeHoverClass =(event: DragEvent): void => {
        const target = event.currentTarget as HTMLElement;
        if (target) {
            target.classList.remove('tree-item__drag-over');
        }
    }

    const onDragNode = (item: TreeViewItem, event: DragEvent): void => {
        if (event.dataTransfer) {
            event.dataTransfer.setData('text/plain', JSON.stringify(item));
        }
    }

    const onDropNode = (dropHost: _InternalItem | undefined, event: DragEvent, isDropValid: IsValidDropCallback | undefined, state: TreeState | undefined): void => {
        if (event.dataTransfer) {
            removeHoverClass(event)
            const droppedNode = JSON.parse(event.dataTransfer.getData('text/plain')) as _InternalItem;

            if (!isDropValid) return;

            if (dropHost && droppedNode.id === dropHost.id) {
                return
            }

            isDropValid(droppedNode, dropHost).then((canDrop) => {
                if (canDrop) {
                    state!.detach(droppedNode.id);

                    if (dropHost && !dropHost.children)
                        dropHost.children = [];
        
                    if(dropHost)
                      dropHost!.children!.push(droppedNode);
                    else
                      state!.attach(droppedNode);// Dropping into root
                }
            });
        }
    }


    return {
        addHoverClass,
        removeHoverClass,
        onDragNode,
        onDropNode,
        addRootHoverClass,
        removeRootHoverClass
    }
}