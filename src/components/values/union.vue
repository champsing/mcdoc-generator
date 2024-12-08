<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { AnyType, UnionType } from '@/mcdoc/types';
	import { VaButton } from 'vuestic-ui';
	import structvalue from './structvalue.vue';
	import { AllTypes } from '@/composables/types';

	const union = defineModel('union', {
		type: UnionType,
		default: () => new UnionType(),
		required: true,
	});

	const mapping = ref<AllTypes[]>([]);

	const handleAdd = () => {
		mapping.value.push(new AnyType());
	};

	watch(
		mapping,
		(newMapping) => {
			console.log('Changed mapping', newMapping);
			union.value.contents = newMapping;
		},
		{ immediate: true, deep: true },
	);
</script>

<template>
	<div class="flex flex-row *:items-center text-center items-center overflow-hidden overflow-x-auto">
		Union
			<VaButton
				preset="primary"
				color="rgb(164, 255, 164)"
				@click="handleAdd"
				>+</VaButton
			>
		<div
			v-for="(_, index) in mapping"
			class="flex *:items-center "
		>
			<div>
				<structvalue v-model:structvalue="mapping[index]"></structvalue>
			</div>
		</div>
	</div>
</template>
