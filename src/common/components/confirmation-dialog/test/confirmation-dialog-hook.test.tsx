import { renderHook, act } from '@testing-library/react-hooks';
import { useConfirmationDialog } from '../confirmation-dialog.hook';

const emptyItem = {
  id: '',
  name: '',
};

describe('useConfirmationDialog tests', () => {
  test('should set initial values', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(emptyItem);
  });
  test('should open dialog on onOpenDialog', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(result.current.itemToDelete);
    });
    expect(result.current.isOpen).toBe(true);
  });
  test('should setItemToDelete on onOpenDialog', () => {
    const mockItem = { id: '1', name: 'test' };
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(mockItem);
    });
    expect(result.current.itemToDelete).toBe(mockItem);
  });
  test('should setItemToDelete to an empty lookup onAccept', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onAccept();
    });
    expect(result.current.itemToDelete).toEqual(emptyItem);
  });
  test('should close dialog onClose', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    act(() => {
      result.current.onOpenDialog(emptyItem);
    });
    expect(result.current.isOpen).toBe(true);
    act(() => {
      result.current.onClose();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
