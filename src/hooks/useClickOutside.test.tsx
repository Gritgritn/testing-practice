import { renderHook } from '@testing-library/react-hooks';
import userEvent from '@testing-library/user-event';
import { useClickOutside } from 'hooks/useClickOutside';

describe('useClickOutside', () => {
  it('should call the handler when clicking outside the ref element', () => {
    const handleClose = jest.fn();
    const ref = { current: document.createElement('div') };
    document.body.appendChild(ref.current);

    renderHook(() => useClickOutside(handleClose, ref));

    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
    userEvent.click(outsideElement);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should not call the handler when clicking inside the ref element', () => {
    const handleClose = jest.fn();
    const ref = { current: document.createElement('div') };
    document.body.appendChild(ref.current);

    renderHook(() => useClickOutside(handleClose, ref));

    userEvent.click(ref.current);

    expect(handleClose).not.toHaveBeenCalled();
  });
});