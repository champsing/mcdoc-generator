<script setup lang="ts">
	import {
		useColors,
		VaButton,
		VaChip,
		VaInput,
		VaPopover,
		VaTextarea,
		//VaSelect,
	} from 'vuestic-ui';
	import Test, { AttributeData } from './components/test.vue';
	import { computed, ref } from 'vue';
	import {
		IndexedType,
		NumericType,
		StringType,
		StructKey,
		StructType,
	} from './mcdoc/types';
	import { Attribute } from './mcdoc/attribute';
	import { NumericRange, RangeKind } from './mcdoc/util';

	useColors().applyPreset('dark');

	let structName = defineModel('filterSearch', {
		default: '',
		set(value) {
			return value;
		},
	});

	const attributeDatas = ref([
		{
			nameType: null,
			name: '',
			selectedSourceName: '',
			attributes: [],
			valueType: '',
			stringMin: -1,
			stringMax: -1,
			numberValue: '',
			property: '',
		},
	]);

	//generateFunction use mcdoc/types
	function generate(
		structData: AttributeData[],
		structName: string,
	): StructType {
		const dataType = new StructType();
		dataType.name = structName;
		dataType.mapping = structData.map((item) => {
			const structKey = new StructKey();
			structKey.name = item.name;
			if (item.nameType === 'dynamic') {
				structKey.isDynamic = true;
				structKey.dynamicKey.attributes = item.attributes.map((attribute) => {
					return new Attribute(attribute.type, attribute.value);
				});
			} else {
				structKey.isDynamic = false;
			}
			let type;

			if (item.valueType === 'string') {
				type = new StringType();
				const min = item.stringMin === -1 ? null : item.stringMin;
				const max = item.stringMax === -1 ? null : item.stringMax;
				if (min !== null && max !== null) {
					type = new NumericRange(new RangeKind(false, false), min, max);
				} else if (min !== null) {
					type = new NumericRange(new RangeKind(false, false), min, Infinity);
				} else if (max !== null) {
					type = new NumericRange(new RangeKind(false, false), 0, max);
				}
			}
			if (item.valueType === 'number') {
				const numbers = item.numberValue.split('..');
				type = new NumericType().kind = 'int';
				if (numbers.filter((n) => n === '').length === 2) {
					const number = numbers.map((n) => Number(n));
					type = new NumericRange(
						new RangeKind(false, false),
						number[0],
						number[1],
					);
				}
				if (numbers[0] === '') {
					const number = Number(numbers[1]);
					type = new NumericRange(
						new RangeKind(false, false),
						Infinity,
						number,
					);
				}
				if (numbers[1] === '') {
					const number = Number(numbers[0]);
					type = new NumericRange(new RangeKind(false, false), number, 0);
				}
			}
			if (item.valueType === 'property') {
				type = item.property;
			}

			return [structKey, type];
		});
		return dataType;
	}

	const genratedResult = computed(() => {
		try {
			return generate(attributeDatas.value, structName.value).toString();
		} catch (e) {
			return 'Error';
		}
	});

	const onAddAttributeData = () => {
		attributeDatas.value.push({
			nameType: null,
			name: '',
			selectedSourceName: '',
			attributes: [],
			valueType: '',
			stringMin: -1,
			stringMax: -1,
			numberValue: '',
			property: '',
		});
	};

	/*
	let property = defineModel('filterStatus', {
		default: null,
		set(value) {
			return value;
		},
	});

	const propertyOptions = ['string', 'array', 'other'];*/
</script>

<template>
	<div class="h-svh flex flex-col relative">
		<div class="overflow-hidden relative flex-grow flex flex-row">
			<div
				class="flex-grow p-10 relative overflow-y-auto overflow-x-hidden h-full"
			>
				<div class="flex gap-3">
					<VaChip
						outline
						square
						color="rgb(34, 229, 164)"
						readonly
					>
						struct
					</VaChip>
					<VaInput
						placeholder="struct的名稱"
						v-model="structName"
						type="string"
						immediate-validation
						:rules="[(v) => v.length > 0]"
					/>
					<div class="inline text-2xl ml-10 text-zinc-50">{</div>
				</div>
				<div
					class="flex flex-col ml-10 p-5"
					v-for="(attributeData, index) in attributeDatas"
				>
					<Test
						:key="index"
						:attributeData="attributeData"
					>
					</Test>
				</div>
				<VaButton
					preset="primary"
					border-color="rgb(34, 229, 164)"
					@click="onAddAttributeData"
				>
					+
				</VaButton>
				<div class="text-2xl text-zinc-50">}</div>
			</div>
			<div class="w-1/5 flex *:m-0 shadow-2xl bg-gray-400 bg-opacity-30">
				<VaTextarea
					v-model="genratedResult"
					disabled
					class="flex-grow bg-transparent outline-none border-none select-text"
				>
					{{ genratedResult }}
				</VaTextarea>
				<div
					class="absolute bottom-0 p-4 pr-0 select-none pointer-events-none right-0"
				>
					<div
						class="rounded-full p-4 rounded-br-none rounded-tr-none bg-black bg-opacity-50 pointer-events-auto"
					>
						<VaPopover
							placement="left"
							trigger="click"
							message="Copy to clipboard"
						>
							<VaButton
								preset="primary"
								size="small"
								class="bg-transparent"
								@click="
									(e) => {
										const navigator = e.view.navigator;
										if (navigator) {
											navigator.clipboard.writeText(genratedResult);
										}
									}
								"
							>
								Copy
							</VaButton>
						</VaPopover>
					</div>
				</div>
			</div>
		</div>

		<div class="sticky bottom-0 w-full h-auto">
			<div class="text-center text-base text-zinc-200 pt-4 pb-4 bg-zinc-900">
				<div class="flex justify-center">
					<div style="font-family: playfair display">
						Copyright © 2024 Cartoland
					</div>
					<!-- 
                    【&nbsp;】：半角スペースと同じサイズの空白
                    【&thinsp;】：&nbsp;の空白より小さい空白
                    【&ensp;】：半角スペースより間隔がやや広い空白
                    【&emsp;】：全角スペースとほぼ同じサイズの空白 
                        #Translation:
                    【&nbsp;】：與半角空格相同大小的空白
                    【&thinsp;】：比&nbsp;空白更小的空白
                    【&ensp;】：比半角空格稍寬的空白
                    【&emsp;】：與全角空格幾乎相同大小的空白
                -->
					&ensp;保留一切權利。
				</div>
				<!-- <div class="mt-2">隱私權政策&ensp;|&ensp;使用條款&ensp;|&ensp;法律聲明</div> -->
				<div class="flex justify-center mt-2">
					<VaButton
						preset="secondary"
						border-color="#363636"
						href=""
						target="_blank"
						rel="noopener noreferrer"
					>
						<div class="text-zinc-200">使用教學</div>
					</VaButton>
				</div>
			</div>
		</div>
	</div>
</template>
