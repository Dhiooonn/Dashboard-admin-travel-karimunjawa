import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "@/router/index";
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

app.use(router);
app.use(VueApexCharts);

app.component("apexchart", VueApexCharts);

app.mount("#app");
