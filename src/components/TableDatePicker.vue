<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        class="ml-4 calendar-text-field"
        v-model="computedDate"
        label="Select date"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker v-model="computedDate" no-title range scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false"> Cancel</v-btn>
      <v-btn text color="primary" @click="$refs.menu.save(computedDate)">
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      menu: false,
    };
  },
  props: {
    selectedDate: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:selected-date"],
  computed: {
    computedDate: {
      get(): any {
        return this.selectedDate;
      },
      set(value: string[]): void {
        this.$emit("update:selected-date", value);
      },
    },
  },
});
</script>
<style>
.v-calendar .input-field input {
  height: 2.75rem !important;
}

.calendar-text-field {
  width: 230px !important;
}
</style>
