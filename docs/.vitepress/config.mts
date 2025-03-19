import { basename } from 'node:path'
import { defineConfig } from 'vitepress'
import { generateSidebar } from '../../utils'

// 映射目录名称到中文标题
const titleMap: Record<string, string> = {
  specifications: '项目规范',
  performance: '性能优化',
  automation: '自动化',
}

const BASE_PATH = basename(process.env.npm_package_name || '')
const APP_BASE_PATH = BASE_PATH ? `/${BASE_PATH}/` : '/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: APP_BASE_PATH,

  title: '欣欣向荣的博客',
  description: "Xin Xin's Blog",
  head: [['link', { rel: 'icon', href: `${APP_BASE_PATH}favicon.ico` }]],
  lang: 'zh-CN',
  // 主题配置
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端工程化',
        link: '/engine/specifications/gitcommit',
      },
      {
        text: '性能优化',
        link: '/performance/preload',
      },
      {
        text: '笔记',
        link: '/notes/githubpages',
      },
      {
        text: '工具/方法',
        link: '/utils/library',
      },
    ],
    // 右侧大纲配置
    outline: {
      level: 'deep',
      label: '目录',
    },
    sidebar: generateSidebar(titleMap),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/qqlxxlxx/xindocs' },
    ],

    // 自定义上下页名
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})
