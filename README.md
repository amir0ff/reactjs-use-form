# useForm(`form`, `callback`) ⇒ Reactive Form 🌟

[![Rollup.js CI build and tests](https://github.com/amiroff157/reactjs-use-form/actions/workflows/node.js.yml/badge.svg)](https://github.com/amiroff157/reactjs-use-form/actions/workflows/node.js.yml)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

> Reactive form management and input field validation hook.

## 📦 Install

```bash
npm install --save reactjs-use-form
```

## 🛠️ Usage

Requirements:

* 📝 Form model with optional validation function.
* ✔️ Function to run after form validation and submission.

1. ##### create a form model

```tsx
const formSchema: FormSchemaType = {
  email: {
    value: '',
    required: true,
  },
  passphrase: {
    value: '',
    required: true,
    validator: (passphrase) => {
      return passphrase.length <= 6 ? 'Passphrase must be at least 6 characters long' : '';
    },
  },
};
```

2. ##### use as a hook in any form component
```tsx
import * as React from 'react'
import { useForm } from 'reactjs-use-form'

const FormComponent = () => {
  const { values, errors, handleOnChange, handleOnSubmit, isDisabled } = useForm(formSchema, handleLogin);

  function handleLogin() {};

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          isInvalid={errors.email.hasError}
        />
        <span type="invalid">{errors.email.message}</span>
      </div>
      <div>
        <label>Passphrase</label>
        <input
          type="password"
          name="passphrase"
          value={passphrase}
          onChange={handleOnChange}
          isInvalid={errors.passphrase.hasError}
        />
        <span type="invalid">{errors.passphrase.message}</span>
      </div>
      <div>
        <Button type="submit" size="sm" disabled={isDisabled}>
          Log In
        </Button>
      </div>
    </form>
  )
}
```

## 🧰 Options

`const { values, errors, handleOnChange, handleOnSubmit, isDisabled } = useForm(formSchema, formSubmitCallback);`

| Param | Type | Description |
| ------ | ------ | ------ |
| formSchema | [`FormSchemaType`](docs/definitions.md#formschematype) | initial form model with optional validation function |
| formSubmitCallback | `() => void` | function to run after form validation and submission |
| handleOnChange | [`handleOnChangeType`](docs/definitions.md#handleonchangetype) | binds to `HTMLInputElement: change event`
| handleOnSubmit | [`handleOnSubmitType`](docs/definitions.md#handleonsubmittype) | binds to `HTMLFormElement: submit event`
| values | [`ValuesType`](docs/definitions.md#valuestype) | returns form values state object
| errors | [`ErrorsType`](docs/definitions.md#errorstype) | returns form errors state object
| isDisabled | `boolean` | returns `true / false` when the form is valid/invalid
| isSubmitted | `boolean` | returns `true` when the form was submitted without errors

#### Type definitions: [docs/definitions.md](docs/definitions.md)

## License

GPL-3.0 © [amiroff157](https://github.com/amiroff157)
