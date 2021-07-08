# useForm Type Definitions

### Table of contents

- [ErrorType](definitions.md#errortype)
- [ErrorsType](definitions.md#errorstype)
- [FormInputType](definitions.md#forminputtype)
- [FormSchemaType](definitions.md#formschematype)
- [IsDirtyType](definitions.md#isdirtytype)
- [IsRequiredType](definitions.md#isrequiredtype)
- [ValidatorFuncType](definitions.md#validatorfunctype)
- [ValueType](definitions.md#valuetype)
- [ValuesType](definitions.md#valuestype)
- [handleOnChangeType](definitions.md#handleonchangetype)
- [handleOnSubmitType](definitions.md#handleonsubmittype)
- [useFormType](definitions.md#useformtype)

### ErrorType

Ƭ **ErrorType**: `Object`

#### Type declaration

| Param | Type |
| :------ | :------ |
| hasError | `boolean` |
| message | `string` |

#### Defined in

[index.ts:36](../src/index.ts#L205)

___

### ErrorsType

Ƭ **ErrorsType**: `Object`

#### Index signature

▪ [key: `string`]: [`ErrorType`](definitions.md#errortype)

#### Defined in

[index.ts:41](../src/index.ts#210)

___

### FormInputType

Ƭ **FormInputType**: `Object`

#### Type declaration

| Param | Type |
| :------ | :------ |
| required | `boolean` |
| validator? | [`ValidatorFuncType`](definitions.md#validatorfunctype) |
| value | [`ValueType`](definitions.md#valuetype) |

#### Defined in

[index.ts:1](../src/index.ts#L167)

___

### FormSchemaType

Ƭ **FormSchemaType**: `Object`

#### Index signature

▪ [key: `string`]: [`FormInputType`](definitions.md#forminputtype)

#### Defined in

[index.ts:18](../src/index.ts#L187)

___

### IsDirtyType

Ƭ **IsDirtyType**: `Object`

#### Index signature

▪ [key: `string`]: `DirtyType`

#### Defined in

[index.ts:24](../src/index.ts#L193)

___

### IsRequiredType

Ƭ **IsRequiredType**: [`IsDirtyType`](definitions.md#isdirtytype)

#### Defined in

[index.ts:28](../src/index.ts#L197)

___

### ValidatorFuncType

Ƭ **ValidatorFuncType**: (`value`: [`ValueType`](definitions.md#valuetype)
, `values?`: [`ValuesType`](definitions.md#valuestype)) => `string`

#### Type declaration

▸ (`value`, `values?`): `string`

##### Parameters

| Param | Type |
| :------ | :------ |
| value | [`ValueType`](definitions.md#valuetype) |
| values? | [`ValuesType`](definitions.md#valuestype) |

##### Returns

`string`

#### Defined in

[index.ts:16](../src/index.ts#L185)

___

### ValueType

Ƭ **ValueType**: `string`

#### Defined in

[index.ts:30](../src/index.ts#L199)

___

### ValuesType

Ƭ **ValuesType**: `Object`

#### Index signature

▪ [key: `string`]: [`ValueType`](definitions.md#valuetype)

#### Defined in

[index.ts:32](../src/index.ts#L201)

___

### handleOnChangeType

Ƭ **handleOnChangeType**: (`event`: `ChangeEvent`<`HTMLInputElement`\>) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Param | Type |
| :------ | :------ |
| event | `ChangeEvent`<`HTMLInputElement`\> |

##### Returns

`void`

#### Defined in

[index.ts:18](../src/index.ts#L182)

___

### handleOnSubmitType

Ƭ **handleOnSubmitType**: (`event`: `FormEvent`<`HTMLFormElement`\>) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Param | Type |
| :------ | :------ |
| event | `FormEvent`<`HTMLFormElement`\> |

##### Returns

`void`

#### Defined in

[index.ts:19](../src/index.ts#L183)

___

### useFormType

Ƭ **useFormType**: `Object`

#### Type declaration

| Param | Type |
| :------ | :------ |
| handleOnChange | `(event: React.ChangeEvent<HTMLInputElement>) => void` |
| handleOnSubmit | `(event: React.FormEvent<HTMLFormElement>) => void` |
| values | [`ValuesType`](definitions.md#valuestype) |
| errors | [`ErrorsType`](definitions.md#errorstype) |
| isDisabled | `boolean` |
| isSubmitted | `boolean` |

#### Defined in

[index.ts:7](../src/index.ts#L173)
