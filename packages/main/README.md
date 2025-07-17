# useForm(📋, ⚙️) ⇒ Reactive Form ⚛️

[![build and tests](https://github.com/amir0ff/reactjs-use-form/actions/workflows/ubuntu_node.yml/badge.svg)](https://github.com/amir0ff/reactjs-use-form/actions/workflows/ubuntu_node.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/amir0ff/reactjs-use-form?label=repo%20size)](https://bundlephobia.com/package/reactjs-use-form)
[![npm minified bundle size](https://img.shields.io/bundlephobia/min/reactjs-use-form?label=minified)](https://bundlephobia.com/package/reactjs-use-form)
[![npm gzipped bundle size](https://img.shields.io/bundlephobia/minzip/reactjs-use-form?label=gzipped)](https://bundlephobia.com/package/reactjs-use-form)
[![typescript](https://img.shields.io/npm/types/reactjs-use-form?label=with)](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md)

#### The most lightweight React form management library with TypeScript support

> **[Only 837B gzipped](https://bundlephobia.com/package/reactjs-use-form)** - 13-16x smaller than major competitors! Create a [form model](#usage), flag input fields as required or add validation functions with custom error messages. useForm validates inputs as the user types, enables form submission when valid, and provides powerful utilities for form management.

## ✨ Key Features

- 🪶 **Ultra-lightweight**: Only 837B gzipped vs 10.78kB for react-hook-form
- 🔒 **TypeScript-first**: Full type safety with generics and auto-completion
- ⚡ **Real-time validation**: Sync and async validation with custom error messages
- 🔄 **Form state management**: Submission state, form reset, field-level reset
- 🚀 **Dynamic fields**: Add/remove fields at runtime
- 📱 **Zero dependencies**: Only React as peer dependency
- 🎯 **Developer-friendly**: Simple, declarative API

##### Requirements:

- 📋 Form model with optional validation function.
- ⚙️ Function to run after form validation and submission.
- ⚛️ React functional component with a form.

## Install

```bash
# npm
npm install reactjs-use-form

# pnpm (recommended)
pnpm add reactjs-use-form

# yarn
yarn add reactjs-use-form
```

- 🧪 Tested using [@testing-library/react](https://www.npmjs.com/package/@testing-library/react).
- 🏗️ Built with [Vite](https://vitejs.dev) in library mode.
- ⚡ Modern TypeScript 5.7+ with strict type checking.

## Usage

##### Basic Example:

### 1. Create a form model

```tsx
import type { FormModelType } from 'reactjs-use-form';

// Define your form data type for enhanced type safety
interface LoginForm {
  username: string;
  password: string;
}

export const loginModel: FormModelType<LoginForm> = {
  username: {
    value: '',
    required: true,
    validator: (username) => {
      return username.length < 3 ? 'Username must be at least 3 characters' : '';
    },
  },
  password: {
    value: '',
    required: true,
    validator: (password) => {
      return password.length < 6 ? 'Password must be at least 6 characters' : '';
    },
  },
};
```

### 2. Use the hook in your component

```tsx
import { useForm } from 'reactjs-use-form';

function LoginForm() {
  const {
    values,
    errors,
    isSubmitted,
    isSubmitting,
    isDisabled,
    isDirty,
    handleOnChange,
    handleOnSubmit,
    resetForm,
    resetField,
  } = useForm(loginModel, handleSubmit);

  async function handleSubmit(formValues: LoginForm) {
    // Your submission logic here
    console.log('Form submitted:', formValues);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <input
        name="username"
        value={values.username}
        onChange={handleOnChange}
        placeholder="Username"
      />
      {errors.username.hasError && (
        <span>{errors.username.message}</span>
      )}

      <input
        name="password"
        type="password"
        value={values.password}
        onChange={handleOnChange}
        placeholder="Password"
      />
      {errors.password.hasError && (
        <span>{errors.password.message}</span>
      )}

      <button type="submit" disabled={isDisabled || isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Login'}
      </button>
      
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
}
```

## 🚀 Advanced Features

### Async Validation

Support for asynchronous validation (e.g., checking username availability):

```tsx
export const asyncFormModel: FormModelType = {
  username: {
    value: '',
    required: true,
    validator: async (username) => {
      if (username.length < 3) {
        return 'Username must be at least 3 characters';
      }
      
      // Simulate API call
      const response = await fetch(`/api/check-username/${username}`);
      const { available } = await response.json();
      
      return available ? '' : 'Username is already taken';
    },
  },
};
```

### Dynamic Fields

Add or remove fields at runtime:

```tsx
function DynamicForm() {
  const { values, addField, removeField, ...form } = useForm(baseModel, handleSubmit);

  const addPhoneField = () => {
    addField('phone', {
      value: '',
      required: true,
      validator: (phone) => {
        const phoneRegex = /^\+?[\d\s-()]{10,}$/;
        return phoneRegex.test(phone) ? '' : 'Invalid phone number';
      },
    });
  };

  const removePhoneField = () => {
    removeField('phone');
  };

  return (
    <form onSubmit={form.handleOnSubmit}>
      {/* Static fields */}
      <input name="name" value={values.name} onChange={form.handleOnChange} />
      
      {/* Dynamic field */}
      {values.phone !== undefined && (
        <input name="phone" value={values.phone} onChange={form.handleOnChange} />
      )}
      
      <button type="button" onClick={addPhoneField}>Add Phone</button>
      <button type="button" onClick={removePhoneField}>Remove Phone</button>
    </form>
  );
}
```

### Field-Level Reset

Reset individual fields:

```tsx
function MyForm() {
  const { resetField, ...form } = useForm(formModel, handleSubmit);

  return (
    <form onSubmit={form.handleOnSubmit}>
      <input name="email" value={form.values.email} onChange={form.handleOnChange} />
      <button type="button" onClick={() => resetField('email')}>
        Reset Email
      </button>
    </form>
  );
}
```

## 📖 API Reference

### `useForm<T>(formModel, submitCallback)`

#### Parameters

- `formModel: FormModelType<T>` - Form configuration object
- `submitCallback: (values: T) => void | Promise<void>` - Function called on valid form submission

#### Returns

```tsx
{
  // Form state
  values: T                    // Current form values
  errors: ErrorsType<T>        // Validation errors
  isSubmitted: boolean         // Form submission status
  isSubmitting: boolean        // Async submission in progress
  isDisabled: boolean          // Form validation status
  isDirty: boolean            // Form has been modified
  
  // Event handlers
  handleOnChange: (event) => void     // Input change handler
  handleOnSubmit: (event) => void     // Form submit handler
  
  // Utility functions
  resetForm: () => void               // Reset entire form
  resetField: (fieldName) => void     // Reset specific field
  addField: (name, config) => void    // Add field dynamically
  removeField: (fieldName) => void    // Remove field dynamically
}
```

### Form Model Type

```tsx
type FormModelType<T> = {
  [K in keyof T]: {
    value: string;
    required: boolean;
    validator?: (value: string, allValues?: T) => string | Promise<string>;
  };
};
```

### Validation Function

```tsx
type ValidatorFunction<T> = (
  value: string,
  allValues?: T
) => string | Promise<string>;
```

- Return empty string `''` for valid input
- Return error message string for invalid input
- Support for async validation by returning `Promise<string>`

## 🎯 Bundle Size Comparison

| Library | Minified | Gzipped | Ratio |
|---------|----------|---------|-------|
| **reactjs-use-form** | **1.9kB** | **837B** | **1x** |
| react-hook-form | 13.2kB | 10.78kB | 13x |
| formik | 16.1kB | 13.20kB | 16x |
| react-final-form | 4.3kB | 3.54kB | 4x |
| react-form | 5.5kB | 4.54kB | 5x |

*Source: [bundlephobia.com](https://bundlephobia.com/package/reactjs-use-form)*

## 🔄 Migration Guide

### From v1.x to v2.x

The new version is backward compatible, but you can now take advantage of:

1. **Enhanced TypeScript support**: Use generics for better type safety
2. **New form utilities**: `resetForm`, `resetField`, `addField`, `removeField`
3. **Submission state**: `isSubmitting` for better UX
4. **Async validation**: Return `Promise<string>` from validators

```tsx
// Before (v1.x) - still works
const { values, errors, handleOnChange, handleOnSubmit } = useForm(formModel, callback);

// After (v2.x) - enhanced with new features
const { 
  values, 
  errors, 
  isSubmitting, 
  resetForm, 
  resetField,
  handleOnChange, 
  handleOnSubmit 
} = useForm(formModel, callback);
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Amir Hossein Aghajari](https://github.com/amir0ff)

---

**Made with ❤️ to keep React forms simple and lightweight**
