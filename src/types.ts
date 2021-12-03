export interface TreeViewItem {
    children?: TreeViewItem[]
    type: string
    checkedStatus?: CheckedState,
    name: string,
    data?: any,
    id: string
}

export interface ItemCheckedChangedEvent {
    item: TreeViewItem,
    status: CheckedState
}

export interface TreeState {
    getParent(childId: string): TreeViewItem | undefined;
    trackNode(childNode: TreeViewItem, parentNode: TreeViewItem): void;
    untrackNode(childNode: TreeViewItem): void;

    emitItemSelected(node: TreeViewItem): void;
    emitItemCheckedChange(node: TreeViewItem): void;
}

export interface TreeEvents {
    updateMultiSelectedItems(): void;
    updateSingleSelectedItem(): void;
}

export type IsValidDropCallback = (droppedItem: TreeViewItem, dropHost: TreeViewItem) => boolean;
export type CheckedState = 'true' | 'false' | 'indeterminate';