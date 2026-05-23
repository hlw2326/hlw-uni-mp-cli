import presetWeapp from 'unocss-preset-weapp'
import { extractorAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import transformerDirectives from '@unocss/transformer-directives'
import { presetIcons } from '@unocss/preset-icons'

const { presetWeappAttributify, transformerAttributify } = extractorAttributify()

export default {
    presets: [
        presetWeapp(),
        presetWeappAttributify(),
        presetIcons({
            scale: 1.2,
            warn: true,
            extraProperties: {
                display: 'inline-block',
                'vertical-align': 'middle',
            },
            collections: {
                'fa6-solid': () => import('@iconify-json/fa6-solid/icons.json').then(i => i.default as any),
                'fa6-brands': () => import('@iconify-json/fa6-brands/icons.json').then(i => i.default as any),
                'ri': () => import('@iconify-json/ri/icons.json').then(i => i.default as any),
            },
        }),
    ],
    theme: {
        // 字号全部走 CSS 变量，由 mp-vue/theme 的字体档位（small/normal/large/xlarge）
        // 运行时注入 --font-* 驱动；style.scss 里的兜底值保证首屏不闪烁。
        // 档位由 mp-vue/font.ts 定义，六档对应 --font-xs..xl。
        fontSize: {
            // 主题档：跟随 mp-vue 字号偏好缩放
            xs:   ['var(--font-xs)',   { 'line-height': '1.5' }],
            sm:   ['var(--font-sm)',   { 'line-height': '1.5' }],
            base: ['var(--font-base)', { 'line-height': '1.5' }],
            md:   ['var(--font-md)',   { 'line-height': '1.5' }],
            lg:   ['var(--font-lg)',   { 'line-height': '1.5' }],
            xl:   ['var(--font-xl)',   { 'line-height': '1.5' }],
            // 原子档：text-20/22/.../40，绝对值不跟主题切换
            20: ['var(--font-20)', { 'line-height': '1.5' }],
            22: ['var(--font-22)', { 'line-height': '1.5' }],
            24: ['var(--font-24)', { 'line-height': '1.5' }],
            26: ['var(--font-26)', { 'line-height': '1.5' }],
            28: ['var(--font-28)', { 'line-height': '1.5' }],
            30: ['var(--font-30)', { 'line-height': '1.5' }],
            32: ['var(--font-32)', { 'line-height': '1.5' }],
            34: ['var(--font-34)', { 'line-height': '1.5' }],
            36: ['var(--font-36)', { 'line-height': '1.5' }],
            38: ['var(--font-38)', { 'line-height': '1.5' }],
            40: ['var(--font-40)', { 'line-height': '1.5' }],
        },
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#06f',
                    50: '#f0f7ff',
                    100: '#e0f0ff',
                    200: '#bae0ff',
                    300: '#7cc4ff',
                    400: '#36a3ff',
                    500: '#3c9cff',
                    600: '#0d7eff',
                    700: '#0066ff',
                    800: '#0052cc',
                    900: '#004299',
                },
                success: {
                    DEFAULT: '#5ac725',
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#5ac725',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                },
                warning: {
                    DEFAULT: '#f9ae3d',
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f9ae3d',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                },
                danger: {
                    DEFAULT: '#f56c6c',
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#f56c6c',
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                },
                info: {
                    DEFAULT: '#909399',
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#909399',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                },
                text: {
                    DEFAULT: '#333333',
                    secondary: '#666666',
                    disabled: '#c0c0c0',
                    placeholder: '#999999',
                },
                bg: {
                    DEFAULT: '#ffffff',
                    light: '#f8f8f8',
                },
                border: {
                    DEFAULT: '#e5e5e5',
                },
            },
            borderRadius: {
                sm: '2px',
                DEFAULT: '4px',
                lg: '8px',
                full: '9999px',
            },
            spacing: {
                sm: '5px',
                DEFAULT: '10px',
                lg: '15px',
                xl: '20px',
            },
            boxShadow: {
                sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                DEFAULT: '0 2px 4px 0 rgb(0 0 0 / 0.1)',
                lg: '0 4px 8px 0 rgb(0 0 0 / 0.2)',
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Helvetica Neue', 'sans-serif'],
                mono: ['Inter', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                shimmer: 'shimmer 2s linear infinite',
                'bounce-sm': 'bounceSmall 1s infinite',
                'modal-enter': 'modalEnter 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                shimmer: {
                    '0%': { transform: 'translateX(-100%)' },
                    '100%': { transform: 'translateX(100%)' },
                },
                bounceSmall: {
                    '0%, 100%': { transform: 'translateY(-5%)' },
                    '50%': { transform: 'translateY(0)' },
                },
                modalEnter: {
                    '0%': { opacity: '0', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
            },
        },
    },
    shortcuts: [
        ['container', 'relative z-10 flex flex-col w-full mx-auto p-4 gap-3 pb-10 text-slate-800'],
        ['flex-center', 'flex justify-center items-center'],
        ['col-center', 'flex flex-col justify-center items-center'],
        ['flex-between', 'flex items-center justify-between'],
        ['flex-items-center', 'flex items-center'],
        ['text-ellipsis', 'whitespace-nowrap overflow-hidden text-ellipsis'],
        ['abs-center', 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'],
        ['btn', 'relative inline-flex items-center justify-center px-4 text-sm text-center whitespace-nowrap border border-transparent rounded outline-none transition-all duration-200'],
        ['btn-primary', 'text-white bg-primary border-primary'],
        ['btn-success', 'text-white bg-success border-success'],
        ['btn-warning', 'text-white bg-warning border-warning'],
        ['btn-danger', 'text-white bg-danger border-danger'],
        ['btn-info', 'text-white bg-info border-info'],
        ['btn-default', 'text-gray-700 bg-white border-gray-300'],
        ['btn-plain', 'bg-transparent'],
        ['btn-round', 'rounded-full'],
        ['btn-block', 'flex w-full'],
        ['btn-disabled', 'opacity-50'],
        ['btn-loading', 'inline-block w-3.5 h-3.5 mr-1.5 border-2 border-current border-l-transparent rounded-full animate-spin'],
        ['tag-primary', 'px-2 py-1 text-xs text-primary bg-primary-50 rounded'],
        ['action-card', 'bg-white rounded-2xl p-4 soft-shadow border border-white/50'],
        ['u-border-b-dashed', 'border-0 border-b-1rpx border-b-dashed border-slate-200'],
        ['u-border-t-dashed', 'border-0 border-t-1rpx border-t-dashed border-slate-200'],
        ['u-border-b', 'border-0 border-b-1rpx border-b-solid border-slate-200'],
        ['u-border-t', 'border-0 border-t-1rpx border-t-solid border-slate-200'],
        ['safe-bottom', 'pb-[env(safe-area-inset-bottom)]'],
        [/^w-h-([^-]+)-([^-]+)$/, ([, w, h]) => `w-${w} h-${h}`],
    ],
    rules: [
        // 语义化排版 utility：一条规则覆盖 text-title-lg / text-title / text-subtitle / text-body / text-desc / text-caption
        // 字号 / 字重 / 行高 / 颜色 四件套全部读 CSS 变量（变量在 static/css/style.scss 里定义，主题切换时只改变量不改 class）
        [
            /^text-(title-lg|title|subtitle|body|desc|caption)$/,
            ([, name]) => ({
                'font-size':   `var(--text-${name}-size)`,
                'font-weight': `var(--text-${name}-weight)`,
                'line-height': `var(--text-${name}-line-height)`,
                color:         `var(--text-${name}-color)`,
                ...(name === 'caption' ? { 'letter-spacing': '1rpx' } : {}),
            }),
        ],
        [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${d}rpx` })],
        [/^lh-(\d+)$/, ([, d]) => ({ 'line-height': `${d}rpx` })],
        [/^ls-\[(.+)\]$/, ([, d]) => ({ 'letter-spacing': d })],
        ['grid', { display: 'grid' }],
        ['bg-grid-pattern', { 'background-image': "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2394a3b8' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E\")" }],
        [/^grid-cols-(\d+)$/, ([, d]) => ({ display: 'grid', 'grid-template-columns': `repeat(${d}, minmax(0, 1fr))` })],
        ['soft-shadow', { 'box-shadow': '0 4px 20px -2px rgba(226, 232, 240, 0.6), 0 2px 6px -2px rgba(226, 232, 240, 0.4)' }],
        [
            /^border-dashed-(\d+)-(\d+)$/,
            ([, lineLength, gapLength]) => {
                const totalLength = Number(lineLength) + Number(gapLength)
                const linePercent = (Number(lineLength) / totalLength) * 100
                return {
                    'background-image':
                        `linear-gradient(90deg, #cbd5e1 0%, #cbd5e1 ${linePercent}%, transparent ${linePercent}%, transparent 100%), ` +
                        `linear-gradient(90deg, #cbd5e1 0%, #cbd5e1 ${linePercent}%, transparent ${linePercent}%, transparent 100%), ` +
                        `linear-gradient(0deg, #cbd5e1 0%, #cbd5e1 ${linePercent}%, transparent ${linePercent}%, transparent 100%), ` +
                        `linear-gradient(0deg, #cbd5e1 0%, #cbd5e1 ${linePercent}%, transparent ${linePercent}%, transparent 100%), ` +
                        `linear-gradient(#f8fafc, #f8fafc)`,
                    'background-size': `${totalLength}px 1px, ${totalLength}px 1px, 1px ${totalLength}px, 1px ${totalLength}px, 100% 100%`,
                    'background-position': '0 0, 0 100%, 0 0, 100% 0, 0 0',
                    'background-repeat': 'repeat-x, repeat-x, repeat-y, repeat-y, no-repeat',
                }
            },
        ],
        [/^border(?:-(\d+(?:\.\d+)?))?$/, ([, d]) => ({ 'border-width': `${d || 1}px` })],
        [
            /^border-([trbl])$/,
            ([, d]) => {
                const map: Record<string, string> = { t: 'top', r: 'right', b: 'bottom', l: 'left' }
                return { [`border-${map[d]}-width`]: '1rpx' }
            },
        ],
        [
            /^border-([trbl])-(\d+(?:\.\d+)?)(rpx|px|rem|em|%)$/,
            ([, d, w, unit]) => {
                const map: Record<string, string> = { t: 'top', r: 'right', b: 'bottom', l: 'left' }
                return { [`border-${map[d]}-width`]: `${w}${unit}` }
            },
        ],
        [
            /^border-([trbl])-(\d+(?:\.\d+)?)$/,
            ([, d, w]) => {
                const map: Record<string, string> = { t: 'top', r: 'right', b: 'bottom', l: 'left' }
                return { [`border-${map[d]}-width`]: `${w}px` }
            },
        ],
        [
            /^border-([trbl])-(solid|dashed|dotted|double|none)$/,
            ([, d, style]) => {
                const map: Record<string, string> = { t: 'top', r: 'right', b: 'bottom', l: 'left' }
                return {
                    [`border-${map[d]}-width`]: '1rpx',
                    [`border-${map[d]}-style`]: style,
                }
            },
        ],
    ],
    safelist: [
        'text-primary', 'text-success', 'text-warning', 'text-error',
        'bg-primary', 'bg-success', 'bg-warning', 'bg-error',

        // UnoCSS 只扫描源码里字面量出现的 class 生成 CSS；
        // 源码里看不到但运行时会用到，必须显式 safelist。

        // 后台分类 / 标签图标
        'i-fa6-solid-film',
        'i-fa6-solid-utensils',
        'i-fa6-solid-music',
        'i-fa6-solid-dragon',
        'i-fa6-solid-shirt',
        'i-fa6-solid-paw',
        'i-fa6-solid-gamepad',
        'i-fa6-solid-dumbbell',
        'i-fa6-solid-house',
        'i-fa6-solid-car-side',
        'i-fa6-solid-plane-departure',
        'i-fa6-solid-cart-shopping',
        'i-fa6-solid-briefcase',
        'i-fa6-solid-heart',
        'i-fa6-solid-people-group',
        'i-fa6-solid-seedling',
        'i-fa6-solid-microchip',
        'i-fa6-solid-mobile-screen',
        'i-fa6-solid-baby',
        'i-fa6-solid-camera',
        'i-fa6-solid-clapperboard',
        'i-fa6-solid-pen-nib',
        'i-fa6-solid-masks-theater',
        'i-fa6-solid-heart-pulse',
        'i-fa6-solid-face-smile-beam',
        'i-fa6-solid-users',
        'i-fa6-solid-person-running',
        'i-fa6-solid-newspaper',
        'i-fa6-solid-code',
        'i-fa6-solid-face-laugh-squint',
        'i-fa6-solid-pen-to-square',
        'i-fa6-solid-star-and-crescent',
        'i-fa6-solid-camera-retro',
        'i-fa6-solid-bag-shopping',
        'i-fa6-solid-hammer',
        'i-fa6-solid-image',
        'i-fa6-solid-scroll',
        'i-fa6-solid-mountain-sun',
        'i-fa6-solid-hand-fist',
        'i-fa6-solid-book-open-reader',
        'i-ri-live-fill',
        'i-fa6-solid-user-graduate',
        'i-fa6-solid-school',
        'i-fa6-solid-graduation-cap',
        'i-fa6-solid-comments',
        'i-fa6-solid-comment-dots',
        'i-fa6-solid-book',
        'i-fa6-solid-microphone-lines',
        'i-fa6-solid-medal',
        'i-fa6-solid-language',
        'i-fa6-solid-id-card',
        'i-fa6-solid-tags',
        'i-fa6-solid-chalkboard-user',
        'i-fa6-solid-building',
        'i-fa6-solid-couch',
        'i-fa6-solid-brain',
        'i-fa6-solid-scissors',
        'i-fa6-solid-palette',
        'i-fa6-solid-location-dot',
        'i-fa6-solid-map-location-dot',
        'i-fa6-solid-robot',
        'i-fa6-solid-user-doctor',
        'i-fa6-solid-spa',
        'i-fa6-solid-landmark',
        'i-fa6-solid-hand-holding-heart',
        'i-fa6-solid-clock-rotate-left',
        'i-fa6-solid-broom',
        'i-fa6-solid-ring',
        'i-fa6-solid-leaf',
        'i-fa6-solid-wine-glass',
        'i-fa6-solid-mug-hot',
        'i-fa6-solid-passport',
        'i-fa6-solid-building-columns',
        'i-fa6-solid-user-tie',
        'i-fa6-solid-users-gear',
        'i-fa6-solid-industry',
        'i-fa6-solid-recycle',

        'i-fa6-solid-headset',
        'i-fa6-brands-weixin',
        'i-fa6-solid-user-plus',
        'i-fa6-solid-book-open',
        'i-fa6-solid-circle-question',
        'i-fa6-solid-gear',

        'i-fa6-solid-droplet-slash',
        'i-fa6-solid-chart-line',
        'i-fa6-solid-trophy',
        'i-fa6-solid-toolbox',

        'i-fa6-solid-gift',
        'i-fa6-solid-ticket',
        'i-fa6-solid-bolt',
        'i-fa6-brands-tiktok',
        'i-fa6-brands-bilibili',
        'i-fa6-solid-video',

        'i-fa6-solid-rocket',
        'i-fa6-solid-gem',
        'i-fa6-solid-shield-halved',

        'i-fa6-solid-hand',
        'i-fa6-solid-magnifying-glass',
        'i-fa6-solid-star',
        'i-fa6-solid-lightbulb',
        'i-fa6-solid-fire',
        'i-fa6-solid-download',
        'i-fa6-solid-coins',
        'i-fa6-solid-crown',
        'i-fa6-solid-credit-card',
        'i-fa6-solid-user-slash',
        'i-fa6-solid-file-shield',
        'i-fa6-solid-lock',

        'i-fa6-solid-infinity',
        'i-fa6-solid-ban',

        'i-fa6-solid-scale-balanced',
        'i-fa6-solid-sack-dollar',
        'i-fa6-solid-clock',
        'i-fa6-solid-ranking-star',
        'i-fa6-solid-shield-heart',
        'i-fa6-solid-chart-pie',
        'i-fa6-solid-layer-group',
        'i-fa6-solid-gauge-high',
        'i-fa6-solid-wand-magic-sparkles',
        'i-ri-apps-2-fill',
        'i-ri-apps-fill',
        'i-ri-app-store-fill',
        'i-fa6-solid-circle-play',
        'i-fa6-solid-chevron-right',
        'i-fa6-solid-box-open',
    ],
    transformers: [
        transformerDirectives({ enforce: 'pre' }),
        transformerAttributify(),
        transformerClass(),
    ],
}
