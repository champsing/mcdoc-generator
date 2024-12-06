<script setup lang="ts">
import { useColors, VaSelect, VaInput, VaButton, VaChip } from "vuestic-ui";
import { validAttributeNames } from "../mcdoc/attribute";
import { computed, ref } from "vue";

// const props = defineProps<{
//     name: string;
//     value: string;
//     valueType: string;
//     numberValue: string;
//     stringLength: number;
//     StringValue: string;
//     selectedSourceName: string;
//     nameType: string;
// }>();
// const emit = defineEmits<{
//     (event: "update:name", value: string): void;
// }>();

interface Attribute {
    type: string;
    value: string;
}

useColors().applyPreset("dark");

const sourceNameType = ["value", "dymanic"];
const nameType = defineModel("nameType", {
    default: null,
    set(value) {
        return value;
    },
});
const sourcesName = ["a", "b", "c"];
const selectedSourceName = defineModel("selectedSourceName", {
    default: null,
    set(value) {
        return value;
    },
});
const name = defineModel("name", {
    default: "",
    set(value) {
        return value;
    },
});

const valueType = defineModel("valueType", {
    default: "",
    set(value) {
        return value;
    },
});

const attributes = ref<Attribute[]>([]);

const currentAttributeType = defineModel("currentAttributeType", {
    default: "",
    set(value) {
        return value;
    },
});
const currentAttributeData = defineModel("currentAttributeData", {
    default: "",
    set(value) {
        return value;
    },
});

const attributeTypeOptions = computed(() =>
    Array.from(validAttributeNames).filter(
        (attribute) => !attributes.value.some((a) => a.type === attribute)
    )
);

enum valueTypes {
    refer = "refer",
    number = "number",
    string = "string",
}
const valueTypesOptions = Object.keys(valueTypes);

const numberValue = defineModel("numberValue", {
    default: "",
    set(value) {
        return value;
    },
});

const numberRuleSet = ref([
    (v) =>
        !(v === "" || isNaN(Number(v))) ||
        (/(\d+)\.\.(\d+)|(\d+)\.\.|\.\.(\d+)/gm.test(v) &&
        v.split("..").length === 2
            ? parseInt(v.split("..")[0]) >= parseInt(v.split("..")[1])
            : true),
]);

const stringLength = defineModel("stringLength", {
    default: -1,
    set(value) {
        return value;
    },
});

const StringValue = defineModel("StringValue", {
    default: "",
    set(value) {
        return value;
    },
});

const PropertyList = ["a", "b", "c"];

const Property = defineModel("Property", {
    default: "",
    set(value) {
        return value;
    },
});
</script>

<template>
    <div class="flex flex-col">
        <div class="flex flex-row">
            <VaSelect
                v-model="nameType"
                :options="sourceNameType"
                placeholder="Type"
            />
            <div>
                <VaInput
                    v-if="nameType === 'value' || nameType === null"
                    placeholder="name"
                    v-model="name"
                    :disabled="nameType === 'dymanic' || nameType === null"
                />
                <VaSelect
                    v-if="nameType === 'dymanic'"
                    placeholder="name"
                    v-model="selectedSourceName"
                    :options="sourcesName"
                />
            </div>
            <p class="text-2xl ml-2 mr-2">:</p>
        </div>

        <div class="flex">
            <VaSelect
                v-model="currentAttributeType"
                :options="attributeTypeOptions"
                placeholder="attributeType"
            />
            <VaInput
                placeholder="attributeData"
                v-model="currentAttributeData"
            />

            <VaButton
                preset="primary"
                size="small"
                color="rgb(164, 255, 164)"
                @click="
                    () => {
                        if (
                            currentAttributeType === '' ||
                            currentAttributeData === ''
                        )
                            return;
                        attributes.push({
                            type: currentAttributeType,
                            value: currentAttributeData,
                        });
                        currentAttributeType = '';
                        currentAttributeData = '';
                    }
                "
            >
                +
            </VaButton>
        </div>
        <div class="m-4 flex flex-col *:ml-2">
            <div
                v-for="(attribute, index) in attributes"
                :key="index"
                class="flex flex-row"
            >
                <VaChip outline square color="rgb(34, 229, 164)" readonly>
                    {{ attribute.type }}
                </VaChip>
                <VaChip outline square color="rgb(34, 229, 164)" readonly>
                    {{ attribute.value }}
                </VaChip>
            </div>
        </div>

        <div class="flex flex-row">
            <div>
                <VaSelect
                    :options="valueTypesOptions"
                    placeholder="valueType"
                    v-model="valueType"
                />
            </div>
            <div v-if="valueType === valueTypes.string">
                <VaInput
                    placeholder="StringValue"
                    v-model="StringValue"
                    type="string"
                    :rules="[
                        (v) =>
                            v.length <
                            (stringLength >= 0 ? stringLength : Infinity),
                    ]"
                    error-messages="String Value must be a strings"
                />
                @
                <VaInput
                    placeholder="String Length"
                    v-model="stringLength"
                    type="number"
                    :rules="[(v) => parseInt(v) >= -1]"
                    error-messages="stringLength must be a number"
                />
            </div>
            <div v-if="valueType === valueTypes.number">
                <VaInput
                    placeholder="numberValue"
                    v-model="numberValue"
                    type="string"
                    :rules="numberRuleSet"
                    error-messages="numberValue must be a number"
                />
            </div>
            <div v-if="valueType === valueTypes.refer" class="inline-flex">
                <p class="text-2xl ml-2 mr-2">[[[</p>
                <VaSelect
                    placeholder="Property"
                    :options="PropertyList"
                    v-model="Property"
                />
                <p class="text-2xl ml-2 mr-2">]]]</p>
            </div>
        </div>
    </div>
</template>
