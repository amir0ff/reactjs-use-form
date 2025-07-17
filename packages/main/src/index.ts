import { useCallback, useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

/**
 * Reactive form management and input field validation hook
 *
 * @param {object} formModel - initial form model with optional validation function.
 * @param {function} formSubmitCallback - function to run after form validation and submission.
 * @returns {object} Form state and handlers including values, errors, submission state, and utility functions
 **/
export function useForm<T extends Record<string, any> = Record<string, any>>(
  formModel: FormModelType<T>,
  formSubmitCallback: (values: T) => void | Promise<void>
): useFormType<T> {
  const [values, setValues] = useState<T>(() => initializeState(formModel, 'values') as T);
  const [errors, setErrors] = useState<ErrorsType<T>>(() => initializeState(formModel, 'errors') as ErrorsType<T>);
  const [_isDirty, _setIsDirty] = useState<IsDirtyType<T>>(() => initializeState(formModel, '_isDirty') as IsDirtyType<T>);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [_isTouched, _setIsTouched] = useState(false);

  useEffect(() => {
    /*
     validate all dirty input field via the validator
     function when the values state changes
    */
    if (_isTouched) {
      const isDirtyInputs = Object.keys(_isDirty).reduce((inputs: IsDirtyType<T>, inputName: string) => {
        if (_isDirty[inputName]) inputs[inputName] = _isDirty[inputName];
        return inputs;
      }, {} as IsDirtyType<T>);

      Object.keys(isDirtyInputs).forEach((inputName: string) => {
        let error: ErrorType;
        const requiredMessage: ErrorType = { hasError: true, message: 'This field is required' };
        const clearMessage: ErrorType = { hasError: false, message: '' };
        const _isDirtyInput: FormInputType<T> = formModel[inputName];
        const inputValue: ValueType = values[inputName];
        
        // Check required validation first
        error = _isDirtyInput.required && !inputValue ? requiredMessage : clearMessage;

        if (_isDirtyInput['validator']) {
          const _validatorFunc: ValidatorFuncType<T> = _isDirtyInput['validator'];
          const validatorResult = _validatorFunc(inputValue, values);
          
          const validatorMessage: ErrorType = {
            hasError: true,
            message: validatorResult,
          };
          const errorMessage: ErrorType = inputValue ? validatorMessage : requiredMessage;
          error = validatorResult ? errorMessage : clearMessage;
        }
        
        // Update error state
        if (errors[inputName]?.message !== error.message) {
          setErrors((prevErrors: ErrorsType<T>) => ({
            ...prevErrors,
            [inputName]: error,
          }));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, _isDirty, _isTouched]);

  const isFormInvalid = useCallback(() => {
    /*
     the form will be invalid if one of its fields
     has some errors or a required input field is empty
    */
    const _isRequired = initializeState(formModel, '_isRequired') as IsRequiredType<T>;
    const isRequiredInputs = Object.keys(_isRequired).reduce((inputs: IsRequiredType<T>, inputName: string) => {
      if (_isRequired[inputName]) inputs[inputName] = _isRequired[inputName];
      return inputs;
    }, {} as IsRequiredType<T>);

    const formHasErrors = () => Object.values(errors).some((error: any) => error.hasError);
    const isRequiredInputEmpty = () => Object.keys(isRequiredInputs).some((key: string) => !values[key]);

    return formHasErrors() || isRequiredInputEmpty();
  }, [errors, values]);

  useEffect(() => {
    /*
     this will be fired after every change in the errors
     state to be able to enable/disable the submit button
    */
    if (_isTouched) {
      setIsDisabled(isFormInvalid());
    }
  }, [errors, values, isFormInvalid, _isTouched]);

  const handleOnChange = useCallback(
    (event: any) => {
      _setIsTouched(true);

      const inputName = event.currentTarget?.name || event.target?.name;
      const inputValue = event.currentTarget?.value || event.target?.value;

      if (formModel[inputName]) {
        setIsDirty(true);

        // proceed only if the change input exits in the formModel
        setValues((prevValues: T) => ({
          ...prevValues,
          [inputName]: inputValue,
        }));
        if (_isDirty[inputName] === false) {
          // proceed only if input field is not dirty
          _setIsDirty((_isDirty: IsDirtyType<T>) => ({
            ..._isDirty,
            [inputName]: true,
          }));
        }
      }
    },
    [_isDirty],
  );

  const handleOnSubmit = useCallback(
    async (event: any) => {
      event.preventDefault();

      if (!isFormInvalid()) {
        setIsSubmitting(true);
        try {
          await formSubmitCallback(values);
          setIsSubmitted(true);
          setIsDirty(false);
        } catch (error) {
          // Handle submission error - user can catch this in their callback
          console.error('Form submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [isFormInvalid, values, formSubmitCallback],
  );

  const resetForm = useCallback(() => {
    setValues(initializeState(formModel, 'values') as T);
    setErrors(initializeState(formModel, 'errors') as ErrorsType<T>);
    _setIsDirty(initializeState(formModel, '_isDirty') as IsDirtyType<T>);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setIsDirty(false);
    _setIsTouched(false);
    setIsDisabled(true);
  }, []);

  const resetField = useCallback((fieldName: keyof T) => {
    const initialValue = formModel[fieldName]?.value || '';
    
    setValues((prevValues: T) => ({ ...prevValues, [fieldName]: initialValue }));
    setErrors((prevErrors: ErrorsType<T>) => ({ 
      ...prevErrors, 
      [fieldName]: { hasError: false, message: '' } 
    }));
    _setIsDirty((prevDirty: IsDirtyType<T>) => ({ ...prevDirty, [fieldName]: false }));
  }, []);

  return {
    handleOnChange,
    handleOnSubmit,
    values,
    errors,
    isSubmitted,
    isSubmitting,
    isDisabled,
    isDirty,
    resetForm,
    resetField,
  };
}

function initializeState<T extends Record<string, any>>(formModel: FormModelType<T>, state: string) {
  /*
   initialize a default state for {errors} and {_isDirty} where
   {values} and {_isRequired} are pulled from the formModel
  */
  switch (state) {
    case 'values':
      return Object.keys(formModel).reduce((inputValues: T, inputName: string) => {
        inputValues[inputName] = formModel[inputName]['value'];
        return inputValues;
      }, {} as T);
    case 'errors':
      return Object.keys(formModel).reduce((inputErrors: ErrorsType<T>, inputName: string) => {
        inputErrors[inputName] = { hasError: false, message: '' };
        return inputErrors;
      }, {} as ErrorsType<T>);
    case '_isDirty':
      return Object.keys(formModel).reduce((dirtyInputs: IsDirtyType<T>, inputName: string) => {
        dirtyInputs[inputName] = false;
        return dirtyInputs;
      }, {} as IsDirtyType<T>);
    case '_isRequired':
      return Object.keys(formModel).reduce((requiredInputs: IsRequiredType<T>, inputName: string) => {
        requiredInputs[inputName] = formModel[inputName]['required'];
        return requiredInputs;
      }, {} as IsRequiredType<T>);
    default:
      return {} as any;
  }
}

// Enhanced type declarations with generics
export type useFormType<T extends Record<string, any> = Record<string, any>> = {
  handleOnChange: HandleOnChangeType;
  handleOnSubmit: HandleOnSubmitType;
  values: T;
  errors: ErrorsType<T>;
  isSubmitted: boolean;
  isSubmitting: boolean;
  isDisabled: boolean;
  isDirty: boolean;
  resetForm: () => void;
  resetField: (fieldName: keyof T) => void;
};

type HandleOnChangeType = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => void;
type HandleOnSubmitType = (event: FormEvent<HTMLFormElement>) => void;

type ValidatorFuncType<T extends Record<string, any> = Record<string, any>> = (
  value: ValueType, 
  values?: T
) => string;

export type FormModelType<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: FormInputType<T>;
};

export type FormInputType<T extends Record<string, any> = Record<string, any>> = {
  value: ValueType;
  required: boolean;
  validator?: ValidatorFuncType<T>;
};

type IsDirtyType<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: boolean;
};

type IsRequiredType<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: boolean;
};

export type ValueType = string;

export type ValuesType<T extends Record<string, any> = Record<string, any>> = T;

export type ErrorType = {
  hasError: boolean;
  message: string;
};

export type ErrorsType<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: ErrorType;
};

// Legacy type exports for backward compatibility
export type ValuesType = Record<string, ValueType>;
