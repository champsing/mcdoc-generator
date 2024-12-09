<script setup lang="ts">
	import { RangeKind } from '@/mcdoc/util';
	import { VaCheckbox } from 'vuestic-ui';
	import { ref } from 'vue';
	import { defineModel } from 'vue';

	const rangekind = defineModel('rangekind', {
		type: RangeKind,
		default: () => new RangeKind(false, false),
		required: true,
	});

	const range = ref(rangekind);
</script>

<template>
	<div class="flex">
		<VaCheckbox
			class="checkbox-border"
			preset="primary"
			v-model="range.isLeftExclusive"
			placeholder="is left exclusive"
			label="is left exclusive"
		/>
		<VaCheckbox
			class="checkbox-border"
			preset="primary"
			type="number"
			v-model="range.isRightExclusive"
			placeholder="is right exclusive"
			label="is right exclusive"
		/>
	</div>
</template>
