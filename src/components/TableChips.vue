<template>
  <div v-if="chips.length > 0" class="mt-4">
    <v-chip
      @click:close="$emit('removeFilter', item)"
      v-for="item in chips"
      :key="item.title"
      class="mr-2 mb-2 pa-5"
      close
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
