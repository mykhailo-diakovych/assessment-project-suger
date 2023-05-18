/* eslint-disable */
declare module '*.vue' {
  import type {DefineComponent} from 'vue'
  const component: DefineComponent<{}, {}, any>
    export default component
}
declare module 'vue-datepicker-ui' {
  import VueDatepickerUi from "vue-datepicker-ui";
  export default VueDatepickerUi
}