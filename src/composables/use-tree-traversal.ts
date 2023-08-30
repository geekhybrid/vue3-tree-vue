import { TreeState, TreeViewItem, _InternalItem } from "@/types";

export const updateChildrenCheckState = (parent: TreeViewItem, state: TreeState): void => {
    if (!parent.children)return;

    parent.children.forEach(child => {
        child.checked = parent.checked;
        state.getNode(child.id!).indeterminate = false;
        updateChildrenCheckState(child, state);
    });
}

export const updateParentCheckState = (child: TreeViewItem, state: TreeState): void => {
    if (!child) return;
    const parent = state.getParent(child.id!);
    
    if (!parent) return;
    const parentNode = state.getNode(parent.id!);

    if (parent.children) {
      const isEveryChildChecked = parent.children.every(child => child.checked);
      const someUnChecked = parent.children.some(child => !child.checked);
      const someChecked = parent.children.some(child => child.checked || state.getNode(child.id!).indeterminate);
      const intermediate = someChecked && someUnChecked;  

      if (isEveryChildChecked) {
        parentNode.checked = true;
        parentNode.indeterminate = false;
      }
      else if (intermediate) {
        parentNode.checked = false;
        parentNode.indeterminate = true
      }
      else {
        parentNode.checked = false;
        parentNode.indeterminate = false;
      }
    }

    updateParentCheckState(parent, state);
}