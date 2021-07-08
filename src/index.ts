import { useCallback, useEffect, useState } from 'react';
import {
  ErrorsType,
  ErrorType,
  FormInputType,
  FormSchemaType,
  IsDirtyType,
  IsRequiredType,
  useFormType,
  ValidatorFuncType,
  ValuesType,
  ValueType,
} from './types';


/**
 * Custom React hook for form management and input field validation
 *
 * @param {object} formSchema - initial form model with optional validation function.
 * @param {function} formSubmitCallback - function to run after form validation and submission.
 * @returns {{handleOnChange: function, handleOnSubmit: function, values: object, errors: object, isDisabled: boolean, isSubmitted: boolean}}
 **/
export function useForm(formSchema: FormSchemaType, formSubmitCallback: () => void): useFormType {
  const [values, setValues] = useState(initializeState(formSchema, 'values'));
  const [errors, setErrors] = useState(initializeState(formSchema, 'errors'));
  const [_isDirty, setIsDirty] = useState(initializeState(formSchema, '_isDirty'));
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [_isTouched, setIsTouched] = useState(false);

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
        const _isDirtyInput: FormInputType = formSchema[inputName];
        const inputValue: ValueType = values[inputName];
        error = _isDirtyInput.required && !inputValue ? requiredMessage : clearMessage;

        if (_isDirtyInput['validator']) {
          // proceed only if the input field has a validator function
          const _validatorFunc: ValidatorFuncType = _isDirtyInput['validator'];
          const validatorMessage: ErrorType = { hasError: true, message: _validatorFunc(inputValue, values) };
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
    const _isRequired = initializeState(formSchema, '_isRequired');
    // {_isRequired} is read-only and doesn't require a useState
    const isRequiredInputs = Object.keys(_isRequired).reduce((inputs: IsRequiredType, inputName: string) => {
      if (_isRequired[inputName]) inputs[inputName] = _isRequired[inputName];
      return inputs;
    }, {});

    const formHasErrors = () => Object.values(errors).some((error: any) => error.hasError);
    const isRequiredInputEmpty = () => Object.keys(isRequiredInputs).some((key: string) => !values[key]);

    return formHasErrors() || isRequiredInputEmpty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    /*
     this will be fired after every change in the errors
     state to be able to enable/disable the submit button
    */
    if (_isTouched) {
      setIsDisabled(isFormInvalid());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const handleOnChange = useCallback(
    (event) => {
      setIsTouched(true);

      const inputName = event.target.name;
      const inputValue = event.target.value;

      if (formSchema[inputName]) {
        // proceed only if the change input exits in the formSchema
        setValues((values: ValuesType) => ({
          ...values,
          [inputName]: inputValue,
        }));
        if (_isDirty[inputName] === false) {
          // proceed only if input field is not dirty
          setIsDirty((_isDirty: IsDirtyType) => ({
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
  };
}

function initializeState(formSchema: FormSchemaType, state: string) {
  /*
   initialize an empty state for {errors} and {_isDirty} where
   {values} and {_isRequired} are pulled from the formSchema
  */
  switch (state) {
    case 'values':
      return Object.keys(formSchema).reduce((inputValues: ValuesType, inputName: string) => {
        inputValues[inputName] = formSchema[inputName]['value'];

        return inputValues;
      }, {});
    case 'errors':
      return Object.keys(formSchema).reduce((inputErrors: ErrorsType, inputName: string) => {
        inputErrors[inputName] = { hasError: false, message: '' };
        return inputErrors;
      }, {});
    case '_isDirty':
      return Object.keys(formSchema).reduce((dirtyInputs: IsDirtyType, inputName: string) => {
        dirtyInputs[inputName] = false;
        return dirtyInputs;
      }, {});
    case '_isRequired':
      // requiredInputs is set to any because {_isRequired} is read-only and initially undefined
      return Object.keys(formSchema).reduce((requiredInputs: any, inputName: string) => {
        requiredInputs[inputName] = formSchema[inputName]['required'];
        return requiredInputs;
      }, {});
  }
}

export {
  ErrorsType,
  ErrorType,
  FormInputType,
  FormSchemaType,
  IsDirtyType,
  IsRequiredType,
  useFormType,
  ValidatorFuncType,
  ValuesType,
  ValueType,
};
