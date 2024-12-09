<script setup lang="ts">
	import { defineModel, ref, watch } from 'vue';
	import { IdentifierType } from '@/mcdoc/types';
	import { VaSelect } from 'vuestic-ui';
	// @ts-ignore
	const identifier = defineModel('identifier', {
		type: IdentifierType,
		default: () => new IdentifierType(),
		required: true,
	});
	const identifiers = IdentifierType.identifiers;
	const currentIdentifier = ref(IdentifierType.identifiers[0]);
	watch(
		currentIdentifier,
		(newIdentifier) => {
			identifier.value.identifier = newIdentifier;
		},
		{ immediate: true },
	);
</script>

<template>
	Identifier Type:
	<VaSelect
		v-model="currentIdentifier"
		:options="identifiers"
	>
	</VaSelect>
</template>
