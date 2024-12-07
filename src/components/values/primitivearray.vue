<script setup lang="ts">
	import { PrimitiveArray, primitiveArrayElementKinds } from '@/mcdoc/types';
	import { NumericRange } from '@/mcdoc/util';
	import { VaSelect } from 'vuestic-ui';
	import range from '../range.vue';

	const array = defineModel('primitivearray', {
		type: PrimitiveArray,
		default: () => {
			let array = new PrimitiveArray();
			array.elementKind = primitiveArrayElementKinds[0];
			array.lengthRange = new NumericRange();
			array.valueRange = new NumericRange();
			return array;
		},
		required: true,
	});

	const arrayTypes = Array.from(primitiveArrayElementKinds);
</script>

<template>
	<div class="flex">
		<VaSelect
			:options="arrayTypes"
			v-model:model-value="array.elementKind"
		></VaSelect>
		<div>
			<div>
				Lengh Range
				<range v-model:range="array.lengthRange"></range>
			</div>
			<div>
				Value Range
				<range v-model:range="array.valueRange"></range>
			</div>
		</div>
	</div>
</template>
