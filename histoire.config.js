import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'

export default defineConfig({
  vite: {
    base: '/ui-kit/'
  },
  plugins: [
    HstVue(),
  ],
})