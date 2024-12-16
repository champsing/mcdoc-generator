<script setup lang="ts">
	import { defineModel } from 'vue';
	import { AnyType } from '@/mcdoc/types';
	import { VaChip } from 'vuestic-ui';
	// @ts-ignore
	const props = defineModel('any', {
		type: AnyType,
		default: () => new AnyType(),
		required: true,
	});
</script>

<template>
	<VaChip outline color="#FFF" square size="medium" readonly class="flex"
		>Any</VaChip
	>
</template>
