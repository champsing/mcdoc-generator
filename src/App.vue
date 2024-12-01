<script setup lang="ts">
import {
    useColors,
    VaButton,
    VaChip,
    VaDivider,
    VaInput,
    VaSelect,
} from "vuestic-ui";

useColors().applyPreset("dark");

let structName = defineModel("filterSearch", {
    default: "",
    set(value) {
        return value;
    },
});

let property = defineModel("filterStatus", {
    default: null,
    set(value) {
        return value;
    },
});

const propertyOptions = ["a", "b", "c"];
</script>

<template>
    <div class="min-h-screen overflow-hidden relative">
        <div class="flex">
            <VaChip outline square color="rgb(34, 229, 164)" readonly>
                struct
            </VaChip>
            <VaInput placeholder="struct的名稱" v-model="structName" />
            <div class="inline text-2xl ml-10 text-zinc-50">{</div>
        </div>
        <div class="flex flex-col ml-10">
            <div class="flex flex-row">
                <VaSelect
                    v-model="property"
                    :options="propertyOptions"
                    placeholder="Select a property"
                />
            </div>
        </div>
        <div class="text-2xl text-zinc-50">}</div>
    </div>
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
                -->
            &ensp;保留一切權利。
        </div>
        <!-- <div class="mt-2">隱私權政策&ensp;|&ensp;使用條款&ensp;|&ensp;法律聲明</div> -->
        <div class="flex justify-center mt-2">
            <VaButton preset="secondary" border-color="#363636" to="">
                <div class="text-zinc-200">使用條款</div>
            </VaButton>
            <VaDivider vertical />
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
</template>
