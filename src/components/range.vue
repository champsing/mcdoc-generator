<script setup lang="ts">
	import { NumericRange } from '@/mcdoc/util';
	import { VaInput } from 'vuestic-ui';
	import { ref, watchEffect } from 'vue';
	import rangekind from './rangekind.vue';

	const range = defineModel('range', {
		type: NumericRange,
		default: () => new NumericRange(),
		required: true,
	});

	const rangeKind = ref(range.value.kind);
	const max = ref(range.value.max);
	const min = ref(range.value.min);
	watchEffect(() => {
    range.value.max = max.value;
		range.value.min = min.value;
		console.log('range.value -------------', range.value);
	});
</script>

<template>
	<div class="flex">
		<VaInput
			preset="primary"
			type="number"
			v-model="min"
			:rules="[
        (v: string) => !!v || 'min is required',
        (v: string) => !isNaN(Number(v)) || 'min must be a number',
      ]"
			placeholder="min"
		/>
		<VaInput
			preset="primary"
			type="number"
			v-model="max"
			:rules="[
        (v: string) => !!v || 'max is required',
        (v: string) => !isNaN(Number(v)) || 'max must be a number',
      ]"
			placeholder="max"
		/>
		<rangekind v-model:rangekind="rangeKind"></rangekind>
	</div>
</template>
