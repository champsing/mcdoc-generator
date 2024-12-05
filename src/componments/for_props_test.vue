<script setup lang="ts">
  const props = defineProps<{
    name: string;
    value: string;
    valueType: string;
    numberValue: string;
    stringLength: number;
    StringValue: string;
    selectedSourceName: string;
    nameType: string;
  }>()
  const emit = defineEmits<{
    (event: 'update:name', value: string): void;
  }>()
</script>