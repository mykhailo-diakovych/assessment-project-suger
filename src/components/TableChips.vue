<template>
  <div v-if="chips.length > 0" class="mt-4">
    <v-chip
      @click="$emit('removeFilter', item)"
      v-for="item in chips"
      :key="item"
      class="mr-2 mb-2 pa-5"
      closable
      >{{ `${item.label}: ${item.title}` }}
    </v-chip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    chips: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["removeFilter"],
});
</script>
