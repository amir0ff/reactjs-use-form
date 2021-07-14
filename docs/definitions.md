# useForm Type Definitions

### Table of contents

- [ErrorType](definitions.md#errortype)
- [ErrorsType](definitions.md#errorstype)
- [FormInputType](definitions.md#forminputtype)
- [FormModelType](definitions.md#formmodeltype)
- [IsDirtyType](definitions.md#isdirtytype)
- [IsRequiredType](definitions.md#isrequiredtype)
- [ValidatorFuncType](definitions.md#validatorfunctype)
- [ValueType](definitions.md#valuetype)
- [ValuesType](definitions.md#valuestype)
- [HandleOnChangeType](definitions.md#handleonchangetype)
- [HandleOnSubmitType](definitions.md#handleonsubmittype)
- [useFormType](definitions.md#useformtype)

### ErrorType

Ƭ `Object`

#### Type declaration

| Param    | Type      |
| :------- | :-------- |
| hasError | `boolean` |
| message  | `string`  |

#### Defined at [index.ts:208](../packages/main/src/index.ts#L208)

---

### ErrorsType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: [`ErrorType`](definitions.md#errortype)

`key`: input field name

#### Defined at [index.ts:213](../packages/main/src/index.ts#L213)

---

### FormInputType

Ƭ `Object`

#### Type declaration

| Param      | Type                                                    |
| :--------- | :------------------------------------------------------ |
| required   | `boolean`                                               |
| validator? | [`ValidatorFuncType`](definitions.md#validatorfunctype) |
| value      | [`ValueType`](definitions.md#valuetype)                 |

`?` optional params

#### Defined at [index.ts:188](../packages/main/src/index.ts#L188)

---

### FormModelType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: [`FormInputType`](definitions.md#forminputtype)

`key`: input field name

#### Defined at [index.ts:184](../packages/main/src/index.ts#L184)

---

### IsDirtyType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: `boolean`

`key`: input field name

#### Defined at [index.ts:194](../packages/main/src/index.ts#L194)

---

### IsRequiredType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: `boolean`

`key`: input field name

#### Defined at [index.ts:198](../packages/main/src/index.ts#L198)

---

### ValidatorFuncType

Ƭ (`value`: [`ValueType`](definitions.md#valuetype)
, `values?`: [`ValuesType`](definitions.md#valuestype)) => `string`

##### Parameters

| Param   | Type                                      | Description                                   |
| :------ | :---------------------------------------- | :-------------------------------------------- |
| value   | [`ValueType`](definitions.md#valuetype)   | current value of input field                  |
| values? | [`ValuesType`](definitions.md#valuestype) | values state object to compare for validation |

`?` optional params

##### Returns

`string`: custom error message returned from the validator function, or an empty string for no error.

#### Defined at [index.ts:182](../packages/main/src/index.ts#L182)

---

### ValueType

Ƭ `string`

#### Defined at [index.ts:202](../packages/main/src/index.ts#L202)

---

### ValuesType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: [`ValueType`](definitions.md#valuetype)

`key`: input field name

#### Defined at [index.ts:204](../packages/main/src/index.ts#L204)

---

### HandleOnChangeType

Ƭ (`event`: `ChangeEvent`<`HTMLInputElement`>) => `void`

##### Parameters

| Param | Type                              |
| :---- | :-------------------------------- |
| event | `ChangeEvent`<`HTMLInputElement`> |

##### Returns `void`

`!` returns nothing directly to the end user as it manages the controlled form values and \_IsDirty states.

#### Defined at [index.ts:179](../packages/main/src/index.ts#L179)

---

### HandleOnSubmitType

Ƭ (`event`: `FormEvent`<`HTMLFormElement`>) => `void`

##### Parameters

| Param | Type                           |
| :---- | :----------------------------- |
| event | `FormEvent`<`HTMLFormElement`> |

##### Returns `void`

`!` when the form has been validated, enabled and submitted, this callback function triggers another function set by the
user.

#### Defined at [index.ts:180](../packages/main/src/index.ts#L180)

---

### useFormType

Ƭ `Object`

#### Type declaration

| Param              | Type                                                           | Description                                               |
| ------------------ | -------------------------------------------------------------- | --------------------------------------------------------- |
| values             | [`ValuesType`](#valuestype)                 | returns form values state object                          |
| errors             | [`ErrorsType`](#errorstype)                 | returns form errors state object                          |
| handleOnChange     | [`HandleOnChangeType`](#handleonchangetype) | binds to a `HTMLInputElement: change event`               |
| handleOnSubmit     | [`HandleOnSubmitType`](#handleonsubmittype) | binds to a `HTMLFormElement: submit event`                |
| isDisabled         | `boolean`                                                      | returns `true` / `false` when the form is valid / invalid |
| isSubmitted        | `boolean`                                                      | returns `true` when the form was submitted without errors |
| formModel          | [`FormModelType`](#formmodeltype)           | initial form model with optional validation function      |
| formSubmitCallback | `() => void`                                                   | function to run after form validation and submission      |

`!` useForm takes two params: `formModel` and `formSubmitCallback`, returns the rest.

#### Defined at [index.ts:170](../packages/main/src/index.ts#L170)
