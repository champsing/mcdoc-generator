<script setup lang="ts">
import { defineModel, ref, watch } from "vue";
import { StructType } from "@/mcdoc/types";
import { DispatchStatement } from "@/mcdoc/dispatch";
import { VaSelect, VaButton } from "vuestic-ui";
import dispatch from "./values/dispatch.vue";
import struct from "./values/struct.vue";

type AvailableTypes = DispatchStatement | StructType;
type AvailableKeys = "Struct" | "Dispatch";
type AvailableTypesInArray = {
  type: AvailableKeys;
  value: AvailableTypes;
};

const result = defineModel("result", {
  type: String,
  default: () => "",
  required: true,
});

const availableKeys = ["Struct", "Dispatch"];
const selectedKey = ref("Struct");
const types = ref<Array<AvailableTypesInArray>>([
  {
    type: "Dispatch",
    value: new DispatchStatement(),
  },
]);
watch(
  types,
  () => {
    result.value = types.value.map((type) => type.value.toString()).join("\n");
    console.log(result.value);
  },
  { immediate: true, deep: Infinity }
);
</script>

<template>
  <div class="flex flex-col">
    <div class="flex flex-row gap-2">
      <VaSelect v-model="selectedKey" :options="availableKeys"></VaSelect>
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

    <div v-for="(_, index) in types" class="*:m-4 text-white overflow-visible">
      <div
        class="ml-8 rounded-lg border-2 border-secondary *:border-0 *:rounded-none overflow-visible relative"
      >
        <VaButton
          @click="
            () => {
              types.splice(index, 1);
            }
          "
          icon="clear"
          color="rgb(244, 60, 60)"
          backgroundOpacity="0"
          hoverMaskColor="rgb(173, 1, 1)"
          hoverOpacity="1"
          class="absolute"
          :style="{ right: 0, top: 0 }"
        />
        <dispatch
          v-if="types[index].type === 'Dispatch'"
          v-model:dispatch="(types[index].value as DispatchStatement)"
        >
        </dispatch>
        <struct v-else v-model:struct="(types[index].value as StructType)">
        </struct>
      </div>
    </div>
  </div>
</template>

<style>
.checkbox-border {
  --va-checkbox-square-border: solid 2px rgb(93, 134, 169);
}
</style>
