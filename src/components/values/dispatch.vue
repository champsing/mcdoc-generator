<script setup lang="ts">
	import { defineModel, ref, watch } from 'vue';
	import { AnyType, McdocType } from '@/mcdoc/types';
	import { DispatchStatement } from '@/mcdoc/dispatch';
	import { VaSelect, VaInput, VaButton, VaChip } from 'vuestic-ui';
	import structvalue from './structvalue.vue';

	type Keys = {
		keyType: string;
		key: string;
	};

	const dispatch = defineModel('dispatch', {
		type: DispatchStatement,
		default: () => new DispatchStatement(),
		required: true,
	});

	const dispatcher = ref('');
	const availableKeys = ['Input', '%unknown', '%none'];
	const keys = ref<Keys[]>([]);
	const type = ref<McdocType>(new AnyType());
	watch(
		type,
		() => {
			console.log('Changed type');
			console.log(type.value);
			return (dispatch.value.targetType = type.value);
		},
		{ immediate: true, deep: Infinity },
	);
	watch(
		dispatcher,
		(newDispatcher) => {
			dispatch.value.dispatcher = newDispatcher;
		},
		{ immediate: true, deep: true },
	);
	watch(
		keys,
		(newKeys) => {
			dispatch.value.keys = newKeys.map((key) => {
				if (key.keyType === 'Input') {
					return key.key;
				}
				return key.keyType;
			});
		},
		{ immediate: true, deep: true },
	);
</script>

<template>
	<div
		class="flex flex-col bg-primary rounded-lg *:max-w-min border-2 border-primary"
	>
		<div class="m-4 flex flex-ro gap-2 mb-0">
			<VaChip
				outline
				color="#FFF"
				square
				size="medium"
				readonly
				>Dispatch
			</VaChip>
			<VaInput
				v-model="dispatcher"
				placeholder="Dispatcher"
			></VaInput>
			<VaButton
				preset="primary"
				color="rgb(164, 255, 164)"
				@click="
					() => {
						keys.push({ keyType: 'Input', key: '' });
					}
				"
				>+
			</VaButton>
		</div>
		<div
			class="flex flex-row ml-8 bg-secondary p-2 rounded-lg items-center border-2 border-secondary"
			v-if="keys.length > 0"
		>
			<VaChip
				outline
				color="#FFF"
				square
				size="medium"
				readonly
				>Key
			</VaChip>
			<div class="flex flex-col">
				<div v-for="(_, index) in keys">
					<div class="flex flex-row ml-2 gap-1">
						<VaSelect
							color="#447766"
							v-model="keys[index].keyType"
							:options="availableKeys"
						/>
						<VaInput
							v-if="keys[index].keyType === 'Input'"
							v-model="keys[index].key"
						/>
						<VaButton
							icon="clear"
							color="rgb(244, 60, 60)"
							backgroundOpacity="0"
							hoverMaskColor="rgb(173, 1, 1)"
							hoverOpacity="1"
							@click="
								() => {
									keys.splice(index, 1);
								}
							"
						/>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-row ml-24 m-2 rounded-lg">
			<structvalue
				class="bg-secondary"
				v-model:structvalue="type"
			/>
		</div>
	</div>
</template>
