<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { AnyType, BooleanType, ListType } from '@/mcdoc/types';
	import { VaSelect } from 'vuestic-ui';
	import any from './any.vue';
	import number from './number.vue';
	import string from './string.vue';
	import primitivearray from './primitivearray.vue';
	import boolean from './boolean.vue';
	import list from './list.vue';
	import { AllTypesKind, AllTypesToType } from '@/composables/types';

	const structValue = defineModel('structvalue', {
		type: any,
		default: () => new AnyType(),
		required: true,
	});

	const allTypes = Object.values(AllTypesKind);
	const strcutTypeTemp = ref(allTypes[0]);
	const tempStrcutValueType = ref(AllTypesToType[strcutTypeTemp.value]());

	watch(
		strcutTypeTemp,
		() => {
			console.log('Changed strcutTypeTemp');
			tempStrcutValueType.value = AllTypesToType[strcutTypeTemp.value]();
		},
		{ immediate: true, deep: true },
	);
	watch(
		tempStrcutValueType,
		() => {
			//@ts-ignore
			structValue.value = tempStrcutValueType.value;
		},
		{ immediate: true, deep: true },
	);
</script>

<template>
	<div class="flex flex-col ">
		<div class="flex flex-row">
			<VaSelect
				:options="allTypes"
				v-model="strcutTypeTemp"
			></VaSelect>
		</div>
		<div class="flex">
			<any
				v-model:any="tempStrcutValueType"
				v-if="strcutTypeTemp === AllTypesKind.Any"
			></any>
			<boolean
				v-model:boolean="(tempStrcutValueType as BooleanType)"
				v-if="strcutTypeTemp === AllTypesKind.Boolean"
			></boolean>
			<list
				v-model:list="(tempStrcutValueType as ListType)"
				v-if="strcutTypeTemp === AllTypesKind.List"
			></list>
			<number
				v-model:number="tempStrcutValueType"
				v-if="strcutTypeTemp === AllTypesKind.Number"
			></number>
			<primitivearray
				v-model:primitivearray="tempStrcutValueType"
				v-if="strcutTypeTemp === AllTypesKind.PrimitiveArray"
			></primitivearray>
			<string
				v-model:string="tempStrcutValueType"
				v-if="strcutTypeTemp === AllTypesKind.String"
			></string>
		</div>
	</div>
</template>
