<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { StringType } from '@/mcdoc/types';
	import { NumericRange } from '@/mcdoc/util';
	import { VaCheckbox } from 'vuestic-ui';
	import range from '../range.vue';

	const string = defineModel('string', {
		type: StringType,
		default: () => new StringType(),
		required: true,
	});
	const lengthRange = ref(new NumericRange());
	watch(
		lengthRange,
		(newRange) => {
			string.value.lengthRange = newRange;
		},
		{ immediate: true },
	);

	const isRange = ref(false);
	watch(
		isRange,
		() => {
			console.log('Changed isRange', isRange.value);
			string.value.lengthRange = isRange.value ? lengthRange.value : undefined;
		},
		{ immediate: true },
	);
</script>

<template>
	<div class="flex">
    String
		<VaCheckbox
			v-model="isRange"
			label="have lenght range"
		>
		</VaCheckbox>
		<range
			v-if="isRange"
			v-model:range="lengthRange"
		></range>
	</div>
</template>
