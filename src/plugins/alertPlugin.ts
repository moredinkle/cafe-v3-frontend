// alertPlugin.ts
import { type App } from 'vue';
import Alert from '../components/UI/Alert.vue';
import alertStore from '../stores/alert';

export default {
  install(app: App) {
    app.component('Alert', Alert);

    app.config.globalProperties.$showAlert = alertStore.showAlert;
    app.config.globalProperties.$hideAlert = alertStore.hideAlert;

    app.provide('visible', alertStore.visible);
    app.provide('message', alertStore.message);
    app.provide('icon', alertStore.icon);
    app.provide('color', alertStore.color);
    app.provide('hideAlert', alertStore.hideAlert);
  }
};
