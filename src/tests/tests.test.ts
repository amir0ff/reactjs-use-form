import * as React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { ErrorType, FormModelType, useForm } from '../index';
import { emptyFormModel, formModel as errorsFormModel } from '../../examples/src/formModel';

describe('🧮 general state change tests', () => {
  it('expect to return form initial state', () => {
    const { result } = renderHook(() => useForm(emptyFormModel, formSubmitCallback));
    expect(result.current.values).toHaveProperty('currentPassphrase');
    expect(result.current.values).toHaveProperty('newPassphrase');
    expect(result.current.values).toHaveProperty('verifyPassphrase');
    expect(result.current.errors.newPassphrase).toEqual(emptyError);
    expect(result.current.errors.verifyPassphrase).toEqual(emptyError);
    expect(result.current.isSubmitted).toBeFalsy();
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
    const emptyUsernameEvent = {
      currentTarget: {
        name: 'username',
        value: '',
      },
    } as changeEvent;
    const userNameEvent = {
      currentTarget: {
        name: 'username',
        value: 'react_testers',
      },
    } as changeEvent;
    act(() => {
      result.current.handleOnChange(emptyUsernameEvent);
    });
    act(() => {
      result.current.handleOnChange(userNameEvent);
    });
    await expect(result.current.isDisabled).toEqual(false);
  });
  it('expect to return submitted form', async () => {
    const formModel: FormModelType = {
      message: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formModel, formSubmitCallback));
    const emptyMessageEvent = {
      currentTarget: {
        name: 'message',
        value: '',
      },
    } as changeEvent;
    const messageEvent = {
      currentTarget: {
        name: 'message',
        value: 'my react hook testing message',
      },
    } as changeEvent;
    act(() => {
      result.current.handleOnChange(emptyMessageEvent);
    });
    act(() => {
      result.current.handleOnChange(messageEvent);
    });
    act(() => {
      result.current.handleOnSubmit(submitEvent);
    });
    expect(result.current.isSubmitted).toEqual(true);
    await expect(result.current.isDisabled).toEqual(false);
  });
  it('expect to return enabled and submitted form', async () => {
    const formModel: FormModelType = {
      message: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formModel, formSubmitCallback));
    const emptyMessageEvent = {
      currentTarget: {
        name: 'message',
        value: '',
      },
    } as changeEvent;
    const messageEvent = {
      currentTarget: {
        name: 'message',
        value: 'my other react hook testing message',
      },
    } as changeEvent;
    act(() => {
      result.current.handleOnChange(emptyMessageEvent);
    });
    act(() => {
      result.current.handleOnChange(messageEvent);
    });
    act(() => {
      result.current.handleOnSubmit(submitEvent);
    });
    expect(result.current.isSubmitted).toEqual(true);
    await expect(result.current.isDisabled).toEqual(false);
  });
});

describe('🧮 errors state tests', () => {
  it('expect to return empty errors', () => {
    const { result } = renderHook(() => useForm(emptyFormModel, formSubmitCallback));
    const currentPassphrase = {
      currentTarget: {
        name: 'currentPassphrase',
        value: '123457',
      },
    } as changeEvent;
    const newPassphrase = {
      currentTarget: {
        name: 'newPassphrase',
        value: '123456',
      },
    } as changeEvent;
    const verifyPassphrase = {
      currentTarget: {
        name: 'verifyPassphrase',
        value: '123456',
      },
    } as changeEvent;
    act(() => {
      result.current.handleOnChange(currentPassphrase);
    });
    act(() => {
      result.current.handleOnChange(newPassphrase);
    });
    act(() => {
      result.current.handleOnChange(verifyPassphrase);
    });
    act(() => {
      result.current.handleOnSubmit(submitEvent);
    });
    expect(result.current.errors).toEqual({
      currentPassphrase: emptyError,
      newPassphrase: emptyError,
      verifyPassphrase: emptyError,
    });
  });
  it('expect to return unmatched validator error', () => {
    const { result } = renderHook(() => useForm(errorsFormModel, formSubmitCallback));
    const currentPassphrase = {
      currentTarget: {
        name: 'currentPassphrase',
        value: '123457',
      },
    } as changeEvent;
    const newPassphrase = {
      currentTarget: {
        name: 'newPassphrase',
        value: '123456',
      },
    } as changeEvent;
    const verifyPassphrase = {
      currentTarget: {
        name: 'verifyPassphrase',
        value: '654321',
      },
    } as changeEvent;
    act(() => {
      result.current.handleOnChange(currentPassphrase);
    });
    act(() => {
      result.current.handleOnChange(newPassphrase);
    });
    act(() => {
      result.current.handleOnChange(verifyPassphrase);
    });
    act(() => {
      expect(result.current.errors.verifyPassphrase).toHaveProperty(
        'message',
        'Passwords do not match',
      );
    });
  });
  it('expect to return min length validator error', () => {
    const { result } = renderHook(() => useForm(errorsFormModel, formSubmitCallback));
    const currentPassphrase = {
      currentTarget: {
        name: 'currentPassphrase',
        value: '123457',
      },
    } as changeEvent;
    const newPassphrase = {
      currentTarget: {
        name: 'newPassphrase',
        value: '12345',
      },
    } as changeEvent;
    act(() => {
      result.current.handleOnChange(currentPassphrase);
    });
    act(() => {
      result.current.handleOnChange(newPassphrase);
    });
    act(() => {
      expect(result.current.errors.newPassphrase).toHaveProperty(
        'message',
        'Password must be at least 6 characters long',
      );
    });
  });
  it('expect to return required error', () => {
    const { result } = renderHook(() => useForm(errorsFormModel, formSubmitCallback));
    const currentPassphrase = {
      currentTarget: {
        name: 'currentPassphrase',
        value: '123457',
      },
    } as changeEvent;
    const newPassphrase = {
      currentTarget: {
        name: 'newPassphrase',
        value: '123456',
      },
    } as changeEvent;
    const emptyNewPassphrase = {
      currentTarget: {
        name: 'verifyPassphrase',
        value: '',
      },
    } as changeEvent;
    act(() => {
      result.current.handleOnChange(currentPassphrase);
    });
    act(() => {
      result.current.handleOnChange(newPassphrase);
    });
    act(() => {
      result.current.handleOnChange(emptyNewPassphrase);
    });
    act(() => {
      expect(result.current.errors.verifyPassphrase).toHaveProperty(
        'message',
        'This field is required',
      );
    });
  });
});

const emptyError: ErrorType = { hasError: false, message: '' };

const formSubmitCallback = () => undefined;

const submitEvent = {
  preventDefault: () => undefined,
} as React.FormEvent<HTMLFormElement>;

type changeEvent = React.ChangeEvent<HTMLInputElement>;
