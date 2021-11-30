import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, '../server/public'),
    emptyOutDir: true
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      // {
      //   find: 'indexof',
      //   replacement: path.resolve(__dirname, './src/utils/indexof.js')
      // },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src')
      },
      {
        find: 'utils',
        replacement: path.resolve(__dirname, './src/utils')
      },
      {
        find: 'reducers',
        replacement: path.resolve(__dirname, './src/reducers')
      },
      {
        find: 'components',
        replacement: path.resolve(__dirname, './src/components')
      }
    ]
  }
})
