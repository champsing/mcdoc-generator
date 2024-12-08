<script setup lang="ts">
	import { defineModel, ref, watch } from 'vue';
	import { StructType } from '@/mcdoc/types';
	import { DispatchStatement } from '@/mcdoc/dispatch';
	import { VaSelect, VaButton } from 'vuestic-ui';
	import dispatch from './values/dispatch.vue';
	import struct from './values/struct.vue';

	type AvliableTypes = DispatchStatement | StructType;
	type AvliableKeys = 'Struct' | 'Dispatch';
	type AvliableTypesInArray = {
		type: AvliableKeys;
		value: AvliableTypes;
	};

	const result = defineModel('result', {
		type: String,
		default: () => '',
		required: true,
	});

	const avliableKeys = ['Struct', 'Dispatch'];
	const selectedKey = ref('Struct');
	const types = ref<Array<AvliableTypesInArray>>([
		{
			type: 'Dispatch',
			value: new DispatchStatement(),
		},
	]);
	watch(
		types,
		() => {
			result.value = types.value.map((type) => type.value.toString()).join('\n');
		},
		{ immediate: true, deep: Infinity },
	);
</script>

<template>
	<div class="flex flex-col">
		<div>
			<VaSelect
				v-model="selectedKey"
				:options="avliableKeys"
			></VaSelect>
			<VaButton
				@click="
					() => {
						if (selectedKey === 'Dispatch') {
							types.push({
								type: 'Dispatch',
								value: new DispatchStatement(),
							});
							return;
						}
						let struct = new StructType();
						struct.mapping = [];
						types.push({
							type: 'Struct',
							value: struct,
						});
						return;
					}
				"
				>+
			</VaButton>
		</div>

		<div
			v-for="(_, index) in types"
			class="ml-8"
		>
			<dispatch
				v-if="types[index].type === 'Dispatch'"
				v-model:dispatch="(types[index].value as DispatchStatement)"
			>
			</dispatch>
			<struct
				v-else
				v-model:struct="(types[index].value as StructType)"
			>
			</struct>
		</div>
	</div>
</template>
