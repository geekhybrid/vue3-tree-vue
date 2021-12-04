import { TreeState, TreeViewItem } from "@/types";

/**
 * This recursive call is used to traverse a folder looking for all children of a particular type
 * @param parent
 * @param expectedType 
 * @returns 
 */
export const findChildrenOfType = (parent: TreeViewItem, expectedType: string): TreeViewItem[] => {
    const children: TreeViewItem[] = [];
    if (!parent.children) return children;

    parent.children.forEach(TreeViewItem  => {
        if (TreeViewItem.type === expectedType) {
            children.push(TreeViewItem);
        }

        if (TreeViewItem.type === 'folder'){
            children.push(...findChildrenOfType(TreeViewItem, expectedType));
        }
    });

    return children;
}

export const cascadeStateToDescendants = (item: TreeViewItem, state: TreeState): void => {
    item.children?.forEach(child => {
        child.checkedStatus = item.checkedStatus;
        state.emitItemCheckedChange(child);
        cascadeStateToDescendants(child, state);
    })
}

export const notifyParentOfSelection = (child: TreeViewItem, state: TreeState): void => {
    if (!child) return;
    const parent = state.getParent(child.id);
    
    if (!parent) return;

    const isEveryChildChecked = parent.children?.every(child => child.checkedStatus == 'true');
    const hasIntermediate = parent.children?.some(child => child.checkedStatus == 'indeterminate');
    const hasAnUncheckedChild = parent.children?.some(child => child.checkedStatus == 'false' || !child.checkedStatus);
    const hasACheckedChild = parent.children?.some(child => child.checkedStatus == 'true');    

    if (isEveryChildChecked) {
        parent.checkedStatus = 'true';
    }
    else if (hasIntermediate || (hasAnUncheckedChild && hasACheckedChild)) {
        parent.checkedStatus = 'indeterminate';
    } else {
        parent.checkedStatus = 'false';
    }

    state.emitItemCheckedChange(parent);
    notifyParentOfSelection(parent, state);
}