<script setup lang="ts">
import { RangeKind } from "@/mcdoc/util";
import { VaCheckbox,VaChip } from "vuestic-ui";
import { ref } from "vue";
import { defineModel } from "vue";

const rangekind = defineModel("rangekind", {
  type: RangeKind,
  default: () => new RangeKind(false, false),
  required: true,
});

const range = ref(rangekind);
</script>

<template>
  <div class="flex gap-2">
    <div class="flex items-center">
      
	<VaChip 
					outline
					color="#FFF"
					square
					size="medium"
					readonly
          >Is Left Exclusive</VaChip>
  
  <VaCheckbox
      class="checkbox-border"
      preset="primary"
      v-model="range.isLeftExclusive"
      placeholder="is left exclusive"
    />
    </div>
    <div class='flex relative items-center'>
      <VaChip 
					outline
					color="#FFF"
					square
					size="medium"
					readonly>Is Right Exclusive</VaChip>
    <VaCheckbox
      class="checkbox-border"
      preset="primary"
      type="number"
      v-model="range.isRightExclusive"
      placeholder="is right exclusive"
    />
    </div>
  </div>
</template>
