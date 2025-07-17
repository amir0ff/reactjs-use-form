# useForm Type Definitions

A comprehensive React hook for form management with validation, submission handling, and state tracking.

## Table of Contents

- [useForm Hook](#useform-hook)
- [Core Types](#core-types)
  - [useFormType](#useformtype)
  - [FormModelType](#formmodeltype)
  - [FormInputType](#forminputtype)
- [Value Types](#value-types)
  - [ValueType](#valuetype)
  - [ValuesType](#valuestype)
- [Error Types](#error-types)
  - [ErrorType](#errortype)
  - [ErrorsType](#errorstype)
- [Validator Types](#validator-types)
  - [ValidatorFuncType](#validatorfunctype)
- [Handler Types](#handler-types)
  - [HandleOnChangeType](#handleonchangetype)
  - [HandleOnSubmitType](#handleonsubmittype)

---

## useForm Hook

```typescript
function useForm<T extends Record<string, any> = Record<string, any>>(
  formModel: FormModelType<T>,
  formSubmitCallback: (values: T) => void | Promise<void>,
): useFormType<T>;
```

### Parameters

| Parameter            | Type                                   | Description                                                                                      |
| -------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `formModel`          | `FormModelType<T>`                     | Configuration object defining form fields, initial values, validation rules, and required fields |
| `formSubmitCallback` | `(values: T) => void \| Promise<void>` | Async callback function executed on successful form submission                                   |

### Returns

[`useFormType<T>`](#useformtype) - Object containing form state, handlers, and utility functions

### Example

```typescript
const formModel = {
  email: {
    value: '',
    required: true,
    validator: (value) => !value.includes('@') ? 'Invalid email' : ''
  },
  password: {
    value: '',
    required: true,
    validator: (value) => value.length < 6 ? 'Password must be at least 6 characters' : ''
  }
};

const form = useForm(formModel, async (values) => {
  await api.submitForm(values);
});

// Usage in component
<form onSubmit={form.handleOnSubmit}>
  <input
    name="email"
    value={form.values.email}
    onChange={form.handleOnChange}
  />
  {form.errors.email.hasError && <span>{form.errors.email.message}</span>}

  <button type="submit" disabled={form.isDisabled}>
    {form.isSubmitting ? 'Submitting...' : 'Submit'}
  </button>
</form>
```

---

## Core Types

### useFormType

```typescript
type useFormType<T extends Record<string, any> = Record<string, any>> = {
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
```

Return type of the useForm hook containing all form state and handlers.

#### Properties

| Property         | Type                           | Description                                   |
| ---------------- | ------------------------------ | --------------------------------------------- |
| `handleOnChange` | `HandleOnChangeType`           | Handler for input field changes               |
| `handleOnSubmit` | `HandleOnSubmitType`           | Handler for form submission                   |
| `values`         | `T`                            | Current form values                           |
| `errors`         | `ErrorsType<T>`                | Current form errors                           |
| `isSubmitted`    | `boolean`                      | Whether form has been successfully submitted  |
| `isSubmitting`   | `boolean`                      | Whether form is currently being submitted     |
| `isDisabled`     | `boolean`                      | Whether form submit button should be disabled |
| `isDirty`        | `boolean`                      | Whether any form field has been modified      |
| `resetForm`      | `() => void`                   | Function to reset entire form                 |
| `resetField`     | `(fieldName: keyof T) => void` | Function to reset specific field              |

---

### FormModelType

```typescript
type FormModelType<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: FormInputType<T>;
};
```

Type defining the structure of a form model configuration.

#### Example

```typescript
const formModel: FormModelType<{ email: string; password: string }> = {
  email: { value: '', required: true, validator: emailValidator },
  password: { value: '', required: true },
};
```

---

### FormInputType

```typescript
type FormInputType<T extends Record<string, any> = Record<string, any>> = {
  value: ValueType;
  required: boolean;
  validator?: ValidatorFuncType<T>;
};
```

Type defining the configuration for a single form input field.

#### Properties

| Property     | Type                   | Description                   |
| ------------ | ---------------------- | ----------------------------- |
| `value`      | `ValueType`            | Initial value for the field   |
| `required`   | `boolean`              | Whether the field is required |
| `validator?` | `ValidatorFuncType<T>` | Optional validator function   |

---

## Value Types

### ValueType

```typescript
type ValueType = string;
```

Type for form field values. Currently only supports strings.

---

### ValuesType

```typescript
type ValuesType<T extends Record<string, any> = Record<string, any>> = T;
```

Type for form values object (generic version).

---

## Error Types

### ErrorType

```typescript
type ErrorType = {
  hasError: boolean;
  message: string;
};
```

Type defining the structure of field error objects.

#### Properties

| Property   | Type      | Description                    |
| ---------- | --------- | ------------------------------ |
| `hasError` | `boolean` | Whether the field has an error |
| `message`  | `string`  | Error message to display       |

---

### ErrorsType

```typescript
type ErrorsType<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: ErrorType;
};
```

Type defining the structure of the errors object for all form fields.

---

## Validator Types

### ValidatorFuncType

```typescript
type ValidatorFuncType<T extends Record<string, any> = Record<string, any>> = (
  value: ValueType,
  values?: T,
) => string;
```

Type for validator functions that validate field values.

#### Parameters

| Parameter | Type        | Description                                                   |
| --------- | ----------- | ------------------------------------------------------------- |
| `value`   | `ValueType` | Current value of the field being validated                    |
| `values?` | `T`         | Optional access to all form values for cross-field validation |

#### Returns

`string` - Error message if validation fails, empty string if valid

#### Example

```typescript
const passwordValidator: ValidatorFuncType = (value, values) => {
  if (value.length < 6) return 'Password must be at least 6 characters';
  if (values?.confirmPassword && value !== values.confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};
```

---

## Handler Types

### HandleOnChangeType

```typescript
type HandleOnChangeType = (event: ChangeEvent<HTMLInputElement>) => void;
```

Type for the onChange event handler with improved type safety.

#### Parameters

| Parameter | Type                            | Description                        |
| --------- | ------------------------------- | ---------------------------------- |
| `event`   | `ChangeEvent<HTMLInputElement>` | Change event from HTML input field |

#### Returns

`void` - Updates form state internally

#### Improvements in v1.6.0+

- **Better type safety**: Now specifically typed for `HTMLInputElement` instead of generic objects
- **Cleaner implementation**: Simplified event handling with proper TypeScript support

---

### HandleOnSubmitType

```typescript
type HandleOnSubmitType = (event: FormEvent<HTMLFormElement>) => void;
```

Type for the onSubmit event handler.

#### Parameters

| Parameter | Type                         | Description           |
| --------- | ---------------------------- | --------------------- |
| `event`   | `FormEvent<HTMLFormElement>` | Form submission event |

#### Returns

`void` - Handles form submission with validation

---

_Documentation generated for useForm v1.6.0+_
