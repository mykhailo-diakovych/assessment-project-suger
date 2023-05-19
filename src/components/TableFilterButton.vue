<template>
  <div>
    <v-menu offset-y transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn large v-bind="attrs" v-on="on" rounded color="primary">
          {{ name }}
        </v-btn>
      </template>
      <v-list class="v-list__wrapper">
        <v-list-item
          @click="$emit('filterSource', item)"
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
    name: {
      type: String,
      default: "",
    },
  },
  emits: ["filterSource"],
});
</script>
<style>
.v-list__wrapper {
  max-height: 450px;
  overflow-y: scroll;
}
</style>
