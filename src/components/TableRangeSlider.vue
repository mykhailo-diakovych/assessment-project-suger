<template>
  <v-range-slider
    color="primary"
    v-model="rangeValue"
    :step="1"
    max="300"
    min="0"
    thumb-label="always"
    hide-details
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VRangeSlider } from "vuetify/lib";

export default defineComponent({
  components: {
    VRangeSlider,
  },
  props: {
    range: {
      type: Array as () => number[],
      default: () => [0, 300],
    },
  },
  emits: ["input"],
  computed: {
    rangeValue: {
      get(): number[] {
        return this.range;
      },
      set(value: number[]): void {
        this.$emit("input", value);
      },
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
