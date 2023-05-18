import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDataTable } from "vuetify/labs/VDataTable";

export const vuetify = createVuetify({
  directives,
  components: {
    VDataTable,
    ...components,
  },
});

// // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
