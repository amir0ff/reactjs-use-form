# useForm(📋, ⚙️) ⇒ Reactive Form ⚛️

[![Rollup.js CI build and tests](https://github.com/amiroff157/reactjs-use-form/actions/workflows/node.js.yml/badge.svg)](https://github.com/amiroff157/reactjs-use-form/actions/workflows/node.js.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![npm type definitions](https://img.shields.io/npm/types/reactjs-use-form?label=typed)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/amiroff157/reactjs-use-form?label=repo%20size)
![npm bundle size](https://img.shields.io/bundlephobia/min/reactjs-use-form?label=minified)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/reactjs-use-form?label=gzipped)

#### Reactive form management and input field validation hook

> Provide it with a [form model](#steps), flag input fields as required or add a value validation function with custom error messages. It validates the inputs as the user types, when there are no errors the form gets enabled for submission. On form submission, it triggers a callback function the user provides.

##### Requirements:

- 📋 Form model with optional validation function.
- ⚙️ Function to run after form validation and submission.
- ⚛️ React functional component with a form

## Install

```bash
$ npm install reactjs-use-form
```

- 🧪 Tested using [@testing-library/react-hooks](https://github.com/testing-library/react-hooks-testing-library)
- 🏗️ Built with [Rollup.js](https://github.com/rollup/rollup) and [create-react-app](https://github.com/facebook/create-react-app)

## Usage

##### Steps:

1. create a form model

```tsx
import { FormModelType } from 'reactjs-use-form';

const formModel: FormModelType = {
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

2. use as a hook in a functional react component

```tsx
import React from 'react';
import { useForm, ValuesType } from 'reactjs-use-form';

const ChangePassphraseComponent = () => {
  const {
    values,
    errors,
    handleOnChange,
    handleOnSubmit,
    isDisabled,
    isSubmitted
  } = useForm(formModel, handleLogin);

  const { currentPassphrase, newPassphrase, verifyPassphrase }: ValuesType = values;

  function handleLogin() {
    // formSubmitCallback();
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
          isInvalid={errors.currentPassphrase.hasError}
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
          isInvalid={errors.newPassphrase.hasError}
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
          isInvalid={errors.verifyPassphrase.hasError}
        />
        <span>{errors.verifyPassphrase.message}</span>
      </div>
      <div>
        <span>{isSubmitted ? 'Passphrase has been changed!' : ''}</span>
        <Button type="submit" size="sm" disabled={isDisabled}>
          Submit
        </Button>
      </div>
    </form>
  );
};
```

## Options

useForm takes two params: `formModel` and `formSubmitCallback`, returns the rest.

```tsx
const {
  values,
  errors,
  handleOnChange,
  handleOnSubmit,
  isDisabled,
  isSubmitted
} = useForm(formModel, formSubmitCallback);
```

| Param              | Type                                                           | Description                                               |
| ------------------ | -------------------------------------------------------------- | --------------------------------------------------------- |
| values             | [`ValuesType`](docs/definitions.md#valuestype)                 | returns form values state object                          |
| errors             | [`ErrorsType`](docs/definitions.md#errorstype)                 | returns form errors state object                          |
| handleOnChange     | [`handleOnChangeType`](docs/definitions.md#handleonchangetype) | binds to a `HTMLInputElement: change event`               |
| handleOnSubmit     | [`handleOnSubmitType`](docs/definitions.md#handleonsubmittype) | binds to a `HTMLFormElement: submit event`                |
| isDisabled         | `boolean`                                                      | returns `true` / `false` when the form is valid / invalid |
| isSubmitted        | `boolean`                                                      | returns `true` when the form was submitted without errors |
| formModel          | [`FormModelType`](docs/definitions.md#formmodeltype)           | initial form model with optional validation function      |
| formSubmitCallback | `() => void`                                                   | function to run after form validation and submission      |

#### Type definitions: [docs/definitions.md](docs/definitions.md)

## License

![GitHub](https://img.shields.io/github/license/amiroff157/reactjs-use-form?color=blue)
