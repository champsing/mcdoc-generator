<script setup lang="ts">
	import { defineModel } from 'vue';
	import { BooleanType } from '@/mcdoc/types';
	// @ts-ignore
	const boolean = defineModel('boolean', {
		type: BooleanType,
		default: () => new BooleanType(),
		required: true,
	});
</script>

<template>
	<div class="flex">Boolean</div>
</template>
