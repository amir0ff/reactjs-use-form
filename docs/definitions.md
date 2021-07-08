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
- [useFormType](definitions.md#useformtype)

### ErrorType

Ƭ **ErrorType**: `Object`

#### Type declaration

| Param | Type |
| :------ | :------ |
| hasError | `boolean` |
| message | `string` |

#### Defined in

types.ts:36

___

### ErrorsType

Ƭ **ErrorsType**: `Object`

#### Index signature

▪ [key: `string`]: [`ErrorType`](definitions.md#errortype)

#### Defined in

types.ts:41

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

types.ts:1

___

### FormSchemaType

Ƭ **FormSchemaType**: `Object`

#### Index signature

▪ [key: `string`]: [`FormInputType`](definitions.md#forminputtype)

#### Defined in

types.ts:18

___

### IsDirtyType

Ƭ **IsDirtyType**: `Object`

#### Index signature

▪ [key: `string`]: `DirtyType`

#### Defined in

types.ts:24

___

### IsRequiredType

Ƭ **IsRequiredType**: [`IsDirtyType`](definitions.md#isdirtytype)

#### Defined in

types.ts:28

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

types.ts:16

___

### ValueType

Ƭ **ValueType**: `string`

#### Defined in

types.ts:30

___

### ValuesType

Ƭ **ValuesType**: `Object`

#### Index signature

▪ [key: `string`]: [`ValueType`](definitions.md#valuetype)

#### Defined in

types.ts:32

___

### useFormType

Ƭ **useFormType**: `Object`

#### Type declaration

| Param | Type |
| :------ | :------ |
| handleOnChange | `(event: React.FormEvent<HTMLFormElement>) => void` |
| handleOnSubmit | (event: any) => void |
| values | [`ValuesType`](definitions.md#valuestype) |
| errors | [`ErrorsType`](definitions.md#errorstype) |
| isDisabled | `boolean` |
| isSubmitted | `boolean` |

#### Defined in

types.ts:7
