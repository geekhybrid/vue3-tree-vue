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

export type IsValidDropCallback = (droppedItem: TreeViewItem, dropHost: TreeViewItem) => boolean;
export type CheckedState = 'True' | 'False' | 'Indeterminate';