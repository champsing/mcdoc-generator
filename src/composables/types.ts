import {
	//McdocType,
	AnyType,
	BooleanType,
	NumericType,
	PrimitiveArray,
	StringType,
	primitiveArrayElementKinds,
	ListType,
	StructKey,
	StructType,
	UnionType,
	IdentifierType,
	IndexedType,
} from '@/mcdoc/types';
import { NumericRange } from '@/mcdoc/util';
/*
import any from '@components/values/any.vue';
import number from '@components/values/number.vue';
import string from '@components/values/string.vue';
import primitivearray from '@components/values/primitivearray.vue';
import boolean from '@components/values/boolean.vue';
import list from '@components/values/list.vue';
*/
export type mapValue = {
	key: StructKey;
	value: AllTypes;
	optional?: boolean;
};

export enum ListTypeKind {
	Any = 'Any',
	Boolean = 'boolean',
	List = 'List',
	Number = 'Number',
	PrimitiveArray = 'PrimitiveArray',
	String = 'String',
}

export const ListTypeToMcdocType = {
	[ListTypeKind.Any]: AnyType,
	[ListTypeKind.Boolean]: BooleanType,
	[ListTypeKind.List]: ListType,
	[ListTypeKind.Number]: NumericType,
	[ListTypeKind.PrimitiveArray]: PrimitiveArray,
	[ListTypeKind.String]: StringType,
};

export const ListTypeToDefaultType = {
	[ListTypeKind.Any]: () => new AnyType(),
	[ListTypeKind.Boolean]: () => new BooleanType(),
	[ListTypeKind.List]: () => new ListType(),
	[ListTypeKind.Number]: () => {
		const type = new NumericType();
		type.valueRange = new NumericRange();
		return type;
	},
	[ListTypeKind.PrimitiveArray]: () => {
		let array = new PrimitiveArray();
		array.elementKind = primitiveArrayElementKinds[0];
		array.lengthRange = new NumericRange();
		array.valueRange = new NumericRange();
		return array;
	},
	[ListTypeKind.String]: () => {
		let string = new StringType();
		string.lengthRange = new NumericRange();
		return string;
	},
};
/*
export const ListTypeToComponent = {
	[ListTypeKind.Any]: any,
	[ListTypeKind.Boolean]: boolean,
	[ListTypeKind.List]: list,
	[ListTypeKind.Number]: number,
	[ListTypeKind.PrimitiveArray]: primitivearray,
	[ListTypeKind.String]: string,
};
*/
/*
export const AllTypes = new Set([
	AnyType,
	BooleanType,
	NumericType,
	PrimitiveArray,
	StringType,
	ListType,
	StructType,
	UnionType,
	IdentifierType,
]);
*/

export type AllTypes =
	| AnyType
	| BooleanType
	| NumericType
	| PrimitiveArray
	| StringType
	| ListType
	| StructType
	| UnionType
	| IdentifierType
	| IndexedType;

export enum AllTypesKind {
	Any = 'Any',
	Boolean = 'Boolean',
	Number = 'Number',
	PrimitiveArray = 'PrimitiveArray',
	String = 'String',
	List = 'List',
	Struct = 'Struct',
	Union = 'Union',
	Identifier = 'Identifier',
	Indexed = 'Indexed',
}

export const AllTypesToKind = {
	[AllTypesKind.Any]: AnyType,
	[AllTypesKind.Boolean]: BooleanType,
	[AllTypesKind.Number]: NumericType,
	[AllTypesKind.PrimitiveArray]: PrimitiveArray,
	[AllTypesKind.String]: StringType,
	[AllTypesKind.List]: ListType,
	[AllTypesKind.Struct]: StructType,
	[AllTypesKind.Union]: UnionType,
	[AllTypesKind.Identifier]: IdentifierType,
	[AllTypesKind.Indexed]: IndexedType,
};

export const AllTypesToType = {
	[AllTypesKind.Any]: () => new AnyType(),
	[AllTypesKind.Boolean]: () => new BooleanType(),
	[AllTypesKind.Number]: () => new NumericType(),
	[AllTypesKind.PrimitiveArray]: () => {
		let array = new PrimitiveArray();
		array.elementKind = primitiveArrayElementKinds[0];
		array.lengthRange = new NumericRange();
		array.valueRange = new NumericRange();
		return array;
	},
	[AllTypesKind.String]: () => {
		let string = new StringType();
		string.lengthRange = new NumericRange();
		return string;
	},
	[AllTypesKind.List]: () => new ListType(),
	[AllTypesKind.Struct]: () => new StructType(),
	[AllTypesKind.Union]: () => new UnionType(),
	[AllTypesKind.Identifier]: () => new IdentifierType(),
	[AllTypesKind.Indexed]: () => new IndexedType(),
};
