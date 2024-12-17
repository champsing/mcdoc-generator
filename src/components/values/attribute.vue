<script setup lang="ts">
	import { defineModel, ref, watchEffect } from 'vue';
	import { Attribute, validAttributeNames } from '@/mcdoc/attribute';
	import { VaSelect, VaInput } from 'vuestic-ui';
	// @ts-ignore
	const attribute = defineModel('attribute', {
		type: Attribute,
		default: () => new Attribute('', ''),
		required: true,
	});
	const validNames = Array.from(validAttributeNames);
	const name = ref(validNames[0]);
	const value = ref('');
	// @ts-ignore
	const nameWithValues = [['color', 'hex_rgb']];
	watchEffect(() => {
		attribute.value.name = name.value;
		attribute.value.value = name.value === 'color' ? 'hex_rgb' : value.value;
	});

	const attributeRuleSet = ref((type: string) => {
		if (type === 'color') {
			return [
				(v: string) => {
					//hex or rgb
					return [
						!!v.match(
							/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$|^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/,
						),
					];
				},
			];
		}
		if (type === 'dispatcher_key') {
			//source from util/isResourceLocation
			return [(v: string) => !!v.match(/^[a-z0-9_]*:[a-z0-9_]+$/)];
		}
		if (['text_component', 'command', 'uuid'].includes(type)) {
			return [(_: string) => false];
		}
	});
</script>

<template>
	<div class="flex">
		<VaSelect v-model="name" :options="validNames"></VaSelect>
		<VaInput
			v-model="value"
			v-if="name !== 'color'"
			:rules="attributeRuleSet(name)"
		>
		</VaInput>
	</div>
</template>
