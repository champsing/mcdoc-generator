<script setup lang="ts">
import { defineModel } from "vue";
import { BooleanType } from "@/mcdoc/types";
import {VaChip} from 'vuestic-ui'
// @ts-ignore
const boolean = defineModel("boolean", {
  type: BooleanType,
  default: () => new BooleanType(),
  required: true,
});
</script>

<template>
	
	<VaChip 
					outline
					color="#FFF"
					square
					size="medium"
					readonly
	class="flex">Boolean</VaChip>
</template>
