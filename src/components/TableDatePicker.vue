<template>
  <Date-Picker
    lang="en"
    circle
    show-clear-button
    range
    :value="selectedDate"
    @input="onInput"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    selectedDate: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onInput(value: string): void {
      this.$emit("update:selectedDate", value);
    },
  },
});
</script>
<style>
.v-calendar .input-field input {
  height: 2.75rem !important;
}

.v-calendar {
  --v-calendar-datepicker-icon-color: rgb(98, 0, 238);
  --v-calendar-active-bg-color: rgb(98, 0, 238);
  --v-calendar-range-bg-color: #c3a9f9;
}
</style>
