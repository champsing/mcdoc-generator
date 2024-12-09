<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { StringType } from '@/mcdoc/types';
	import { NumericRange } from '@/mcdoc/util';
	import { VaCheckbox, VaChip } from 'vuestic-ui';
	import { Attribute } from '@/mcdoc/attribute';
	import attributes from './attributes.vue';
	import range from '../range.vue';

	const string = defineModel('string', {
		type: StringType,
		default: () => new StringType(),
		required: true,
	});
	const lengthRange = ref(new NumericRange());
	watch(
		lengthRange,
		(newRange) => {
			string.value.lengthRange = newRange;
		},
		{ immediate: true },
	);

	const isRange = ref(false);
	watch(
		isRange,
		() => {
			console.log('Changed isRange', isRange.value);
			string.value.lengthRange = isRange.value ? lengthRange.value : undefined;
		},
		{ immediate: true },
	);

	const attributeData = ref<Attribute[]>([]);
	watch(
		attributeData,
		(value) => {
			console.log('attributeData', value);
			string.value.attributes = value;
		},
		{ deep: true, immediate: true },
	);
</script>

<template>
	<div class="flex flex-col">
		<div class="flex flex-col">
			<div>
				<VaChip
					outline
					color="#FFF"
					square
					size="medium"
					readonly
					>String
				</VaChip>
			</div>
			<div class="flex flex-row">
				<attributes v-model:attributes="attributeData" />
			</div>

			<div class="flex items-center">
				<VaChip
					outline
					color="#FFF"
					square
					size="medium"
					readonly
					>have length range
				</VaChip>
				<VaCheckbox v-model="isRange" class="checkbox-border"></VaCheckbox>
			</div>
		</div>
		<range
			v-if="isRange"
			v-model:range="lengthRange"
		></range>
	</div>
</template>
