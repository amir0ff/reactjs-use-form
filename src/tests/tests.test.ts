import { act, renderHook } from '@testing-library/react-hooks';
import { ErrorType, FormSchemaType, useForm } from '../index';

const formSubmitCallback = jest.fn();
const persist = jest.fn();
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
    const newPassphrase: any = {
      persist,
      target: {
        name: 'newPassphrase',
        value: '123456',
      },
    };
    const verifyPassphrase: any = {
      persist: jest.fn(),
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
      } as any);
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
    const newPassphrase: any = {
      persist,
      target: {
        name: 'newPassphrase',
        value: '123456',
      },
    };
    const verifyPassphrase: any = {
      persist: jest.fn(),
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
    const newPassphrase: any = {
      persist,
      target: {
        name: 'newPassphrase',
        value: '123456',
      },
    };
    const emptyNewPassphrase: any = {
      persist: jest.fn(),
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
    const nameEvent: any = {
      persist,
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
    const emptyUsernameEvent: any = {
      // set to enable _
      persist,
      target: {
        name: 'username',
        value: '',
      },
    };
    const userNameEvent: any = {
      persist,
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
    const emptyMessageEvent: any = {
      persist,
      target: {
        name: 'message',
        value: '',
      },
    };
    const messageEvent: any = {
      persist,
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
      } as any);
    });
    expect(result.current.isSubmitted).toEqual(true);
  });
});
