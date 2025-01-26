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
    emitItemExpanded: jest.fn(),
    emitItemCollapsed: jest.fn()
  };

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
})
