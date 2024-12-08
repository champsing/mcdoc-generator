<script setup lang="ts">
	import { defineModel, ref, watch } from 'vue';
	import { AnyType, McdocType } from '@/mcdoc/types';
	import { DispatchStatement } from '@/mcdoc/dispatch';
	import { VaSelect, VaInput, VaButton } from 'vuestic-ui';
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
	const avliableKeys = ['Input', '%unknown', '%none'];
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
	<div class="flex flex-col">
		<div>
			Dispatch
			<VaInput v-model="dispatcher"></VaInput>
			<VaButton
				@click="
					() => {
						keys.push({ keyType: 'Input', key: '' });
					}
				"
				>+
			</VaButton> </div
		><div class="flex flex-row ml-8">
			Key :
			<div class="flex flex-col">
				<div v-for="(_, index) in keys">
					<div class="flex flex-row ml-2">
						<VaSelect
							v-model="keys[index].keyType"
							:options="avliableKeys"
						></VaSelect>
						<VaInput
							v-if="keys[index].keyType === 'Input'"
							v-model="keys[index].key"
						>
						</VaInput>
						<VaButton
							@click="
								() => {
									keys.splice(index, 1);
								}
							"
							>-</VaButton
						>
					</div>
				</div>
			</div>
		</div>
		<structvalue
			class="ml-24"
			v-model:structvalue="type"
		></structvalue>
	</div>
</template>
