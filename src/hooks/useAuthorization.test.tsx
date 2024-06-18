import { renderHook, act } from '@testing-library/react-hooks';
import { useAuthorization } from './useAuthorization';
import { LoginPayload } from '../types';

describe('useAuthorization', () => {
  it('should authorize with correct credentials', async () => {
    const handleSuccess = jest.fn();
    const handleError = jest.fn();

    const { result } = renderHook(() => useAuthorization({ handleSuccess, handleError }));

    const validPayload: LoginPayload = { email: 'tester@gmail.com', password: '12345678' };

    await act(async () => {
      await result.current.authorize(validPayload);
    });

    expect(result.current.isAuthorized).toBe(true);
    expect(handleSuccess).toHaveBeenCalledWith(validPayload);
    expect(handleError).not.toHaveBeenCalled();
  });

  it('should not authorize with incorrect credentials', async () => {
    const handleSuccess = jest.fn();
    const handleError = jest.fn();

    const { result } = renderHook(() => useAuthorization({ handleSuccess, handleError }));

    const invalidPayload: LoginPayload = { email: 'wrong@gmail.com', password: 'wrongpassword' };

    await act(async () => {
      try {
        await result.current.authorize(invalidPayload);
      } catch (error) {
        // expected to reject
      }
    });

    expect(result.current.isAuthorized).toBe(false);
    expect(handleSuccess).not.toHaveBeenCalled();
    expect(handleError).toHaveBeenCalled();
  });

  it('should logout successfully', async () => {
    const handleSuccess = jest.fn();
    const handleError = jest.fn();

    const { result } = renderHook(() => useAuthorization({ handleSuccess, handleError }));

    const validPayload: LoginPayload = { email: 'tester@gmail.com', password: '12345678' };

    await act(async () => {
      await result.current.authorize(validPayload);
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.isAuthorized).toBe(false);
  });
});