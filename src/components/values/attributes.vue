<script setup lang="ts">
	import { defineModel, ref, watchEffect } from 'vue';
	import { Attribute } from '@/mcdoc/attribute';
	import attribute from './attribute.vue';
	// @ts-ignore
	const attributes = defineModel('attributes', {
		type: Array<Attribute>,
		default: () => [],
		required: true,
	});
	const attributeTemp = ref<Attribute[]>([new Attribute('', '')]);

	watchEffect(() => {
		attributes.value = attributeTemp.value;
	});
</script>

<template>
	<div
		class="flex"
		v-for="(_, index) in attributeTemp"
	>
		<attribute v-model:attribute="attributes[index]"></attribute>
	</div>
</template>
