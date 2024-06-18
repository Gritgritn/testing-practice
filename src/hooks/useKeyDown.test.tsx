import { fireEvent } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useKeyDown } from 'hooks/useKeyDown';

describe('useKeyDown', () => {
  it('should call the handler when the specified key is pressed', () => {
    const handleClose = jest.fn();
    renderHook(() => useKeyDown(['Escape'], handleClose));

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should not call the handler when a different key is pressed', () => {
    const handleClose = jest.fn();
    renderHook(() => useKeyDown(['Escape'], handleClose));

    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });

    expect(handleClose).not.toHaveBeenCalled();
  });
});