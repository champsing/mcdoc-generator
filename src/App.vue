<script setup lang="ts">
	import { useColors, VaButton, VaPopover, VaTextarea } from 'vuestic-ui';
	import { computed, ref } from 'vue';
	import startpoint from './components/startpoint.vue';

	useColors().applyPreset('dark');

	const test = ref('');

	const generatedResult = computed(() => {
		return test.value;
	});
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
				class="flex-grow p-10 relative overflow-y-auto overflow-x-auto h-full"
			>
				<startpoint v-model:result="test"></startpoint>
			</div>
			<div class="w-1/3 flex *:m-0 shadow-2xl bg-gray-800 bg-opacity-20">
				<VaTextarea
					v-model="generatedResult"
					disabled
					class="flex-grow bg-transparent outline-none border-none select-text text-white"
				>
					{{ generatedResult }}
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
											navigator.clipboard.writeText(generatedResult);
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
