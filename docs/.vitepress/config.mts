import { basename } from 'node:path'
import { defineConfig } from 'vitepress'

const BASE_PATH = basename(process.env.npm_package_name || '')
const APP_BASE_PATH = BASE_PATH ? `/${BASE_PATH}/` : '/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: APP_BASE_PATH,

  title: "欣欣向荣",
  description: "欣欣向荣的博客",
  head: [['link', { rel: 'icon', href: `${APP_BASE_PATH}favicon.ico` }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
