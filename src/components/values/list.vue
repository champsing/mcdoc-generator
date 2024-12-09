<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { ListType, BooleanType, AnyType } from '@/mcdoc/types';
	import { NumericRange } from '@/mcdoc/util';
	import { VaSelect, VaCheckbox, VaChip } from 'vuestic-ui';
	import range from '../range.vue';
	import any from './any.vue';
	import number from './number.vue';
	import string from './string.vue';
	import primitivearray from './primitivearray.vue';
	import boolean from './boolean.vue';
	import list from './list.vue';
	import {
		ListTypeKind,
		ListTypeToDefaultType,
		ListTypeToMcdocType,
	} from '@/composables/types';

	const listdata = defineModel('list', {
		type: ListType,
		default: () => new ListType(),
		required: true,
	});

	const listTypes = Object.values(ListTypeKind);
	const listTypeTemp = ref(listTypes[0]);
	const tempListType = ref(ListTypeToDefaultType[listTypeTemp.value]());

	watch(
		listTypeTemp,
		() => {
			console.log('Changed listTypeTemp');
			tempListType.value = new ListTypeToMcdocType[listTypeTemp.value]();
		},
		{ immediate: true, deep: Infinity },
	);

	watch(
		tempListType,
		() => {
			console.log('Changed listTypeTemp', tempListType.value);
			listdata.value.elementType = tempListType.value;
		},
		{ immediate: true, deep: Infinity },
	);

	const rangeData = ref(new NumericRange());
	watch(
		rangeData,
		() => {
			console.log('Changed range', range.value);
			listdata.value.lengthRange = rangeData.value;
		},
		{ immediate: true, deep: Infinity },
	);

	const isRange = ref(false);
	watch(
		isRange,
		() => {
			console.log('Changed isRange', isRange.value);
			listdata.value.lengthRange = isRange.value ? rangeData.value : undefined;
		},
		{ immediate: true },
	);
</script>

<template>
	<div class="flex flex-col ml-8">
		<div class="flex flex-col items-start">
			<VaSelect
				:options="listTypes"
				v-model="listTypeTemp"
			></VaSelect>
			<div class="flex flex-row">
				<VaChip
					class="flex-shrink-0 self-start"
					outline
					color="#FFF"
					square
					size="medium"
					readonly
					>Is List have length limit?
				</VaChip>
				<VaCheckbox
					v-model="isRange"
					class="checkbox-border min-w-max"
				>
				</VaCheckbox>
			</div>
			<range
				v-if="isRange"
				v-model:range="rangeData"
			></range>
		</div>
		<div class="border-2 border-tertiary rounded-lg p-2">
			<!--
			<component
				:is="ListTypeToComponent[listTypeTemp]"
				v-model="tempListType"
			></component>
      
      -->
			<any
				v-model:any="(tempListType as AnyType)"
				v-if="listTypeTemp === ListTypeKind.Any"
			></any>
			<boolean
				v-model:boolean="(tempListType as BooleanType)"
				v-if="listTypeTemp === ListTypeKind.Boolean"
			></boolean>
			<list
				v-model:list="(tempListType as ListType)"
				v-if="listTypeTemp === ListTypeKind.List"
			></list>
			<number
				v-model:number="tempListType"
				v-if="listTypeTemp === ListTypeKind.Number"
			></number>
			<primitivearray
				v-model:primitivearray="tempListType"
				v-if="listTypeTemp === ListTypeKind.PrimitiveArray"
			></primitivearray>
			<string
				v-model:string="tempListType"
				v-if="listTypeTemp === ListTypeKind.String"
			></string>
		</div>
	</div>
</template>
