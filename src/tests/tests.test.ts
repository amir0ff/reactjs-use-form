import { act, renderHook } from '@testing-library/react-hooks';
import { ErrorType, FormSchemaType, useForm } from '../index';

const formSubmitCallback = jest.fn();
const persist = jest.fn();
const emptyError: ErrorType = { 'hasError': false, 'message': '' };
const emptyFormSchema: FormSchemaType = {
  currentPassphrase: {
    value: '',
    required: true,
  },
  newPassphrase: {
    value: '',
    required: true,
  },
  verifyPassphrase: {
    value: '',
    required: true,
  },
};
const errorsFormSchema: FormSchemaType = {
  currentPassphrase: {
    value: '',
    required: true,
  },
  newPassphrase: {
    value: '',
    required: true,
    validator: (newPassphrase, values) => {
      if (newPassphrase === values?.currentPassphrase) {
        return 'New password must be different from current password';
      } else if (newPassphrase !== values?.verifyPassphrase) {
        return 'Passwords do not match';
      } else return '';
    },
  },
  verifyPassphrase: {
    value: '',
    required: true,
    validator: (passphrase, values) => {
      return passphrase !== values?.newPassphrase ? 'Passwords do not match' : '';
    },
  },
};

describe('useForm hook test suite', () => {
  it('expect to return form initial state', () => {
    const { result } = renderHook(
      () => useForm(emptyFormSchema, formSubmitCallback));
    expect(result.current.values).toHaveProperty('currentPassphrase');
    expect(result.current.values).toHaveProperty('newPassphrase');
    expect(result.current.values).toHaveProperty('verifyPassphrase');
    expect(result.current.errors.newPassphrase).toEqual(emptyError);
    expect(result.current.errors.verifyPassphrase).toEqual(emptyError);
    expect(result.current.isSubmitted).toBeFalsy();
    expect(result.current.isDisabled).toBeTruthy();
  });
  it('expect to return empty errors', () => {
    const { result } = renderHook(() => useForm(emptyFormSchema, formSubmitCallback));
    const currentPassphrase: any = {
      persist,
      target: {
        name: 'currentPassphrase',
        value: '123457',
      },
    };
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
      result.current.handleOnChange(currentPassphrase);
    });
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
      currentPassphrase: emptyError,
      newPassphrase: emptyError,
      verifyPassphrase: emptyError,
    });

  });
  it('expect to return validator errors', () => {
    const { result } = renderHook(() => useForm(errorsFormSchema, formSubmitCallback));
    const currentPassphrase: any = {
      persist,
      target: {
        name: 'currentPassphrase',
        value: '123457',
      },
    };
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
      result.current.handleOnChange(currentPassphrase);
    });
    act(() => {
      result.current.handleOnChange(newPassphrase);
    });
    act(() => {
      result.current.handleOnChange(verifyPassphrase);
    });
    act(() => {
      expect(result.current.errors.verifyPassphrase).toHaveProperty('message', 'Passwords do not match');
    });
  });
  it('expect to return required errors', () => {
    const { result } = renderHook(() => useForm(errorsFormSchema, formSubmitCallback));
    const currentPassphrase: any = {
      persist,
      target: {
        name: 'currentPassphrase',
        value: '123457',
      },
    };
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
        name: 'verifyPassphrase',
        value: '',
      },
    };
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
      expect(result.current.errors.verifyPassphrase).toHaveProperty('message', 'This field is required');
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
