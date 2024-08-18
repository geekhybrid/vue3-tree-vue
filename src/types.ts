export interface TreeViewItem {
  name: string;
  id?: string | number;
  children?: TreeViewItem[];
  checked?: boolean;
  selected?: boolean;
  expanded?: boolean;
  disabled?: boolean;
  meta?: any;
}

export type _InternalItem = TreeViewItem & {
  id: string;
  indeterminate: boolean;
}

export const _TREE_STATE_PROVIDER_INJECT_KEY = "VUE3_TREE_VUE_TREE_STATE";

export interface TreeState {
    detach(id: string): void;
    attach(item: _InternalItem): void;
    getNode(id: string | number): _InternalItem;
    getParent(childId: string | number): TreeViewItem | undefined;
    trackNode(childNode: TreeViewItem, parentNode: TreeViewItem | undefined): void;
    emitItemSelected(node: TreeViewItem): void;
    emitItemCheckedChange(): void;
    emitItemExpanded(expandedItem: TreeViewItem): void;
    emitItemCollapsed(collapsedItem: TreeViewItem): void;
}

export interface TreeEvents {
    updateMultiSelectedItems(): void;
    updateSingleSelectedItem(): void;
}

export type IsValidDropCallback = (droppedItem: TreeViewItem, dropHost: TreeViewItem | undefined) => Promise<boolean>;