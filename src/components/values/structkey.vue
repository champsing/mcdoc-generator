<script setup lang="ts">
import { ref, watch } from "vue";
import { StringType, StructKey } from "@/mcdoc/types";
import { NumericRange } from "@/mcdoc/util";
import { VaInput, VaSelect } from "vuestic-ui";
import string from "./string.vue";

const key = defineModel("structkey", {
  type: StructKey,
  default: () => new StructKey(),
  required: true,
});
const keyTypes = ["static", "dynamic"];
const keyType = ref("static");

const staticName = ref("");
const dynamicName = ref(
  (() => {
    let string = new StringType();
    string.lengthRange = new NumericRange();
    return string;
  })()
);

watch(
  [staticName, dynamicName],
  () => {
    key.value.name = staticName.value;
    key.value.isDynamic = keyType.value === "dynamic";
    key.value.dynamicKey = dynamicName.value;
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div class="flex gap-3">
    <VaSelect color="#B6FFF9" :options="keyTypes" v-model="keyType"></VaSelect>
    <div>
      <VaInput
        v-if="keyType === 'static'"
        v-model="staticName"
        placeholder="name"
      >
      </VaInput>
      <string
        v-if="keyType === 'dynamic'"
        v-model:string="dynamicName"
      ></string>
    </div>
  </div>
</template>
