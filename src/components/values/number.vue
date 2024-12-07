<script setup lang="ts">
	import { VaSelect, VaCheckbox } from 'vuestic-ui';
	import { defineModel, ref, watch } from 'vue';
	import { NumericType, numericTypeKinds } from '@/mcdoc/types';
	import { NumericRange, RangeKind } from '@/mcdoc/util';
	import range from '../range.vue';

	const rangeValue = ref(
		(() => {
			const rangeKind = new RangeKind(false, false);
			const range = new NumericRange();
			range.kind = rangeKind;
			return range;
		})(),
	);

	const number = defineModel('number', {
		type: NumericType,
		default: () => {
			const type = new NumericType();
			type.valueRange = new NumericRange();
			return type;
		},
		required: true,
	});
	const isRange = ref(false);
	const numberTypes = Array.from(numericTypeKinds);

	watch(
		rangeValue,
		(value) => {
			console.log('value', value);
			number.value.valueRange = isRange.value ? value : null;
		},
		{ deep: Infinity, immediate: true },
	);
</script>

<template>
	<div class="flex">
		<VaSelect
			v-model:model-value="number.kind"
			:options="numberTypes"
		>
		</VaSelect>
		<VaCheckbox
			v-model="isRange"
			label="number range"
		>
		</VaCheckbox>
		<range
			v-if="isRange"
			v-model:range="rangeValue"
		></range>
	</div>
</template>
