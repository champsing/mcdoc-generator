<script setup lang="ts">
	import { defineModel } from 'vue';
	import { AnyType } from '@/mcdoc/types';
	// @ts-ignore
	const props = defineModel('any', {
		type: AnyType,
		default: () => new AnyType(),
		required: true,
	});
</script>

<template>
	<div class="flex">Any</div>
</template>
