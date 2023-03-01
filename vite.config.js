import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import { resolve } from "path";
// 引入viteMockServe
import { viteMockServe } from "vite-plugin-mock";
import viteCompression from "vite-plugin-compression";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

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
    plugins: [
      vue(),

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
        // 自动导入vue相关的Api
        imports: ["vue", "vue-router", "vuex"], // 也支持vue-router、axios等
        resolvers: [ElementPlusResolver()],
        // 声明文件的存放位置
        dts: "src/auto-imports.d.ts",
      }),

      Components({
        resolvers: [ElementPlusResolver()],
      }),

      viteMockServe({
        logger: false,
        mockPath: "./mock/",
        supportTs: false,
      }),
    ],

    base:"./",
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
      open:true, // 自动打开
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
