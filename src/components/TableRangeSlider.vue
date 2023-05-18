<template>
  <v-range-slider
    color="primary"
    v-model="rangeValue"
    :step="1"
    :max="300"
    thumb-label="always"
    hide-details
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    range: {
      type: Array as () => number[],
      default: () => [],
      required: true,
    },
  },
  emits: ["update:range"],
  computed: {
    rangeValue: {
      get(): number[] {
        return this.range;
      },
      set(value: number[]): void {
        this.$emit("update:range", value);
      },
    },
  },
  methods: {
    updateRange(index: number, event: Event): void {
      const newValue = parseFloat((event.target as HTMLInputElement).value);
      this.$emit("update:range", [
        ...this.range.slice(0, index),
        newValue,
        ...this.range.slice(index + 1),
      ]);
    },
  },
});
</script>
<style>
.v-text-field .v-field--single-line input {
  padding-top: 0.625rem !important;
  padding-bottom: 0.625rem !important;
}
</style>
