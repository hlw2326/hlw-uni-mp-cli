import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import hlwUni from '@hlw-uni/mp-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig(async () => {
  // unocss 0.59+ 需要使用 async import 方式加载
  // https://github.com/dcloudio/uni-app/issues/4815
  const UnoCss = await import('unocss/vite').then(i => i.default);

  return {
    plugins: [
      uni(),
      hlwUni(),
      // https://github.com/unocss/unocss
      UnoCss(),
    ],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  };
});
