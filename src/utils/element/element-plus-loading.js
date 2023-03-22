import { ref, provide } from "vue";
export const LoadingPlugin = {
  install: (app) => {
    const loadingInstance = ref(null);

    const show = () => {
      loadingInstance.value.show();
    };

    const hide = () => {
      loadingInstance.value.hide();
    };

    app.config.globalProperties.$loading = {
      show,
      hide,
    };

    provide("loading", loadingInstance);
  },
};
