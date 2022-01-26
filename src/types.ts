export interface TreeViewItem {
    children?: TreeViewItem[]
    type: string
    checkedStatus?: CheckedState,
    name: string,
    data?: any,
    id: string
}

export interface ItemEventArgs {
    item: TreeViewItem,
    change: CheckedState | SelectState
}

export interface TreeState {
    getParent(childId: string): TreeViewItem | undefined;
    trackNode(childNode: TreeViewItem, parentNode: TreeViewItem): void;
    untrackNode(childNode: TreeViewItem): void;
    emitItemSelected(node: TreeViewItem): void;
    emitItemCheckedChange(node: TreeViewItem): void;
    isNodeExpanded(id: string, type: string): boolean;
}

export interface TreeEvents {
    updateMultiSelectedItems(): void;
    updateSingleSelectedItem(): void;
}

export type IsValidDropCallback = (droppedItem: TreeViewItem, dropHost: TreeViewItem) => boolean;
export type CheckedState = 'true' | 'false' | 'indeterminate';
export type SelectState = 'selected' | 'unselected';