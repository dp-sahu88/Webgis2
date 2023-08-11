import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium';
module.exports = {
    base:'/Webgis2/',
    devServer: {
      port: 80,
      host: '0.0.0.0'
    },
    plugins: [
      vue(),
      cesium(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }