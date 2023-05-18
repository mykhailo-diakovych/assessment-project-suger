import { createApp } from "vue";
import App from "./App.vue";
import { vuetify } from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import VueDatepickerUi from "vue-datepicker-ui";
import "vue-datepicker-ui/lib/vuedatepickerui.css";

const app = createApp(App);
app.component("Date-Picker", VueDatepickerUi);
loadFonts();

app.use(vuetify).mount("#app");
