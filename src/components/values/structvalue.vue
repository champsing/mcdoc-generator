<script setup lang="ts">
	import { ref, watch } from 'vue';
	import {
		AnyType,
		BooleanType,
		ListType,
		UnionType,
		IdentifierType,
		IndexedType,
		StructType,
	} from '@/mcdoc/types';
	import { VaSelect } from 'vuestic-ui';
	import any from './any.vue';
	import number from './number.vue';
	import string from './string.vue';
	import primitivearray from './primitivearray.vue';
	import boolean from './boolean.vue';
	import list from './list.vue';
	import union from './union.vue';
	import identifiertype from './identifiertype.vue';
	import indexedtype from './indexedtype.vue';
	import struct from './struct.vue';
	import { AllTypesKind, AllTypesToType } from '@/composables/types';

	const structValue = defineModel('structvalue', {
		type: any,
		default: () => new AnyType() as any,
		required: true,
	});

	const allTypes = Object.values(AllTypesKind);
	const structTypeTemp = ref(allTypes[0]);
	const tempstructValueType = ref(AllTypesToType[structTypeTemp.value]());

	watch(
		structTypeTemp,
		() => {
			console.log('Changed structTypeTemp');
			tempstructValueType.value = AllTypesToType[structTypeTemp.value]();
		},
		{ immediate: true, deep: true },
	);
	watch(
		tempstructValueType,
		() => {
			//@ts-ignore
			structValue.value = tempstructValueType.value;
		},
		{ immediate: true, deep: true },
	);
</script>

<template>
	<div class="flex flex-col p-4 rounded-lg *:m-2">
		<div class="flex flex-row">
			<VaSelect
				color="#B6FFF9"
				:options="allTypes"
				v-model="structTypeTemp"
			></VaSelect>
		</div>
		<div
			class="flex flex-row items-center bg-quaternary text-black p-4 rounded-lg"
		>
			<any
				v-model:any="(tempstructValueType as AnyType)"
				v-if="structTypeTemp === AllTypesKind.Any"
			></any>
			<boolean
				v-model:boolean="(tempstructValueType as BooleanType)"
				v-if="structTypeTemp === AllTypesKind.Boolean"
			></boolean>
			<list
				v-model:list="(tempstructValueType as ListType)"
				v-if="structTypeTemp === AllTypesKind.List"
			></list>
			<number
				v-model:number="tempstructValueType"
				v-if="structTypeTemp === AllTypesKind.Number"
			></number>
			<primitivearray
				v-model:primitivearray="tempstructValueType"
				v-if="structTypeTemp === AllTypesKind.PrimitiveArray"
			></primitivearray>
			<string
				v-model:string="tempstructValueType"
				v-if="structTypeTemp === AllTypesKind.String"
			></string>
			<union
				v-model:union="(tempstructValueType as UnionType)"
				v-if="structTypeTemp === AllTypesKind.Union"
			></union>
			<identifiertype
				v-model:identifier="(tempstructValueType as IdentifierType)"
				v-if="structTypeTemp === AllTypesKind.Identifier"
			></identifiertype>
			<indexedtype
				v-model:indexedtype="(tempstructValueType as IndexedType)"
				v-if="structTypeTemp === AllTypesKind.Indexed"
			></indexedtype>
			<struct
				v-model:struct="(tempstructValueType as StructType)"
				v-if="structTypeTemp === AllTypesKind.Struct"
			>
			</struct>
		</div>
	</div>
</template>
