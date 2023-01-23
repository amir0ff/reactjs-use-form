import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";

/**
 * Reactive form management and input field validation hook
 *
 * @param {object} formModel - initial form model with optional validation function.
 * @param {function} formSubmitCallback - function to run after form validation and submission.
 * @returns {{handleOnChange: function, handleOnSubmit: function, values: object, errors: object, isDisabled: boolean, isSubmitted: boolean, isDirty: boolean}}
 **/
export function useForm(formModel: FormModelType, formSubmitCallback: () => void): useFormType {
  const [values, setValues] = useState(initializeState(formModel, 'values'));
  const [errors, setErrors] = useState(initializeState(formModel, 'errors'));
  const [_isDirty, _setIsDirty] = useState(initializeState(formModel, '_isDirty'));
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [_isTouched, _setIsTouched] = useState(false);

  useEffect(() => {
    /*
     validate all dirty input field via the validator
     function when the values state changes
    */
    if (_isTouched) {
      const isDirtyInputs = Object.keys(_isDirty).reduce((inputs: IsDirtyType, inputName: string) => {
        if (_isDirty[inputName]) inputs[inputName] = _isDirty[inputName];
        return inputs;
      }, {});

      Object.keys(isDirtyInputs).forEach((inputName: string) => {
        let error: ErrorType;
        const requiredMessage: ErrorType = { hasError: true, message: 'This field is required' };
        const clearMessage: ErrorType = { hasError: false, message: '' };
        const _isDirtyInput: FormInputType = formModel[inputName];
        const inputValue: ValueType = values[inputName];
        error = _isDirtyInput.required && !inputValue ? requiredMessage : clearMessage;

        if (_isDirtyInput['validator']) {
          // proceed only if the input field has a validator function
          const _validatorFunc: ValidatorFuncType = _isDirtyInput['validator'];
          const validatorMessage: ErrorType = {
            hasError: true,
            message: _validatorFunc(inputValue, values),
          };
          const errorMessage: ErrorType = inputValue ? validatorMessage : requiredMessage;
          error = _validatorFunc(inputValue, values) ? errorMessage : clearMessage;
        }
        if (errors[inputName].message !== error.message) {
          // proceed only after comparing previous error message value and current value
          setErrors((errors: ErrorsType) => ({
            ...errors,
            [inputName]: error,
          }));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const isFormInvalid = useCallback(() => {
    /*
     the form will be invalid if one of its fields
     has some errors or a required input field is empty
    */
    const _isRequired = initializeState(formModel, '_isRequired');
    // {_isRequired} is read-only and doesn't require a useState
    const isRequiredInputs = Object.keys(_isRequired).reduce((inputs: IsRequiredType, inputName: string) => {
      if (_isRequired[inputName]) inputs[inputName] = _isRequired[inputName];
      return inputs;
    }, {});

    const formHasErrors = () => Object.values(errors).some((error: any) => error.hasError);
    const isRequiredInputEmpty = () => Object.keys(isRequiredInputs).some((key: string) => !values[key]);

    return formHasErrors() || isRequiredInputEmpty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, values]);

  useEffect(() => {
    /*
     this will be fired after every change in the errors
     state to be able to enable/disable the submit button
    */
    if (_isTouched) {
      setIsDisabled(isFormInvalid());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, values]);

  const handleOnChange = useCallback(
    (event) => {
      _setIsTouched(true);

      const inputName = event.currentTarget?.name || event.target?.name;
      const inputValue = event.currentTarget?.value || event.target?.value;

      if (formModel[inputName]) {
        setIsDirty(true);

        // proceed only if the change input exits in the formModel
        setValues((values: ValuesType) => ({
          ...values,
          [inputName]: inputValue,
        }));
        if (_isDirty[inputName] === false) {
          // proceed only if input field is not dirty
          _setIsDirty((_isDirty: IsDirtyType) => ({
            ..._isDirty,
            [inputName]: true,
          }));
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [values],
  );

  const handleOnSubmit = useCallback(
    (event) => {
      event.preventDefault();

      if (!isFormInvalid()) {
        formSubmitCallback();
        setIsSubmitted(true);
        setIsDirty(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFormInvalid, values],
  );

  return {
    handleOnChange,
    handleOnSubmit,
    values,
    errors,
    isSubmitted,
    isDisabled,
    isDirty,
  };
}

function initializeState(formModel: FormModelType, state: string) {
  /*
   initialize a default state for {errors} and {_isDirty} where
   {values} and {_isRequired} are pulled from the formModel
  */
  switch (state) {
    case 'values':
      return Object.keys(formModel).reduce((inputValues: ValuesType, inputName: string) => {
        inputValues[inputName] = formModel[inputName]['value'];

        return inputValues;
      }, {});
    case 'errors':
      return Object.keys(formModel).reduce((inputErrors: ErrorsType, inputName: string) => {
        inputErrors[inputName] = { hasError: false, message: '' };
        return inputErrors;
      }, {});
    case '_isDirty':
      return Object.keys(formModel).reduce((dirtyInputs: IsDirtyType, inputName: string) => {
        dirtyInputs[inputName] = false;
        return dirtyInputs;
      }, {});
    case '_isRequired':
      return Object.keys(formModel).reduce((requiredInputs: IsRequiredType, inputName: string) => {
        requiredInputs[inputName] = formModel[inputName]['required'];
        return requiredInputs;
      }, {});
    default:
      return {} as any;
  }
}

// type declarations: tsc will create .d.ts on build run time
export type useFormType = {
  handleOnChange: any; // HandleOnChangeType @TODO upgrade to MUI5
  handleOnSubmit: HandleOnSubmitType;
  values: ValuesType;
  errors: ErrorsType;
  isSubmitted: boolean;
  isDisabled: boolean;
  isDirty: boolean;
};

type HandleOnChangeType = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
type HandleOnSubmitType = (event: FormEvent<HTMLFormElement>) => void;

type ValidatorFuncType = (value: ValueType, values?: ValuesType) => string;

export type FormModelType = {
  [key: string]: FormInputType;
};

export type FormInputType = {
  value: ValueType;
  required: boolean;
  validator?: ValidatorFuncType;
};

type IsDirtyType = {
  [key: string]: boolean;
};

type IsRequiredType = {
  [key: string]: boolean;
};

export type ValueType = string;

export type ValuesType = {
  [key: string]: ValueType;
};

export type ErrorType = {
  hasError: boolean;
  message: string;
};

export type ErrorsType = {
  [key: string]: ErrorType;
};
