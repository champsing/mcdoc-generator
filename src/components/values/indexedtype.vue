<script setup lang="ts">
	import { defineModel, ref, watchEffect } from 'vue';
	import { IndexedType, IdentifierType, IndexKey } from '@/mcdoc/types';
	import { VaSelect, VaInput } from 'vuestic-ui';
	// @ts-ignore
	const indexedtype = defineModel('indexedtype', {
		type: IndexedType,
		default: () => {
			const type = new IndexedType();
			type.index = new IndexKey();
			return type;
		},
		required: true,
	});
	const keyTypes = ['Dynamic', 'Static', 'All'];
	const dynamicKeyTypes = ['%fallback', '%key', '%parent'];
	const keyType = ref(keyTypes[0]);
	const staticKey = ref('');
	const dynamicKey = ref('');
	const identifiers = IdentifierType.identifiers;
	const currnetIdentifier = ref(IdentifierType.identifiers[0]);

	watchEffect(() => {
		const key = indexedtype.value.index;
		if (keyType.value === 'All') {
			key.isDynamic = true;
			key.dynamicKey = '%fallback';
			return (indexedtype.value.index = key);
		}
		key.isDynamic = keyType.value === 'Dynamic';
		key.staticKey = staticKey.value;
		key.dynamicKey = dynamicKey.value;
		indexedtype.value.index = key;
		indexedtype.value.dispatcher = currnetIdentifier.value;
	});
</script>

<template>
	<div class="flex">
		<VaSelect
			v-model="currnetIdentifier"
			:options="identifiers"
		></VaSelect>
		<VaSelect
			v-model="keyType"
			:options="keyTypes"
		></VaSelect>
		<VaSelect
			v-if="keyType === 'Dynamic'"
			v-model="dynamicKey"
			:options="dynamicKeyTypes"
		>
		</VaSelect>
		<VaInput
			v-if="keyType === 'Static'"
			v-model="staticKey"
		>
		</VaInput>
	</div>
</template>
