# useForm(📋, ⚙️) ⇒ Reactive Form ⚛️

[![build and tests](https://github.com/amir0ff/reactjs-use-form/actions/workflows/ubuntu_node.yml/badge.svg)](https://github.com/amir0ff/reactjs-use-form/actions/workflows/ubuntu_node.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/amir0ff/reactjs-use-form?label=repo%20size)](https://bundlephobia.com/package/reactjs-use-form)
[![npm minified bundle size](https://img.shields.io/bundlephobia/min/reactjs-use-form?label=minified)](https://bundlephobia.com/package/reactjs-use-form)
[![npm gzipped bundle size](https://img.shields.io/bundlephobia/minzip/reactjs-use-form?label=gzipped)](https://bundlephobia.com/package/reactjs-use-form)
[![typescript](https://img.shields.io/npm/types/reactjs-use-form?label=with)](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md)

#### The most lightweight React form management library with TypeScript support

> Create a [form model](#usage), flag input fields as required or add a value validation function with custom error messages. useForm will validate the inputs as the user types, when there are no errors the form gets enabled for submission. On form submission, it executes a callback function the user provides.

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

##### Steps:

1. create a form model:

```tsx
import type { FormModelType } from 'reactjs-use-form';

export const formModel: FormModelType = {
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
      } else if (newPassphrase.length <= 5) {
        return 'Password must be at least 6 characters long';
      } else if (newPassphrase !== values?.verifyPassphrase) {
        return 'Passwords do not match';
      } else return '';
    },
  },
  verifyPassphrase: {
    value: '',
    required: true,
    validator: (verifyPassphrase, values) => {
      return verifyPassphrase !== values?.newPassphrase ? 'Passwords do not match' : '';
    },
  },
};
```

2. prepare a submit callback function, for example: `function handleSubmit() {...}`.

3. use the form model with the callback function in useForm hook in a functional react component:

<details>
<summary> Plain JSX code example </summary>

```tsx
import React from 'react';
import { useForm } from 'reactjs-use-form';
import type { ValuesType } from 'reactjs-use-form';
import { formModel } from './formModel';

const ChangePassphraseComponent = () => {
  const {
    values,
    errors,
    handleOnChange,
    handleOnSubmit,
    isDisabled,
    isSubmitted,
    isSubmitting,
    isDirty,
    resetForm,
    resetField
  } = useForm(formModel, handleSubmit);

  const { currentPassphrase, newPassphrase, verifyPassphrase }: ValuesType = values;

  function handleSubmit() {
    if (isDirty) formSubmitCallback();
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label>Current Passphrase</label>
        <input
          type="password"
          name="currentPassphrase"
          value={currentPassphrase}
          onChange={handleOnChange}
        />
        <span>{errors.currentPassphrase.message}</span>
        <button type="button" onClick={() => resetField('currentPassphrase')}>
          Clear
        </button>
      </div>
      <div>
        <label>New Passphrase</label>
        <input
          type="password"
          name="newPassphrase"
          value={newPassphrase}
          onChange={handleOnChange}
        />
        <span>{errors.newPassphrase.message}</span>
        <button type="button" onClick={() => resetField('newPassphrase')}>
          Clear
        </button>
      </div>
      <div>
        <label>Verify Passphrase</label>
        <input
          type="password"
          name="verifyPassphrase"
          value={verifyPassphrase}
          onChange={handleOnChange}
        />
        <span>{errors.verifyPassphrase.message}</span>
        <button type="button" onClick={() => resetField('verifyPassphrase')}>
          Clear
        </button>
      </div>
      <span>{isSubmitted ? 'Passphrase has been changed!' : null}</span>
      <button type="submit" disabled={isDisabled}>
        <span>{isSubmitting ? 'Changing...' : 'Submit'}</span>
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </form>
  );
};
```

</details>

## Options

useForm takes two params: `formModel` and `formSubmitCallback` and returns the rest.

```tsx
const {
  values,
  errors,
  handleOnChange,
  handleOnSubmit,
  isDisabled,
  isSubmitted,
  isSubmitting,
  isDirty,
  resetForm,
  resetField
} = useForm(formModel, formSubmitCallback);
```

| Property           | Type                                                           | Description                                               |
| ------------------ | -------------------------------------------------------------- | --------------------------------------------------------- |
| values             | [`ValuesType`](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md#valuestype)                 | current form values state object                          |
| errors             | [`ErrorsType`](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md#errorstype)                 | current form errors state object                          |
| handleOnChange     | [`HandleOnChangeType`](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md#handleonchangetype) | handler for input field changes                          |
| handleOnSubmit     | [`HandleOnSubmitType`](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md#handleonsubmittype) | handler for form submission                              |
| isDisabled         | `boolean`                                                      | whether form submit button should be disabled            |
| isSubmitted        | `boolean`                                                      | whether form has been successfully submitted             |
| isSubmitting       | `boolean`                                                      | whether form is currently being submitted                |
| isDirty            | `boolean`                                                      | whether any form field has been modified                |
| resetForm          | `() => void`                                                   | function to reset entire form                            |
| resetField         | `(fieldName: keyof T) => void`                                | function to reset specific field                         |
| formModel          | [`FormModelType`](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md#formmodeltype)           | initial form model with optional validation function      |
| formSubmitCallback | `(values: T) => void \| Promise<void>`                        | async callback function executed on successful form submission |

#### Type definitions: [docs/definitions.md](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md)

## Development

### Prerequisites
- Node.js 18+
- pnpm 9+ (recommended)

### Setup
```bash
# Clone the repository
git clone https://github.com/amir0ff/reactjs-use-form.git
cd reactjs-use-form

# Install dependencies
pnpm install

# Build the library
pnpm build

# Start the example app
pnpm start:example
```

### Available Commands
```bash
pnpm build              # Build the library with Vite
pnpm dev                # Build library in watch mode
pnpm test               # Run tests
pnpm format             # Format code with Prettier
pnpm clean              # Clean build artifacts
```

## License

![GitHub](https://img.shields.io/github/license/amir0ff/reactjs-use-form?color=blue)
