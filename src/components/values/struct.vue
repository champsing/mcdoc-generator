<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { AnyType, StructKey, StructType } from '@/mcdoc/types';
	import { VaInput, VaButton, VaCheckbox } from 'vuestic-ui';
	import { mapValue } from '@/composables/types';
	import structkey from './structkey.vue';
	import structvalue from './structvalue.vue';

	const struct = defineModel('struct', {
		type: StructType,
		default: () => {
			let struct = new StructType();
			struct.mapping = [];
			return struct;
		},
		required: true,
	});
	const name = ref('');
	watch(
		name,
		(newName) => {
			struct.value.name = newName;
		},
		{ immediate: true },
	);
	const mapping = ref<mapValue[]>([]);

	const handleAdd = () => {
		mapping.value.push({
			key: new StructKey(),
			value: new AnyType(),
			optional: false,
		});
	};

	watch(
		mapping,
		(newMapping) => {
			console.log('Changed mapping', newMapping);
			struct.value.mapping = newMapping.map((value) => {
				return [value.key, value.value];
			});
		},
		{ immediate: true, deep: true },
	);
</script>

<template>
	<div class="flex flex-col *:items-center ml-8">
		<div class="flex flex-row">
			Struct
			<VaInput
				v-model="name"
				placeholder="name"
			>
			</VaInput>
			<VaButton
				preset="primary"
				color="rgb(164, 255, 164)"
				@click="handleAdd"
				>+</VaButton
			>
		</div>
		<div
			v-for="(_, index) in mapping"
			class="flex ml-8"
		>
			<div class="flex flex-col ml-8">
				<structkey v-model:structkey="mapping[index].key"></structkey>
				<structvalue v-model:structvalue="mapping[index].value"></structvalue>
				<!--<VaCheckbox v-model="mapping[index].optional" label="optional"></VaCheckbox>-->
			</div>
		</div>
	</div>
</template>
