<script setup lang="ts">
import { defineModel, ref, watchEffect } from "vue";
import { VaButton, VaChip } from "vuestic-ui";
import { Attribute } from "@/mcdoc/attribute";
import attribute from "./attribute.vue";
// @ts-ignore
const attributes = defineModel("attributes", {
    type: Array<Attribute>,
    default: () => [],
    required: true,
});
const attributeTemp = ref<Attribute[]>([]);

watchEffect(() => {
    attributes.value = attributeTemp.value;
});
</script>

<template>
    <div class="flex flex-row items-center">
        <div class="flex flex-row items-center gap-1 m-2 ml-0">
            <VaChip
                class="flex-shrink-0 self-start mt-1"
                outline
                color="#FFF"
                square
                size="medium"
                readonly
            >
                Attributes
            </VaChip>
            <div class="flex flex-col gap-2">
                <div v-for="(_, index) in attributeTemp">
                    <attribute
                        v-model:attribute="attributes[index]"
                    ></attribute>
                </div>
            </div>
            <VaButton
                class="max-h-min self-end"
                color="#447766"
                @click="attributeTemp.push(new Attribute('', ''))"
                >+</VaButton
            >
        </div>
    </div>
</template>
