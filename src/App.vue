<script setup lang="ts">
import {
  useColors,
  VaButton,
  VaChip,
  VaInput,
  VaPopover,
  VaTextarea,
  //VaSelect,
} from "vuestic-ui";
import Test, { Struct } from "./components/test.vue";
import { ref, watch } from "vue";

useColors().applyPreset("dark");

let structName = defineModel("filterSearch", {
  default: "",
  set(value) {
    return value;
  },
});

const attributeDatas = ref([
  {
    nameType: null,
    name: "",
    selectedSourceName: "",
    attributes: [],
    valueType: "",
    stringValue: "",
    stringLength: -1,
    numberValue: "",
    property: "",
  },
]);

const genratedResult = ref(
  attributeDatas.value
    .map(
      (item) =>
        "{\n" +
        Object.entries(item)
          .map(([key, value]) => `    ${key}: ${value}`)
          .join(", \n") +
        "\n},"
    )
    .join(", \n")
);

const onAddAttributeData = () => {
  attributeDatas.value.push({
    nameType: null,
    name: "",
    selectedSourceName: "",
    attributes: [],
    valueType: "",
    stringValue: "",
    stringLength: -1,
    numberValue: "",
    property: "",
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
  <div class="min-h-screen flex flex-col">
    <div class="overflow-hidden relative flex-grow flex flex-row">
      <div class="flex-grow p-10">
        <div class="flex gap-3">
          <VaChip outline square color="rgb(34, 229, 164)" readonly>
            struct
          </VaChip>
          <VaInput placeholder="struct的名稱" v-model="structName" />
          <div class="inline text-2xl ml-10 text-zinc-50">{</div>
        </div>
        <div
          class="flex flex-col ml-10 p-5"
          v-for="(attributeData, index) in attributeDatas"
        >
          <Test :key="index" :attributeData="attributeData"> </Test>
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
      <div
        class="w-1/5 flex *:w-full *:m-0 shadow-2xl bg-gray-400 bg-opacity-30"
      >
        <VaTextarea
          v-model="genratedResult"
          disabled
          class="flex-grow bg-transparent outline-none border-none select-text"
        >
          {{ genratedResult }}
        </VaTextarea>
        <div class="absolute bottom-0 p-4 select-none pointer-events-none">
          <div
            class="rounded-full p-4 rounded-br-none rounded-tr-none bg-black bg-opacity-50 pointer-events-auto"
          >
            <VaPopover
              placement="top"
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
