import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import path, { resolve } from "path";
import Icons from "unplugin-icons/vite";
// 引入viteMockServe
import { viteMockServe } from "vite-plugin-mock";
import viteCompression from "vite-plugin-compression";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import { svg4VuePlugin } from "vite-plugin-svg4vue";
const pathSrc = path.resolve(__dirname, "src");

import {
  createStyleImportPlugin,
  AndDesignVueResolve,
  VantResolve,
  ElementPlusResolve,
  NutuiResolve,
  AntdResolve,
} from "vite-plugin-style-import";

export default ({ mode }) => {
  return defineConfig({
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          charset: false,
          additionalData: '@import "./src/assets/style/global.less";',
        },
      },
    },
    plugins: [
      vue(),
      svg4VuePlugin(),

      // viteCompression({

      //   //生成压缩包gz

      //   verbose: false, // 输出压缩成功

      //   disable: false, // 是否禁用

      //   threshold: 1, // 体积大于阈值会被压缩，单位是b

      //   algorithm: 'gzip', // 压缩算法

      //   ext: '.gz',// 生成的压缩包后缀

      // }),

      createStyleImportPlugin({
        resolves: [
          AndDesignVueResolve(),

          VantResolve(),

          ElementPlusResolve(),

          NutuiResolve(),

          AntdResolve(),
        ],

        // 自定义规则
        libs: [],
      }),

      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "vue-router", "vuex"],

        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),

          // Auto import icon components
          // 自动导入图标组件
          IconsResolver({
            prefix: "Icon",
          }),
        ],

        dts: path.resolve(pathSrc, "auto-imports.d.ts"),
      }),

      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],

        dts: path.resolve(pathSrc, "components.d.ts"),
      }),

      Icons({
        autoInstall: true,
      }),

      viteMockServe({
        logger: false,
        mockPath: "mock",
        supportTs: false,
      }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@store": resolve(__dirname, "src/store"),
      },
    },

    build: {
      outDir: "tron-web",
      sourcemap: true,
      chunkSizeWarningLimit: 800,
      assetsDir: "./assets",
      emptyOutDir: false,
      // rollupOptions: {
      //   input: entrances,
      //   output: {
      //     chunkFileNames: "static/js/[name]-[hash].js",
      //     entryFileNames: "static/js/[name]-[hash].js",
      //     assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      //   },
      // },
    },

    server: {
      port: 3000, //启动端口
      host: "0.0.0.0",
      open: true, // 自动打开
      proxy: {
        // "/dapi": {
        //   target: "http://120.76.52.66",
        //   changeOrigin: true,
        //   rewrite: path => path.replace(/^\/dapi/, ""),
        // },
      },
    },
  });
};
