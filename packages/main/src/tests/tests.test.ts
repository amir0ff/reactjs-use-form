import * as React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useForm } from '../index';
import type { ErrorType, FormModelType } from '../index';
import { emptyFormModel, formModel as errorsFormModel } from '../../../examples/src/formModel';

describe('🧮 general state change tests', () => {
  it('expect to return form initial state', () => {
    const { result } = renderHook(() => useForm(emptyFormModel, formSubmitCallback));
    expect(result.current.values).toHaveProperty('currentPassphrase');
    expect(result.current.values).toHaveProperty('newPassphrase');
    expect(result.current.values).toHaveProperty('verifyPassphrase');
    expect(result.current.errors.newPassphrase).toEqual(emptyError);
    expect(result.current.errors.verifyPassphrase).toEqual(emptyError);
    expect(result.current.isSubmitted).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.isDisabled).toBeTruthy();
  });

  it('expect to return changed input value', () => {
    const formModel: FormModelType = {
      name: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formModel, formSubmitCallback));
    const nameEvent = {
      currentTarget: {
        name: 'name',
        value: 'react_tester',
      },
    } as changeEvent;
    act(() => {
      result.current.handleOnChange(nameEvent);
    });
    expect(result.current.values.name).toEqual('react_tester');
  });

  it('expect to return enabled form', async () => {
    const formModel: FormModelType = {
      username: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formModel, formSubmitCallback));
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'username',
          value: '',
        },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'username',
          value: 'react_testers',
        },
      } as changeEvent);
    });
    
    // Wait for validation to complete
    await waitFor(() => {
      expect(result.current.isDisabled).toEqual(false);
    });
  });

  it('expect to return submitted form', async () => {
    const formModel: FormModelType = {
      message: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formModel, formSubmitCallback));
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'message',
          value: '',
        },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'message',
          value: 'my react hook testing message',
        },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnSubmit(submitEvent);
    });
    
    expect(result.current.isDisabled).toEqual(false);
  });
});

describe('🧮 errors state tests', () => {
  it('expect to return empty errors', async () => {
    const { result } = renderHook(() => useForm(emptyFormModel, formSubmitCallback));
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'currentPassphrase',
          value: '123457',
        },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'newPassphrase',
          value: '123456',
        },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'verifyPassphrase',
          value: '123456',
        },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnSubmit(submitEvent);
    });
    
    expect(result.current.errors).toEqual({
      currentPassphrase: emptyError,
      newPassphrase: emptyError,
      verifyPassphrase: emptyError,
    });
  });

  it('expect to return unmatched validator error', async () => {
    const { result } = renderHook(() => useForm(errorsFormModel, formSubmitCallback));
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'currentPassphrase',
          value: '123457',
        },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'newPassphrase',
          value: '123456',
        },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'verifyPassphrase',
          value: '654321',
        },
      } as changeEvent);
    });
    
    // Wait for validation to complete
    await waitFor(() => {
      expect(result.current.errors.verifyPassphrase).toHaveProperty('message', 'Passwords do not match');
    });
  });

  it('expect to return min length validator error', async () => {
    const { result } = renderHook(() => useForm(errorsFormModel, formSubmitCallback));
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'currentPassphrase',
          value: '123457',
        },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'newPassphrase',
          value: '12345',
        },
      } as changeEvent);
    });
    
    // Wait for validation to complete
    await waitFor(() => {
      expect(result.current.errors.newPassphrase).toHaveProperty(
        'message',
        'Password must be at least 6 characters long',
      );
    });
  });

  it('expect to return required error', async () => {
    const { result } = renderHook(() => useForm(errorsFormModel, formSubmitCallback));
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'currentPassphrase',
          value: '123457',
        },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'newPassphrase',
          value: '123456',
        },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: {
          name: 'verifyPassphrase',
          value: '',
        },
      } as changeEvent);
    });
    
    // Wait for validation to complete
    await waitFor(() => {
      expect(result.current.errors.verifyPassphrase).toHaveProperty('message', 'This field is required');
    });
  });
});

describe('🔄 reset functionality tests', () => {
  it('expect resetForm to reset all form state', async () => {
    const formModel: FormModelType = {
      username: {
        value: '',
        required: true,
      },
      email: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formModel, formSubmitCallback));
    
    // Change some values
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: { name: 'username', value: 'testuser' },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: { name: 'email', value: 'test@email.com' },
      } as changeEvent);
    });
    
    // Verify values changed
    expect(result.current.values.username).toEqual('testuser');
    expect(result.current.values.email).toEqual('test@email.com');
    expect(result.current.isDirty).toBeTruthy();
    
    // Reset form
    await act(async () => {
      result.current.resetForm();
    });
    
    // Verify form is reset
    expect(result.current.values.username).toEqual('');
    expect(result.current.values.email).toEqual('');
    expect(result.current.isDirty).toBeFalsy();
    expect(result.current.isSubmitted).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();
  });

  it('expect resetField to reset specific field only', async () => {
    const formModel: FormModelType = {
      username: {
        value: '',
        required: true,
      },
      email: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formModel, formSubmitCallback));
    
    // Change both values
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: { name: 'username', value: 'testuser' },
      } as changeEvent);
    });
    
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: { name: 'email', value: 'test@email.com' },
      } as changeEvent);
    });
    
    // Reset only username
    await act(async () => {
      result.current.resetField('username');
    });
    
    // Verify only username is reset
    expect(result.current.values.username).toEqual('');
    expect(result.current.values.email).toEqual('test@email.com');
  });
});

describe('⏳ submission state tests', () => {
  it('expect form to handle async submission correctly', async () => {
    const asyncCallback = vi.fn().mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );
    
    const formModel: FormModelType = {
      username: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formModel, asyncCallback));
    
    // Fill form and wait for validation to complete
    await act(async () => {
      result.current.handleOnChange({
        currentTarget: { name: 'username', value: 'testuser' },
      } as changeEvent);
    });
    
    // Wait for form to become valid and enabled
    await waitFor(() => {
      expect(result.current.isDisabled).toBeFalsy();
    });
    
    // Verify initial state before submission
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.isSubmitted).toBeFalsy();
    
    // Submit form and wait for completion
    await act(async () => {
      await result.current.handleOnSubmit(submitEvent);
    });
    
    // Verify final state after submission
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.isSubmitted).toBeTruthy();
    expect(asyncCallback).toHaveBeenCalledWith({ username: 'testuser' });
  });
});

const emptyError: ErrorType = { hasError: false, message: '' };

const formSubmitCallback = () => undefined;

const submitEvent = {
  preventDefault: () => undefined,
} as React.FormEvent<HTMLFormElement>;

type changeEvent = React.ChangeEvent<HTMLInputElement>;
