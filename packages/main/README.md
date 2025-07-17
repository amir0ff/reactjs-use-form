# useForm(📋, ⚙️) ⇒ Reactive Form ⚛️

[![build and tests](https://github.com/amir0ff/reactjs-use-form/actions/workflows/ubuntu_node.yml/badge.svg)](https://github.com/amir0ff/reactjs-use-form/actions/workflows/ubuntu_node.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/amir0ff/reactjs-use-form?label=repo%20size)](https://bundlephobia.com/package/reactjs-use-form)
[![npm minified bundle size](https://img.shields.io/bundlephobia/min/reactjs-use-form?label=minified)](https://bundlephobia.com/package/reactjs-use-form)
[![npm gzipped bundle size](https://img.shields.io/bundlephobia/minzip/reactjs-use-form?label=gzipped)](https://bundlephobia.com/package/reactjs-use-form)
[![typescript](https://img.shields.io/npm/types/reactjs-use-form?label=with)](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md)

#### Reactive form management and input field validation hook

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
    isDirty
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
      </div>
      <span>{isSubmitted ? 'Passphrase has been changed!' : null}</span>
      <button type="submit" disabled={isDisabled}>
        <span>Submit</span>
      </button>
    </form>
  );
};
```

</details>
<details>
<summary> Material-UI v6 code example</summary>

```tsx
import React from 'react';
import { Alert, Button, FormControl, FormGroup, FormHelperText, TextField } from '@mui/material';
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
    isDirty
  } = useForm(formModel, handleSubmit);

  const { currentPassphrase, newPassphrase, verifyPassphrase }: ValuesType = values;

  function handleSubmit() {
    if (isDirty) formSubmitCallback();
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <FormGroup>
        <FormControl>
          <TextField
            required={true}
            label='Current Passphrase'
            type='password'
            name='currentPassphrase'
            error={errors.currentPassphrase.hasError}
            value={currentPassphrase}
            onChange={handleOnChange} />
          <FormHelperText error={errors.currentPassphrase.hasError}>
            {errors.currentPassphrase.message}
          </FormHelperText>
        </FormControl>
      </FormGroup>
      <FormGroup>
        <FormControl>
          <TextField
            required={true}
            label='New Passphrase'
            type='password'
            name='newPassphrase'
            error={errors.newPassphrase.hasError}
            value={newPassphrase}
            onChange={handleOnChange} />
          <FormHelperText error={errors.newPassphrase.hasError}>
            {errors.newPassphrase.message}
          </FormHelperText>
        </FormControl>
      </FormGroup>
      <FormGroup>
        <FormControl>
          <TextField
            required={true}
            label='Verify Passphrase'
            type='password'
            name='verifyPassphrase'
            error={errors.verifyPassphrase.hasError}
            value={verifyPassphrase}
            onChange={handleOnChange} />
          <FormHelperText error={errors.verifyPassphrase.hasError}>
            {errors.verifyPassphrase.message}
          </FormHelperText>
        </FormControl>
      </FormGroup>
      {isSubmitted ? <Alert variant='standard' severity='success'>
        Passphrase has been changed!
      </Alert> : null}
      <Button variant="contained" type='submit' disabled={isDisabled}>
        Submit
      </Button>
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
  isDirty
} = useForm(formModel, formSubmitCallback);
```

| Param              | Type                                                           | Description                                               |
| ------------------ | -------------------------------------------------------------- | --------------------------------------------------------- |
| values             | [`ValuesType`](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md#valuestype)                 | returns form values state object                          |
| errors             | [`ErrorsType`](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md#errorstype)                 | returns form errors state object                          |
| handleOnChange     | [`HandleOnChangeType`](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md#handleonchangetype) | binds to a `HTMLInputElement: change event`               |
| handleOnSubmit     | [`HandleOnSubmitType`](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md#handleonsubmittype) | binds to a `HTMLFormElement: submit event`                |
| isDisabled         | `boolean`                                                      | returns `true` / `false` when the form is valid / invalid |
| isSubmitted        | `boolean`                                                      | returns `true` when the form was submitted without errors |
| isDirty        | `boolean`                                                      | returns `true` when the form recieves data |
| formModel          | [`FormModelType`](https://github.com/amir0ff/reactjs-use-form/blob/main/docs/definitions.md#formmodeltype)           | initial form model with optional validation function      |
| formSubmitCallback | `() => void`                                                   | function to run after form validation and submission      |

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
