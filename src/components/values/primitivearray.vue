<script setup lang="ts">
	import { PrimitiveArray, primitiveArrayElementKinds } from '@/mcdoc/types';
	import { NumericRange } from '@/mcdoc/util';
	import { VaSelect } from 'vuestic-ui';
	import { Attribute } from '@/mcdoc/attribute';
	import attributes from './attributes.vue';
	import { ref, watch } from 'vue';
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
	const attributeData = ref<Attribute[]>([]);
	watch(
		attributeData,
		(value) => {
			console.log('attributeData', value);
			array.value.attributes = value;
		},
		{ deep: true, immediate: true },
	);
</script>

<template>
	<div class="flex flex-col ml-8">
		<VaSelect
			:options="arrayTypes"
			v-model:model-value="array.elementKind"
			placeholder="Data Type"
		></VaSelect>
		<attributes v-model:attributes="attributeData" />
		<div class="flex flex-col *:flex *:flex-row ml-8">
			<div>
				Length Range
				<range v-model:range="array.lengthRange"></range>
			</div>
			<div>
				Value Range
				<range v-model:range="array.valueRange"></range>
			</div>
		</div>
	</div>
</template>
