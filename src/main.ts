import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import { createVuesticEssential } from "vuestic-ui";
import "vuestic-ui/styles/essential.css";
import "vuestic-ui/styles/typography.css";

createApp(App)
    .use(createVuesticEssential())
    .mount("#app");