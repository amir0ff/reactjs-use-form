import { renderHook, act } from '@testing-library/react-hooks';
import { useForm } from '../index';
import { ErrorType, FormSchemaType } from '../types';

const formSubmitCallback = jest.fn();
const persistFunc = jest.fn();
const emptyError: ErrorType = { 'hasError': false, 'message': '' };

describe('useForm hook test suite', () => {
  it('expect to return form initial state', () => {
    const formSchema: FormSchemaType = {
      newPassphrase: {
        value: '',
        required: true,
      },
      verifyPassphrase: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(
      () => useForm(formSchema, formSubmitCallback));
    expect(result.current.values).toHaveProperty('newPassphrase');
    expect(result.current.values).toHaveProperty('verifyPassphrase');
    expect(result.current.errors.newPassphrase).toEqual(emptyError);
    expect(result.current.errors.verifyPassphrase).toEqual(emptyError);
    expect(result.current.isSubmitted).toBeFalsy();
    expect(result.current.isDisabled).toBeTruthy();
  });
  it('expect to return empty errors', () => {
    const formSchema: FormSchemaType = {
      newPassphrase: {
        value: '',
        required: true,
      },
      verifyPassphrase: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formSchema, formSubmitCallback));
    const newPassphrase = {
      persistFunc: persistFunc,
      target: {
        name: 'newPassphrase',
        value: '123456',
      },
    };
    const verifyPassphrase = {
      persistFunc: jest.fn(),
      target: {
        name: 'verifyPassphrase',
        value: '123456',
      },
    };
    act(() => {
      result.current.handleOnChange(newPassphrase);
    });
    act(() => {
      result.current.handleOnChange(verifyPassphrase);
    });
    act(() => {
      result.current.handleOnSubmit({
        preventDefault: () => {
        },
      });
    });
    expect(result.current.errors).toEqual({
      newPassphrase: emptyError,
      verifyPassphrase: emptyError,
    });

  });
  it('expect to return validator errors', () => {
    const formSchema: FormSchemaType = {
      newPassphrase: {
        value: '',
        required: true,
      },
      verifyPassphrase: {
        value: '',
        required: true,
        validator: (passphrase, values) => {
          return passphrase !== values?.newPassphrase ? 'Password does not match' : '';
        },
      },
    };
    const { result } = renderHook(() => useForm(formSchema, formSubmitCallback));
    const newPassphrase = {
      persistFunc: persistFunc,
      target: {
        name: 'newPassphrase',
        value: '123456',
      },
    };
    const verifyPassphrase = {
      persistFunc: jest.fn(),
      target: {
        name: 'verifyPassphrase',
        value: '654321',
      },
    };
    act(() => {
      result.current.handleOnChange(newPassphrase);
      result.current.handleOnChange(verifyPassphrase);
    });
    act(() => {
      expect(result.current.errors.verifyPassphrase).toHaveProperty('message', 'Password does not match');
    });
  });
  it('expect to return required errors', () => {
    const formSchema: FormSchemaType = {
      newPassphrase: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formSchema, formSubmitCallback));
    const newPassphrase = {
      persistFunc: persistFunc,
      target: {
        name: 'newPassphrase',
        value: '123456',
      },
    };
    const emptyNewPassphrase = {
      persistFunc: jest.fn(),
      target: {
        name: 'newPassphrase',
        value: '',
      },
    };
    act(() => {
      result.current.handleOnChange(newPassphrase);
    });
    act(() => {
      result.current.handleOnChange(emptyNewPassphrase);
    });
    act(() => {
      expect(result.current.errors.newPassphrase).toHaveProperty('message', 'This field is required');
    });
  });
  it('expect to return changed input value', () => {
    const formSchema: FormSchemaType = {
      name: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formSchema, formSubmitCallback));
    const nameEvent = {
      persistFunc: persistFunc,
      target: {
        name: 'name',
        value: 'react_tester',
      },
    };
    act(() => {
      result.current.handleOnChange(nameEvent);
    });
    expect(result.current.values.name).toEqual('react_tester');
  });
  it('expect to return enabled form', async () => {
    const formSchema: FormSchemaType = {
      username: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formSchema, formSubmitCallback));
    const emptyUsernameEvent = {
      // set to enable _
      persistFunc: persistFunc,
      target: {
        name: 'username',
        value: '',
      },
    };
    const userNameEvent = {
      persistFunc: persistFunc,
      target: {
        name: 'username',
        value: 'react_testers',
      },
    };
    act(() => {
      result.current.handleOnChange(emptyUsernameEvent);
    });
    act(() => {
      result.current.handleOnChange(userNameEvent);
    });
    expect(result.current.isDisabled).toEqual(false);
  });
  it('expect to return submitted form', () => {
    const formSchema: FormSchemaType = {
      message: {
        value: '',
        required: true,
      },
    };
    const { result } = renderHook(() => useForm(formSchema, formSubmitCallback));
    const emptyMessageEvent = {
      persistFunc: persistFunc,
      target: {
        name: 'message',
        value: '',
      },
    };
    const messageEvent = {
      persistFunc: persistFunc,
      target: {
        name: 'message',
        value: 'my react hook testing message',
      },
    };
    act(() => {
      result.current.handleOnChange(emptyMessageEvent);
    });
    act(() => {
      result.current.handleOnChange(messageEvent);
    });
    act(() => {
      result.current.handleOnSubmit({
        preventDefault: () => {
        },
      });
    });
    expect(result.current.isSubmitted).toEqual(true);
  });
});
