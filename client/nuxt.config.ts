export default {
  devtools: { enabled: true },
  modules: ["@ant-design-vue/nuxt"],
  antd: { extractStyle: true },
  router: { middleware: ['auth'] },
};