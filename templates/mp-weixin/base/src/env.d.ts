/// <reference types="@dcloudio/types" />
/// <reference types="vite/client" />
/// <reference types="@hlw-uni/mp-core/types/global" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<object, object, unknown>;
  export default component;
}

declare global {
  interface Vue {
    /** 统一全局命名空间: hlw.$msg · hlw.$device · hlw.$http */
    hlw: import('@hlw-uni/mp-core').HlwInstance;
    /** 兼容旧写法 */
    $msg: import('@hlw-uni/mp-core').HlwMsg;
  }
}
