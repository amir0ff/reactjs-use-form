import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

// =============================================================================
// CONSTANTS
// =============================================================================

const CLEAR_ERROR: ErrorType = { hasError: false, message: '' };
const REQUIRED_ERROR: ErrorType = { hasError: true, message: 'This field is required' };

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Shallow compare two objects for equality
 */
function shallowEqual<T extends Record<string, any>>(obj1: T, obj2: T): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) return false;
  }
  
  return true;
}

/**
 * Shallow compare error objects for equality
 */
function errorObjectsEqual<T extends Record<string, any>>(
  errors1: ErrorsType<T>, 
  errors2: ErrorsType<T>
): boolean {
  const keys1 = Object.keys(errors1);
  const keys2 = Object.keys(errors2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    const err1 = errors1[key as keyof T];
    const err2 = errors2[key as keyof T];
    if (err1.hasError !== err2.hasError || err1.message !== err2.message) {
      return false;
    }
  }
  
  return true;
}

/**
 * Creates initial values object from form model
 */
function createInitialValues<T extends Record<string, any>>(formModel: FormModelType<T>): T {
  const result = {} as T;
  for (const key in formModel) {
    result[key as keyof T] = formModel[key].value as T[keyof T];
  }
  return result;
}

/**
 * Creates initial errors object from form model
 */
function createInitialErrors<T extends Record<string, any>>(formModel: FormModelType<T>): ErrorsType<T> {
  const result = {} as ErrorsType<T>;
  for (const key in formModel) {
    result[key as keyof T] = CLEAR_ERROR;
  }
  return result;
}

/**
 * Creates initial dirty state object from form model
 */
function createInitialDirtyState<T extends Record<string, any>>(formModel: FormModelType<T>): IsDirtyType<T> {
  const result = {} as IsDirtyType<T>;
  for (const key in formModel) {
    result[key as keyof T] = false;
  }
  return result;
}

/**
 * Creates required fields mapping from form model
 */
function createRequiredFieldsMap<T extends Record<string, any>>(
  formModel: FormModelType<T>,
): IsRequiredType<T> {
  const result = {} as IsRequiredType<T>;
  for (const key in formModel) {
    result[key as keyof T] = formModel[key].required;
  }
  return result;
}

/**
 * Validates a single field with its configuration
 */
function validateField<T extends Record<string, any>>(
  fieldName: keyof T,
  fieldValue: ValueType,
  fieldConfig: FormInputType<T>,
  allValues: T,
): ErrorType {
  // Check required validation first
  if (fieldConfig.required && !fieldValue) {
    return REQUIRED_ERROR;
  }

  // Run custom validator if provided
  if (fieldConfig.validator && fieldValue) {
    const validatorResult = fieldConfig.validator(fieldValue, allValues);
    if (validatorResult) {
      return { hasError: true, message: validatorResult };
    }
  }

  return CLEAR_ERROR;
}

/**
 * Validates multiple fields efficiently with minimal object creation
 */
function validateFields<T extends Record<string, any>>(
  dirtyFields: IsDirtyType<T>,
  values: T,
  formModel: FormModelType<T>,
  currentErrors: ErrorsType<T>,
): ErrorsType<T> {
  let hasChanges = false;
  let newErrors = currentErrors;

  for (const key in dirtyFields) {
    if (dirtyFields[key]) {
      const fieldValue = values[key];
      const fieldConfig = formModel[key];
      const newError = validateField(key, fieldValue, fieldConfig, values);

      if (newError.message !== currentErrors[key].message || newError.hasError !== currentErrors[key].hasError) {
        if (!hasChanges) {
          newErrors = { ...currentErrors };
          hasChanges = true;
        }
        newErrors[key] = newError;
      }
    }
  }

  return newErrors;
}

/**
 * Checks if form has validation errors
 */
function hasFormErrors<T extends Record<string, any>>(errors: ErrorsType<T>): boolean {
  for (const key in errors) {
    if (errors[key].hasError) return true;
  }
  return false;
}

/**
 * Checks if required fields are empty
 */
function hasEmptyRequiredFields<T extends Record<string, any>>(
  values: T,
  requiredFields: IsRequiredType<T>,
): boolean {
  for (const key in requiredFields) {
    if (requiredFields[key] && !values[key]) return true;
  }
  return false;
}

// =============================================================================
// MAIN HOOK
// =============================================================================

/**
 * A comprehensive React hook for form management with validation, submission handling, and state tracking.
 *
 * This hook provides a complete form management solution that includes:
 * - Real-time field validation with custom validators
 * - Form submission handling with loading states
 * - Dirty/touched state tracking for better UX
 * - Form and field reset utilities
 * - TypeScript support with generic types
 * - Optimized performance with memoization and shallow comparisons
 *
 * @template T - The shape of the form values object
 * @param {FormModelType<T>} formModel - Configuration object defining form fields, initial values, validation rules, and required fields
 * @param {function} formSubmitCallback - Async callback function executed on successful form submission
 * @returns {useFormType<T>} Object containing form state, handlers, and utility functions
 *
 * @example
 * ```typescript
 * const formModel = {
 *   email: { value: '', required: true, validator: (value) => !value.includes('@') ? 'Invalid email' : '' },
 *   password: { value: '', required: true }
 * };
 *
 * const form = useForm(formModel, async (values) => {
 *   await api.submitForm(values);
 * });
 *
 * // Usage in component
 * <form onSubmit={form.handleOnSubmit}>
 *   <input name="email" value={form.values.email} onChange={form.handleOnChange} />
 *   {form.errors.email.hasError && <span>{form.errors.email.message}</span>}
 * </form>
 * ```
 */
export function useForm<T extends Record<string, any> = Record<string, any>>(
  formModel: FormModelType<T>,
  formSubmitCallback: (values: T) => void | Promise<void>,
): useFormType<T> {
  // Memoize initial states to prevent unnecessary recalculations
  const initialValues = useMemo(() => createInitialValues(formModel), [formModel]);
  const initialErrors = useMemo(() => createInitialErrors(formModel), [formModel]);
  const initialDirtyState = useMemo(() => createInitialDirtyState(formModel), [formModel]);
  const requiredFields = useMemo(() => createRequiredFieldsMap(formModel), [formModel]);

  // Form state
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ErrorsType<T>>(initialErrors);
  const [fieldDirtyState, setFieldDirtyState] = useState<IsDirtyType<T>>(initialDirtyState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  // Use refs to track previous values for optimization
  const prevValuesRef = useRef<T>(values);
  const prevFieldDirtyStateRef = useRef<IsDirtyType<T>>(fieldDirtyState);

  // Computed state with optimized dependencies
  const isDirty = useMemo(() => {
    for (const key in fieldDirtyState) {
      if (fieldDirtyState[key]) return true;
    }
    return false;
  }, [fieldDirtyState]);

  const isFormInvalid = useMemo(() => {
    return hasFormErrors(errors) || hasEmptyRequiredFields(values, requiredFields);
  }, [errors, values, requiredFields]);

  const isDisabled = useMemo(() => {
    return !isTouched || isFormInvalid;
  }, [isTouched, isFormInvalid]);

  // Optimized validation effect - only run when necessary
  useEffect(() => {
    if (!isTouched) return;

    const valuesChanged = !shallowEqual(prevValuesRef.current, values);
    const dirtyStateChanged = !shallowEqual(prevFieldDirtyStateRef.current, fieldDirtyState);

    if (valuesChanged || dirtyStateChanged) {
      const newErrors = validateFields(fieldDirtyState, values, formModel, errors);
      
      if (!errorObjectsEqual(errors, newErrors)) {
        setErrors(newErrors);
      }

      // Update refs for next comparison
      prevValuesRef.current = values;
      prevFieldDirtyStateRef.current = fieldDirtyState;
    }
  }, [values, fieldDirtyState, formModel, errors, isTouched]);

  /**
   * Handles input field changes, updates form values, and marks fields as dirty.
   * Optimized with early returns and minimal state updates.
   */
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const fieldName = event.target.name as keyof T;
      const fieldValue = event.target.value;

      if (!formModel[fieldName]) return;

      const currentValue = values[fieldName];
      const isCurrentlyDirty = fieldDirtyState[fieldName];

      // Early return if value hasn't changed and field is already dirty
      // Allow validation to run if field is not dirty yet (first interaction)
      if (currentValue === fieldValue && isCurrentlyDirty) return;

      setIsTouched(true);

      // Batch state updates
      setValues((prev) => ({
        ...prev,
        [fieldName]: fieldValue as T[keyof T],
      }));

      // Only update dirty state if it's changing
      if (!isCurrentlyDirty) {
        setFieldDirtyState((prev) => ({
          ...prev,
          [fieldName]: true,
        }));
      }
    },
    [formModel, values, fieldDirtyState],
  );

  /**
   * Handles form submission with validation and error handling.
   */
  const handleOnSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isFormInvalid) return;

      setIsSubmitting(true);
      try {
        await formSubmitCallback(values);
        setIsSubmitted(true);
        setFieldDirtyState(initialDirtyState);
      } catch (error) {
        console.error('Form submission error:', error);
        throw error; // Re-throw to allow user handling
      } finally {
        setIsSubmitting(false);
      }
    },
    [isFormInvalid, formSubmitCallback, values, initialDirtyState],
  );

  /**
   * Resets the entire form to its initial state.
   */
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors(initialErrors);
    setFieldDirtyState(initialDirtyState);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setIsTouched(false);
    
    // Reset refs
    prevValuesRef.current = initialValues;
    prevFieldDirtyStateRef.current = initialDirtyState;
  }, [initialValues, initialErrors, initialDirtyState]);

  /**
   * Resets a specific field to its initial state.
   */
  const resetField = useCallback(
    (fieldName: keyof T) => {
      const initialValue = formModel[fieldName]?.value as T[keyof T];

      setValues((prev) => ({ ...prev, [fieldName]: initialValue }));
      setErrors((prev) => ({ ...prev, [fieldName]: CLEAR_ERROR }));
      setFieldDirtyState((prev) => ({ ...prev, [fieldName]: false }));
    },
    [formModel],
  );

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

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

/** Type for form field values (currently only supports strings) */
export type ValueType = string;

/**
 * Type for form values object (generic version).
 * @template T - The shape of the form values object
 */
export type ValuesType<T extends Record<string, any> = Record<string, any>> = T;

/**
 * Type defining the structure of field error objects.
 */
export type ErrorType = {
  /** Whether the field has an error */
  hasError: boolean;
  /** Error message to display */
  message: string;
};

/**
 * Type defining the structure of the errors object for all form fields.
 * @template T - The shape of the form values object
 */
export type ErrorsType<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: ErrorType;
};

/**
 * Type tracking which fields have been modified (dirty state).
 * @template T - The shape of the form values object
 */
type IsDirtyType<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: boolean;
};

/**
 * Type tracking which fields are required.
 * @template T - The shape of the form values object
 */
type IsRequiredType<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: boolean;
};

/**
 * Type for validator functions that validate field values.
 * @template T - The shape of the form values object
 */
type ValidatorFuncType<T extends Record<string, any> = Record<string, any>> = (
  value: ValueType,
  values?: T,
) => string;

/**
 * Type defining the configuration for a single form input field.
 * @template T - The shape of the form values object
 */
export type FormInputType<T extends Record<string, any> = Record<string, any>> = {
  /** Initial value for the field */
  value: ValueType;
  /** Whether the field is required */
  required: boolean;
  /** Optional validator function */
  validator?: ValidatorFuncType<T>;
};

/**
 * Type defining the structure of a form model configuration.
 * @template T - The shape of the form values object
 */
export type FormModelType<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: FormInputType<T>;
};

/** Type for the onChange event handler */
type HandleOnChangeType = (event: ChangeEvent<HTMLInputElement>) => void;

/** Type for the onSubmit event handler */
type HandleOnSubmitType = (event: FormEvent<HTMLFormElement>) => void;

/**
 * Return type of the useForm hook containing all form state and handlers.
 * @template T - The shape of the form values object
 */
export type useFormType<T extends Record<string, any> = Record<string, any>> = {
  /** Handler for input field changes */
  handleOnChange: HandleOnChangeType;
  /** Handler for form submission */
  handleOnSubmit: HandleOnSubmitType;
  /** Current form values */
  values: T;
  /** Current form errors */
  errors: ErrorsType<T>;
  /** Whether form has been successfully submitted */
  isSubmitted: boolean;
  /** Whether form is currently being submitted */
  isSubmitting: boolean;
  /** Whether form submit button should be disabled */
  isDisabled: boolean;
  /** Whether any form field has been modified */
  isDirty: boolean;
  /** Function to reset entire form */
  resetForm: () => void;
  /** Function to reset specific field */
  resetField: (fieldName: keyof T) => void;
};
