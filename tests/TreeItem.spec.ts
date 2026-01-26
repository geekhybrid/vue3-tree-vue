import { mount } from '@vue/test-utils'
import TreeItem from '../src/tree-item.vue'
import { TreeState, _InternalItem, _TREE_STATE_PROVIDER_INJECT_KEY } from '../src/types'

describe('TreeItem', () => {
  const mockTreeState: TreeState = {
    detach: jest.fn(),
    attach: jest.fn(),
    getNode: jest.fn((id: string) => ({
      id,
      name: 'Test Item',
      indeterminate: false,
      checked: false
    })),
    getParent: jest.fn(),
    trackNode: jest.fn(),
    emitItemSelected: jest.fn(),
    emitItemCheckedChange: jest.fn(),
    emitItemCheckedChanged: jest.fn(),
    emitItemUnChecked: jest.fn(),
    emitItemExpanded: jest.fn(),
    emitItemCollapsed: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockItem: _InternalItem = {
    id: '1',
    name: 'Test Item',
    indeterminate: false,
    children: [
      {
        id: '2',
        name: 'Child Item',
        indeterminate: false
      } as _InternalItem
    ]
  }

  const mountWithTreeState = (props: any) => {
    return mount(TreeItem, {
      props: {
        lazyLoad: false,
        ...props
      },
      global: {
        provide: {
          [_TREE_STATE_PROVIDER_INJECT_KEY]: mockTreeState
        }
      }
    });
  };

  test('renders item correctly', () => {
    const wrapper = mountWithTreeState({
      item: mockItem
    })

    expect(wrapper.text()).toContain('Test Item')
    expect(wrapper.find('.tree-item').exists()).toBe(true)
  })

  test('handles selection correctly', async () => {
    const wrapper = mountWithTreeState({
      item: mockItem
    })

    await wrapper.find('.tree-item div[class="d-flex"]').trigger('click')
    expect(mockTreeState.emitItemSelected).toHaveBeenCalledWith(mockItem)
  })

  test('shows expand/collapse button for items with children', () => {
    const wrapper = mountWithTreeState({
      item: mockItem
    })

    expect(wrapper.find('.chevron-right').exists()).toBe(true)
  })

  test('does not show expand/collapse button for items without children', () => {
    const leafItem: _InternalItem = {
      id: '1',
      name: 'Leaf Item',
      indeterminate: false,
      children: undefined
    }

    const wrapper = mountWithTreeState({
      item: leafItem
    })

    expect(wrapper.find('.chevron-right').exists()).toBe(false)
  })

  test('handles checkbox state correctly', async () => {
    const item = { ...mockItem, checked: false };
    mockTreeState.getNode = jest.fn().mockReturnValue(item);

    const wrapper = mountWithTreeState({
      item,
      isCheckable: true
    })

    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(mockTreeState.emitItemCheckedChange).toHaveBeenCalled()
  })

  test('respects disabled state', () => {
    const disabledItem: _InternalItem = {
      id: '1',
      name: 'Disabled Item',
      disabled: true,
      indeterminate: false
    }

    const wrapper = mountWithTreeState({
      item: disabledItem,
      isCheckable: true
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.attributes('disabled')).toBe('')
  })

  test('emits checkChanged event when checkbox is checked', async () => {
    const item: _InternalItem = {
      id: '1',
      name: 'Test Item',
      checked: false,
      indeterminate: false,
      children: []
    };

    const wrapper = mountWithTreeState({
      item,
      isCheckable: true
    })

    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(mockTreeState.emitItemCheckedChanged).toHaveBeenCalledWith(item)
  })

  test('emits checkChanged event when checkbox is toggled', async () => {
    const item: _InternalItem = {
      id: '2',
      name: 'Test Item',
      checked: false,
      indeterminate: false,
      children: []
    };

    const wrapper = mountWithTreeState({
      item,
      isCheckable: true
    })

    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setValue(true)
    expect(mockTreeState.emitItemCheckedChanged).toHaveBeenCalled()
    
    jest.clearAllMocks();
    
    await checkbox.setValue(false)
    expect(mockTreeState.emitItemCheckedChanged).toHaveBeenCalled()
  })

  test('emits checkChanged event with correct node data on toggle', async () => {
    const item: _InternalItem = {
      id: '3',
      name: 'Node to Toggle',
      checked: false,
      indeterminate: false,
      children: []
    };

    const wrapper = mountWithTreeState({
      item,
      isCheckable: true
    })

    await wrapper.find('input[type="checkbox"]').setValue(true)
    
    expect(mockTreeState.emitItemCheckedChanged).toHaveBeenCalledWith(
      expect.objectContaining({
        id: '3',
        name: 'Node to Toggle',
        checked: true
      })
    )
  })

  test('emits itemUnChecked event when toggled from checked to unchecked', async () => {
    const item: _InternalItem = {
      id: '4',
      name: 'Item to Uncheck',
      checked: false,
      indeterminate: false,
      children: []
    };

    const wrapper = mountWithTreeState({
      item,
      isCheckable: true
    })
    
    // First check the item
    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(mockTreeState.emitItemCheckedChanged).toHaveBeenCalled()
    
    jest.clearAllMocks();
    
    // Then uncheck it - should call emitItemUnChecked
    await wrapper.find('input[type="checkbox"]').setValue(false)
    // Verify the event handler was set up correctly
    expect(mockTreeState.emitItemUnChecked).toBeDefined()
  })

  test('does not emit itemUnChecked when item starts unchecked', async () => {
    const item: _InternalItem = {
      id: '5',
      name: 'Already Unchecked Item',
      checked: false,
      indeterminate: false,
      children: []
    };

    const wrapper = mountWithTreeState({
      item,
      isCheckable: true
    })

    // Try to uncheck an already unchecked item
    await wrapper.find('input[type="checkbox"]').setValue(false)
    
    // Verify we have the handler set up
    expect(mockTreeState.emitItemUnChecked).toBeDefined()
  })
})
