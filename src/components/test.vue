<script setup lang="ts">
	import {
		useColors,
		VaSelect,
		VaInput,
		VaButton,
		VaChip,
		VaPopover,
	} from 'vuestic-ui';
	import { validAttributeNames } from '@/mcdoc/attribute';
	import { computed, ref } from 'vue';

	export type AttributeData = {
		nameType: string | null;
		name: string;
		selectedSourceName: string;
		attributes: Attribute[];
		valueType: string;
		stringMin: number;
		stringMax: number;
		numberValue: string;
		property: string;
	};
	/*
	const props = defineProps<{
		name: string;
		value: string;
		valueType: string;
		numberValue: string;
		stringMax: number;
		stringMin: string;
		selectedSourceName: string;
		nameType: string;
	}>();
	const emit = defineEmits<{
		'update:attributeData': Struct;
	}>();
    */

	interface Attribute {
		type: string;
		value: string;
	}
	enum ValueType {
		Refer = 'refer',
		Number = 'number',
		String = 'string',
	}

	useColors().applyPreset('dark');

	// 子層元件用來接父層往下傳的資料
	const attributeData = defineModel('attributeData', {
		type: Object as () => AttributeData,
		default: () => ({
			nameType: null,
			name: '',
			selectedSourceName: '',
			attributes: [],
			valueType: '',
			stringMin: -1,
			stringMax: -1,
			numberValue: '',
			property: '',
		}),
		set(value) {
			return value;
		},
	});
	// 只有這層用到，用ref
	const currentAttributeData = ref({
		type: '',
		value: '',
	});
	const sourceNameType = ['value', 'dymanic'];
	const propertyList = ['a', 'b', 'c'];
	const sourcesName = ['a', 'b', 'c'];
	const attributeTypes = Array.from(validAttributeNames);

	const attributeTypeOption = computed(() =>
		attributeTypes.filter(
			(attribute) =>
				!attributeData.value.attributes.some(
					(a: Attribute) => a.type === attribute,
				),
		),
	);
	const valueTypeOption = Object.values(ValueType);
	/*
	const stringRuleSet = ref([
		(v: string) =>
			v.length <
			(attributeData.value.stringMax >= 0
				? attributeData.value.stringMax
				: Infinity),
	]);*/
	const numberRuleSet = ref([
		(v: string) => {
			const splited = v.split('..');
			if (splited.length !== 2) {
				return !(v === '' || isNaN(Number(v)));
			}
			if (!/(\d+)\.\.(\d+)|(\d+)\.\.|\.\.(\d+)/gm.test(v)) {
				return false;
			}
			const splitedToNumber = splited
				.filter((n) => n !== '')
				.map((s) => Number(s));
			if (splitedToNumber.length === 1) {
				return true;
			}
			return splitedToNumber[0] > splitedToNumber[1];
		},
	]);

	const attributeRuleSet = ref((type: string) => {
		if (type === 'color') {
			return [
				(v: string) => {
					//hex or rgb
					return !!v.match(
						/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$|^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/,
					);
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

	/**新增屬性 */
	const onAddAttribute = () => {
		const { type, value } = currentAttributeData.value;
		if (type === '' || value === '') return;
		attributeData.value.attributes.push({
			type,
			value,
		});
		currentAttributeData.value.type = '';
		currentAttributeData.value.value = '';
	};

	/**刪除屬性 */
	const onDeleteAttribute = (index: number) => {
		attributeData.value.attributes.splice(index, 1);
	};
</script>

<template>
	<div class="flex flex-col gap-3">
		<div class="flex flex-row gap-3">
			<VaSelect
				v-model="attributeData.nameType"
				:options="sourceNameType"
				placeholder="Type"
			/>
			<div>
				<VaInput
					v-if="
						attributeData.nameType === 'value' ||
						attributeData.nameType === null
					"
					v-model="attributeData.name"
					placeholder="Name"
					:disabled="
						attributeData.nameType === 'dymanic' ||
						attributeData.nameType === null
					"
				/>
				<VaSelect
					v-if="attributeData.nameType === 'dymanic'"
					v-model="attributeData.selectedSourceName"
					:options="sourcesName"
					placeholder="Dymanic name"
				/>
			</div>
			<p class="text-2xl ml-2 mr-2">:</p>
		</div>

		<div class="flex gap-3 ml-8">
			<VaSelect
				v-model="currentAttributeData.type"
				:options="attributeTypeOption"
				placeholder="Attribute type"
			/>
			<VaInput
				v-model="currentAttributeData.value"
				placeholder="Attribute data"
				:rules="attributeRuleSet(currentAttributeData.type)"
			/>

			<VaPopover
				class="mr-2 flex justify-center"
				message="新增屬性"
			>
				<!-- 加屬性 -->
				<VaButton
					preset="primary"
					size="small"
					color="rgb(164, 255, 164)"
					@click="onAddAttribute"
				>
					+
				</VaButton>
			</VaPopover>
		</div>
		<div
			v-if="attributeData.attributes.length > 0"
			class="m-4 ml-12 flex flex-col gap-3"
		>
			<div
				v-for="(attribute, index) in attributeData.attributes"
				:key="index"
				class="flex flex-row gap-3"
			>
				<VaChip
					outline
					square
					color="rgb(34, 229, 164)"
					readonly
				>
					{{ attribute.type }}
				</VaChip>
				:
				<VaChip
					outline
					square
					primary
					readonly
				>
					{{ attribute.value }}
				</VaChip>
				<VaPopover
					class="mr-2 flex justify-center"
					message="刪除屬性"
				>
					<!-- 刪除屬性 -->
					<VaButton
						preset="primary"
						size="small"
						color="danger"
						@click="onDeleteAttribute(index)"
					>
						X
					</VaButton>
				</VaPopover>
			</div>
		</div>

		<div class="flex flex-row gap-3 ml-8">
			<div>
				<VaSelect
					v-model="attributeData.valueType"
					:options="valueTypeOption"
					placeholder="Value type"
				/>
			</div>
			<div v-if="attributeData.valueType === ValueType.String">
				<VaInput
					v-model="attributeData.stringMin"
					placeholder="String Length Min"
					type="number"
					:rules="[(v) => parseInt(v) >= -1]"
					error-messages="String Value must be a strings"
				/>
				@
				<VaInput
					v-model="attributeData.stringMax"
					placeholder="String Length Max"
					type="number"
					:rules="[(v) => parseInt(v) >= -1]"
					error-messages="stringMax must be a number"
				/>
			</div>
			<div v-if="attributeData.valueType === ValueType.Number">
				<VaInput
					v-model="attributeData.numberValue"
					placeholder="Number value"
					type="string"
					immediate-validation
					:rules="numberRuleSet"
					error-messages="numberValue must be a number"
				/>
			</div>
			<div
				v-if="attributeData.valueType === ValueType.Refer"
				class="inline-flex"
			>
				<p class="text-2xl ml-2 mr-2">[[[</p>
				<VaSelect
					v-model="attributeData.property"
					placeholder="Property"
					:options="propertyList"
				/>
				<p class="text-2xl ml-2 mr-2">]]]</p>
			</div>
		</div>
	</div>
</template>
