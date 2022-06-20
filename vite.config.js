import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from "path"

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  // const env = loadEnv(mode, __dirname);
  return{
    resolve:{
      alias:{
        "@":path.resolve(__dirname,"src")
      }
    },
    // base: env.VITE_API_BASE_URL,
    // define:{
    //   'process.env.VITE_API_BASE_URL':JSON.stringify(env.VITE_API_BASE_URL)
    // },
  
    server:{
      proxy:{
        '/api':{
          target:"http://ceshi13.dishait.cn",
          changeOrigin:true,
          rewrite: (path) => path.replace(/^\/api/,'')
        }
      }
    },
  
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    pluginOptions:{
      'style-resources-loader':{
          preProcessor:'scss',
          patterns:[]
      }
    }
  }
  
})
