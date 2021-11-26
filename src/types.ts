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

export interface TreeItemOptions {
    canRename: boolean;
    isCheckable: boolean;
}

export type TreeViewItemEvent = (item: TreeViewItem) => void;
export type IsValidDropCallback = (droppedItem: TreeViewItem, dropHost: TreeViewItem) => boolean;
export type CheckedState = 'True' | 'False' | 'Indeterminate';
export type SelectionMode = 'Single' | 'Multiple';
export type NodeType = 'Plain' | 'Checkbox';