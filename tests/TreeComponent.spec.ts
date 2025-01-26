import { mount } from '@vue/test-utils'
import TreeComponent from '../src/tree-component.vue'
import { TreeState, _InternalItem, _TREE_STATE_PROVIDER_INJECT_KEY } from '../src/types'

describe('TreeComponent', () => {
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

  const mockItems: _InternalItem[] = [
    {
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
  ]

  const mountWithTreeState = (props: any) => {
    return mount(TreeComponent, {
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

  test('renders tree structure correctly', () => {
    const wrapper = mountWithTreeState({
      items: mockItems
    })
    
    expect(wrapper.find('.vue3-tree-vue').exists()).toBe(true)
    expect(wrapper.findAll('.tree-item')).toHaveLength(2) // Test Item + Child Item
  })

  test('handles item selection correctly', async () => {
    const wrapper = mountWithTreeState({
      items: mockItems
    })

    await wrapper.find('.tree-item div[class="d-flex"]').trigger('click')
    expect(mockTreeState.emitItemSelected).toHaveBeenCalledWith(mockItems[0])
  })

  test('expands/collapses items correctly', async () => {
    const wrapper = mountWithTreeState({
      items: mockItems
    })

    const expandButton = wrapper.find('.chevron-right')
    await expandButton.trigger('click')

    expect(mockTreeState.emitItemExpanded).toHaveBeenCalledWith(mockItems[0])
  })

  test('handles checked state correctly', async () => {
    const item = { ...mockItems[0], checked: false };
    mockTreeState.getNode = jest.fn().mockReturnValue(item);

    const wrapper = mountWithTreeState({
      items: [item],
      isCheckable: true
    })

    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(mockTreeState.emitItemCheckedChange).toHaveBeenCalled()
  })

  test('respects disabled state', () => {
    const disabledItems: _InternalItem[] = [
      {
        id: '1',
        name: 'Disabled Item',
        disabled: true,
        indeterminate: false
      }
    ]

    const wrapper = mountWithTreeState({
      items: disabledItems,
      isCheckable: true
    })

    const checkbox = wrapper.find('input[type="checkbox"]')
    expect(checkbox.attributes('disabled')).toBe('')
  })
})
