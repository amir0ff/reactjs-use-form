import { act, renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useForm } from '../index';

// Mock form models for testing
const mockFormModel = {
  username: {
    value: '',
    required: true,
    validator: (value: string) => (value.length < 3 ? 'Username must be at least 3 characters' : ''),
  },
  email: {
    value: '',
    required: true,
    validator: (value: string) => (!value.includes('@') ? 'Invalid email address' : ''),
  },
};

const mockSubmitCallback = vi.fn();

// Mock event type for testing
type changeEvent = any;

describe('useForm Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

    expect(result.current.values).toEqual({
      username: '',
      email: '',
    });
    expect(result.current.errors).toEqual({
      username: { hasError: false, message: '' },
      email: { hasError: false, message: '' },
    });
    expect(result.current.isSubmitted).toBe(false);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.isDisabled).toBe(true);
    expect(result.current.isDirty).toBe(false);
  });

  it('should handle input changes correctly', async () => {
    const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

    await act(async () => {
      result.current.handleOnChange({
        target: {
          name: 'username',
          value: 'testuser',
        },
      } as changeEvent);
    });

    expect(result.current.values.username).toBe('testuser');
    expect(result.current.isDirty).toBe(true);
  });

  it('should validate required fields correctly', async () => {
    const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

    await act(async () => {
      result.current.handleOnChange({
        target: {
          name: 'username',
          value: '',
        },
      } as changeEvent);
    });

    expect(result.current.errors.username.hasError).toBe(true);
    expect(result.current.errors.username.message).toBe('This field is required');
  });

  it('should run custom validators correctly', async () => {
    const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

    await act(async () => {
      result.current.handleOnChange({
        target: {
          name: 'username',
          value: 'ab',
        },
      } as changeEvent);
    });

    expect(result.current.errors.username.hasError).toBe(true);
    expect(result.current.errors.username.message).toBe('Username must be at least 3 characters');
  });

  it('should clear errors when validation passes', async () => {
    const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

    // First set an error
    await act(async () => {
      result.current.handleOnChange({
        target: {
          name: 'username',
          value: 'ab',
        },
      } as changeEvent);
    });

    expect(result.current.errors.username.hasError).toBe(true);

    // Then fix it
    await act(async () => {
      result.current.handleOnChange({
        target: {
          name: 'username',
          value: 'testuser',
        },
      } as changeEvent);
    });

    expect(result.current.errors.username.hasError).toBe(false);
    expect(result.current.errors.username.message).toBe('');
  });

  it('should handle form submission correctly', async () => {
    const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

    // Fill form with valid data
    await act(async () => {
      result.current.handleOnChange({
        target: {
          name: 'username',
          value: 'testuser',
        },
      } as changeEvent);
    });

    await act(async () => {
      result.current.handleOnChange({
        target: {
          name: 'email',
          value: 'test@email.com',
        },
      } as changeEvent);
    });

    // Submit form
    await act(async () => {
      result.current.handleOnSubmit({
        preventDefault: vi.fn(),
      } as any);
    });

    expect(mockSubmitCallback).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@email.com',
    });
    expect(result.current.isSubmitted).toBe(true);
    expect(result.current.isDirty).toBe(false);
  });

  it('should prevent submission when form is invalid', async () => {
    const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

    // Submit without filling required fields
    await act(async () => {
      result.current.handleOnSubmit({
        preventDefault: vi.fn(),
      } as any);
    });

    expect(mockSubmitCallback).not.toHaveBeenCalled();
    expect(result.current.isSubmitted).toBe(false);
  });

  it('should handle form reset correctly', async () => {
    const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

    // Make some changes
    await act(async () => {
      result.current.handleOnChange({
        target: {
          name: 'username',
          value: 'testuser',
        },
      } as changeEvent);
    });

    expect(result.current.isDirty).toBe(true);

    // Reset form
    await act(async () => {
      result.current.resetForm();
    });

    expect(result.current.values).toEqual({
      username: '',
      email: '',
    });
    expect(result.current.errors).toEqual({
      username: { hasError: false, message: '' },
      email: { hasError: false, message: '' },
    });
    expect(result.current.isDirty).toBe(false);
    expect(result.current.isSubmitted).toBe(false);
  });

  it('should handle field reset correctly', async () => {
    const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

    // Make some changes
    await act(async () => {
      result.current.handleOnChange({
        target: {
          name: 'username',
          value: 'testuser',
        },
      } as changeEvent);
    });

    // Reset specific field
    await act(async () => {
      result.current.resetField('username');
    });

    expect(result.current.values.username).toBe('');
    expect(result.current.errors.username).toEqual({ hasError: false, message: '' });
  });

  describe('submission state tests', () => {
    it('should handle async submission correctly', async () => {
      const asyncSubmitCallback = vi.fn().mockResolvedValue(undefined);
      const { result } = renderHook(() => useForm(mockFormModel, asyncSubmitCallback));

      // Fill form with valid data
      await act(async () => {
        result.current.handleOnChange({
          target: {
            name: 'username',
            value: 'testuser',
          },
        } as changeEvent);
      });

      await act(async () => {
        result.current.handleOnChange({
          target: {
            name: 'email',
            value: 'test@example.com',
          },
        } as changeEvent);
      });

      const submitEvent = {
        preventDefault: vi.fn(),
      };

      await act(async () => {
        result.current.handleOnSubmit(submitEvent as any);
      });

      expect(asyncSubmitCallback).toHaveBeenCalled();
      expect(result.current.isSubmitted).toBe(true);
      expect(result.current.isSubmitting).toBe(false);
    });
  });

  describe('reset functionality tests', () => {
    it('should reset specific field only', async () => {
      const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'username', value: 'testuser' },
        } as changeEvent);
      });

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'email', value: 'test@email.com' },
        } as changeEvent);
      });

      await act(async () => {
        result.current.resetField('username');
      });

      expect(result.current.values.username).toBe('');
      expect(result.current.values.email).toBe('test@email.com');
    });

    it('should reset all form state', async () => {
      const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'username', value: 'testuser' },
        } as changeEvent);
      });

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'email', value: 'test@email.com' },
        } as changeEvent);
      });

      await act(async () => {
        result.current.resetForm();
      });

      expect(result.current.values).toEqual({
        username: '',
        email: '',
      });
      expect(result.current.isDirty).toBe(false);
      expect(result.current.isSubmitted).toBe(false);
    });
  });

  describe('errors state tests', () => {
    it('should return required error', async () => {
      const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'username', value: 'testuser' },
        } as changeEvent);
      });

      expect(result.current.errors.username.hasError).toBe(false);
    });

    it('should return min length validator error', async () => {
      const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'username', value: 'ab' },
        } as changeEvent);
      });

      expect(result.current.errors.username.hasError).toBe(true);
      expect(result.current.errors.username.message).toBe('Username must be at least 3 characters');
    });

    it('should return unmatched validator error', async () => {
      const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'email', value: 'invalid-email' },
        } as changeEvent);
      });

      expect(result.current.errors.email.hasError).toBe(true);
      expect(result.current.errors.email.message).toBe('Invalid email address');
    });

    it('should return empty errors', async () => {
      const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'username', value: 'testuser' },
        } as changeEvent);
      });

      expect(result.current.errors.username.hasError).toBe(false);
      expect(result.current.errors.username.message).toBe('');
    });
  });

  describe('general state change tests', () => {
    it('should return submitted form', async () => {
      const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'username', value: 'testuser' },
        } as changeEvent);
      });

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'email', value: 'test@email.com' },
        } as changeEvent);
      });

      await act(async () => {
        result.current.handleOnSubmit({
          preventDefault: vi.fn(),
        } as any);
      });

      expect(result.current.isSubmitted).toBe(true);
    });

    it('should return enabled form', async () => {
      const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'username', value: 'testuser' },
        } as changeEvent);
      });

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'email', value: 'test@email.com' },
        } as changeEvent);
      });

      expect(result.current.isDisabled).toBe(false);
    });

    it('should return changed input value', async () => {
      const { result } = renderHook(() => useForm(mockFormModel, mockSubmitCallback));

      await act(async () => {
        result.current.handleOnChange({
          target: { name: 'username', value: 'testuser' },
        } as changeEvent);
      });

      expect(result.current.values.username).toBe('testuser');
    });
  });
});
