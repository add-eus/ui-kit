import { defineConfig } from 'histoire';
import { HstVue } from '@histoire/plugin-vue';

export default defineConfig({
  setupFile: './histoire.setup.ts',
  vite: {
    base: '/ui-kit/',
    resolve: {
      alias: [
          {
              find: "/@ui-kit",
              replacement: process.cwd(),
          },
      ],
  },
  },
  plugins: [
    HstVue(),
  ]
})