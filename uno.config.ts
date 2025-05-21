// uno.config.ts
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  // 预设集合
  presets: [
    presetUno(), // 基础原子化
    presetAttributify({
      // 属性化支持
      prefix: 'un-',
      prefixedOnly: true // 仅带前缀的属性生效
    }),
    presetIcons({
      // 图标库
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    }),
    presetTypography() // 排版预设
  ],

  // 转换器
  transformers: [
    transformerDirectives(), // @apply指令
    transformerVariantGroup() // 分组写法
  ],

  // 自定义规则
  rules: [
    // 阴影扩展
    [/^shadow-(\d+)$/, ([, d]) => ({ 'box-shadow': `var(--un-shadow-${d})` })],

    // 渐变文字
    [
      'text-gradient',
      {
        'background-clip': 'text',
        '-webkit-background-clip': 'text',
        color: 'transparent'
      }
    ],
    // 3D变换扩展
    ['preserve-3d', { 'transform-style': 'preserve-3d' }],
    [/^rotate-([-\d]+)deg$/, ([, d]) => ({ transform: `rotateX(${d}deg)` })],
    [/^translate-z-([-\d]+)px$/, ([, d]) => ({ transform: `translateZ(${d}px)` })],
    // 透视距离
    [/^perspective-(\d+)px$/, ([, d]) => ({ perspective: `${d}px` })]
  ],

  // 快捷方式
  shortcuts: [
    // 常用组合
    [
      'btn',
      'px-4 py-2 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'
    ],

    // 布局组合
    ['flex-center', 'flex justify-center items-center'],

    // 文本截断
    ['text-ellipsis', 'truncate'],

    ['transform-origin-center', 'transform-origin-50%'],
    ['select-none', 'select-none'],
    ['cursor-grab', 'cursor-grab']
  ],

  // 主题扩展
  theme: {
    colors: {
      primary: 'var(--primary-color)', // 对接CSS变量
      secondary: 'var(--secondary-color)'
    },
    breakpoints: {
      xs: '320px',
      lg: '1024px'
    }
  },

  // 安全列表 (强制生成)
  safelist: [
    'text-red-500', // 强制包含
    'hover:text-blue-400',
    'i-mdi-home' // 确保使用的图标被生成
  ]
})
