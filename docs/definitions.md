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
- [handleOnChangeType](definitions.md#handleonchangetype)
- [handleOnSubmitType](definitions.md#handleonsubmittype)
- [useFormType](definitions.md#useformtype)

### ErrorType

Ƭ `Object`

#### Type declaration

| Param | Type |
| :------ | :------ |
| hasError | `boolean` |
| message | `string` |

#### Defined at [index.ts:208](../src/index.ts#L208)

___

### ErrorsType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: [`ErrorType`](definitions.md#errortype)

`key`: input field name

#### Defined at [index.ts:213](../src/index.ts#213)

___

### FormInputType

Ƭ `Object`

#### Type declaration

| Param | Type |
| :------ | :------ |
| required | `boolean` |
| validator? | [`ValidatorFuncType`](definitions.md#validatorfunctype) |
| value | [`ValueType`](definitions.md#valuetype) |

`?` optional params

#### Defined at [index.ts:185](../src/index.ts#L185)

___

### FormModelType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: [`FormInputType`](definitions.md#forminputtype)

`key`: input field name

#### Defined at [index.ts:181](../src/index.ts#L181)

___

### IsDirtyType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: `boolean`

`key`: input field name

#### Defined at [index.ts:194](../src/index.ts#L194)

___

### IsRequiredType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: `boolean`

`key`: input field name

#### Defined at [index.ts:198](../src/index.ts#L198)

___

### ValidatorFuncType

Ƭ (`value`: [`ValueType`](definitions.md#valuetype)
, `values?`: [`ValuesType`](definitions.md#valuestype)) => `string`

##### Parameters

| Param | Type | Description |
| :------ | :------ | :------ |
| value | [`ValueType`](definitions.md#valuetype) | current value of input field
| values? | [`ValuesType`](definitions.md#valuestype) | values state object to compare for validation

`?` optional params

##### Returns

`string`: custom error message returned from the validator function, or an empty string for no error.

#### Defined at [index.ts:179](../src/index.ts#L179)

___

### ValueType

Ƭ `string`

#### Defined at [index.ts:202](../src/index.ts#L202)

___

### ValuesType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: [`ValueType`](definitions.md#valuetype)

`key`: input field name

#### Defined at [index.ts:204](../src/index.ts#L204)

___

### handleOnChangeType

Ƭ (`event`: `ChangeEvent`<`HTMLInputElement`>) => `void`

##### Parameters

| Param | Type |
| :------ | :------ |
| event | `ChangeEvent`<`HTMLInputElement`> |

##### Returns `void`

`!` returns nothing directly to the end user as it manages the controlled form values and _IsDirty states.

#### Defined at [index.ts:176](../src/index.ts#L176)

___

### handleOnSubmitType

Ƭ (`event`: `FormEvent`<`HTMLFormElement`>) => `void`

##### Parameters

| Param | Type |
| :------ | :------ |
| event | `FormEvent`<`HTMLFormElement`> |

##### Returns `void`

`!` when the form has been validated, enabled and submitted, this callback function triggers another function set by the
user.

#### Defined at [index.ts:177](../src/index.ts#L177)

___

### useFormType

Ƭ `Object`

#### Type declaration

| Param | Type | Description |
| ------ | ------ | ------ |
| values | [`ValuesType`](docs/definitions.md#valuestype) | returns form values state object |
| errors | [`ErrorsType`](docs/definitions.md#errorstype) | returns form errors state object |
| handleOnChange | [`handleOnChangeType`](docs/definitions.md#handleonchangetype) | binds to a `HTMLInputElement: change event` |
| handleOnSubmit | [`handleOnSubmitType`](docs/definitions.md#handleonsubmittype) | binds to a `HTMLFormElement: submit event` |
| isDisabled | `boolean` | returns `true` / `false` when the form is valid / invalid |
| isSubmitted | `boolean` | returns `true` when the form was submitted without errors |
| formModel | [`FormModelType`](docs/definitions.md#formmodeltype) | initial form model with optional validation function |
| formSubmitCallback | `() => void` | function to run after form validation and submission |

`!` useForm takes two params: `formModel` and `formSubmitCallback`, returns the rest.

#### Defined at [index.ts:167](../src/index.ts#L167)
