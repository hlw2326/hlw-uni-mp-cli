import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import hlwUni from '@hlw-uni/mp-vite-plugin';

export default defineConfig({
  plugins: [
    uni(),
    hlwUni({ primaryColor: '{{primaryColor}}' }),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    port: 3000,
  },
});
