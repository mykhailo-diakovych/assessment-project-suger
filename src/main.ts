import "vue-datepicker-ui/lib/vuedatepickerui.css";
import Vue from "vue";
import vuetify from "@/plugins/vuetify";
import App from "@/App.vue";
import "@mdi/font/css/materialdesignicons.css";
import VueDatepickerUi from "vue-datepicker-ui";

Vue.component("Date-Picker", VueDatepickerUi);
new Vue({
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
