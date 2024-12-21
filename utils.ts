import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import type { DefaultTheme } from 'vitepress'

export const generateSidebar = (
  titleMap: Record<string, string> = {}
): DefaultTheme.SidebarMulti => {
  const sidebar: DefaultTheme.SidebarMulti = {}

  // 假设你有一个 docs 目录
  const docsDir = path.resolve(__dirname, 'docs')

  // 递归读取 docs 目录下的所有 Markdown 文件
  const traverseDir = (
    dirPath: string,
    sidebarItem: DefaultTheme.SidebarMulti | DefaultTheme.SidebarItem[] = [],
    index: number = 0
  ): void => {
    const files = fs.readdirSync(dirPath)
    const exclueds = ['index.md', '.vitepress', 'public']

    files.forEach((file: string) => {
      if (exclueds.includes(file)) {
        return
      }
      const filePath = path.join(dirPath, file)
      const stats = fs.statSync(filePath)

      if (stats.isDirectory()) {
        // 如果是目录，递归调用
        const childSidebar: DefaultTheme.SidebarItem[] = []
        if (index === 0) {
          sidebarItem[`/${file}/`] = childSidebar
        } else {
          ;(sidebarItem as DefaultTheme.SidebarItem[]).push({
            text: titleMap[file] || file, // 目录名称作为标题
            items: childSidebar,
          })
        }
        traverseDir(filePath, childSidebar, index + 1)
      } else if (file.endsWith('.md')) {
        // 如果是 Markdown 文件
        const content = fs.readFileSync(filePath, 'utf-8')
        const { data } = matter(content) // 解析文件头部元数据
        const title: string = data.title || path.basename(file, '.md') // 使用文件头的 title 或文件名
        Array.isArray(sidebarItem) &&
          sidebarItem.push({
            text: title,
            link: filePath
              .replace(docsDir, '')
              .replace('.md', '')
              .replace(/\\/g, '/'), // 格式化链接路径
          })
      }
    })
  }

  // 从 docs 目录开始遍历
  traverseDir(docsDir, sidebar, 0)

  return sidebar
}
