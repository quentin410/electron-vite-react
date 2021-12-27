import { defineConfig } from 'vite';
import path from 'path';
import styleImport from 'vite-plugin-style-import';
// import mpa from '@alife/vite-plugin-html-template-mpa';
import reactRouter from '@viterjs/vite-plugin-react-router-config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, '../server/public'),
    emptyOutDir: true,
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [
    react(),
    // mpa({
    //   mode: 'conventions', // 约定式模式
    //   pagesDir: 'src/pages', // 页面位置
    //   entryFileName: 'main.{js,ts,jsx,tsx}', // 入口文件名称
    //   template: './public/index.html', // 模板位置
    // }),
    reactRouter({
      routes: [
        { path: '/', component: './Home' },
        { path: '/home', component: './Home' },
        { path: '/about', component: './About' },
      ], // 路由配置
      dynamicImport: true, // 动态加载路由
      entryPath: '../node_modules/.viter/temp', // 入口文件生成路径
    }),
    styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: (name) => {
            return `/node_modules/antd/es/${name}/style/index`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      // {
      //   find: 'indexof',
      //   replacement: path.resolve(__dirname, './src/utils/indexof.js')
      // },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: 'utils',
        replacement: path.resolve(__dirname, './src/utils'),
      },
      {
        find: 'reducers',
        replacement: path.resolve(__dirname, './src/reducers'),
      },
      {
        find: 'components',
        replacement: path.resolve(__dirname, './src/components'),
      },
    ],
  },
});
