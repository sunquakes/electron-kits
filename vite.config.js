import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  ssr: {
    external: ['mock-aws-s3', 'aws-sdk', 'nock', 'argon2']
  },
})
