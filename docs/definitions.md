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

#### Defined in [index.ts:36](../src/index.ts#L205)

___

### ErrorsType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: [`ErrorType`](definitions.md#errortype)

#### Defined in [index.ts:41](../src/index.ts#210)

___

### FormInputType

Ƭ `Object`

#### Type declaration

| Param | Type |
| :------ | :------ |
| required | `boolean` |
| validator? | [`ValidatorFuncType`](definitions.md#validatorfunctype) |
| value | [`ValueType`](definitions.md#valuetype) |

#### Defined in [index.ts:1](../src/index.ts#L167)

___

### FormModelType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: [`FormInputType`](definitions.md#forminputtype)

#### Defined in [index.ts:18](../src/index.ts#L187)

___

### IsDirtyType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: `boolean`

#### Defined in [index.ts:24](../src/index.ts#L193)

___

### IsRequiredType

Ƭ [`IsDirtyType`](definitions.md#isdirtytype)

#### Defined in [index.ts:28](../src/index.ts#L197)

___

### ValidatorFuncType

Ƭ (`value`: [`ValueType`](definitions.md#valuetype)
, `values?`: [`ValuesType`](definitions.md#valuestype)) => `string`

##### Parameters

| Param | Type |
| :------ | :------ |
| value | [`ValueType`](definitions.md#valuetype) |
| values? | [`ValuesType`](definitions.md#valuestype) |

##### Returns

`string`

#### Defined in [index.ts:16](../src/index.ts#L185)

___

### ValueType

Ƭ `string`

#### Defined in [index.ts:30](../src/index.ts#L199)

___

### ValuesType

Ƭ `Object`

#### Index signature

▪ [key: `string`]: [`ValueType`](definitions.md#valuetype)

#### Defined in [index.ts:32](../src/index.ts#L201)

___

### handleOnChangeType

Ƭ (`event`: `ChangeEvent`<`HTMLInputElement`>) => `void`

##### Parameters

| Param | Type |
| :------ | :------ |
| event | `ChangeEvent`<`HTMLInputElement`> |

##### Returns

`void`

#### Defined in [index.ts:18](../src/index.ts#L182)

___

### handleOnSubmitType

Ƭ (`event`: `FormEvent`<`HTMLFormElement`>) => `void`

##### Parameters

| Param | Type |
| :------ | :------ |
| event | `FormEvent`<`HTMLFormElement`> |

##### Returns

`void`

#### Defined in [index.ts:19](../src/index.ts#L183)

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

#### Defined in [index.ts:7](../src/index.ts#L173)
