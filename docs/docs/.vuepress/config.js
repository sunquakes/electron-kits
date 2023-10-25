import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
  lang: 'en-US',
  theme: defaultTheme({
    logo: '/images/logo.png',
    repo: 'sunquakes/electron-kits',
    editLinks: true,
    locales: {
      '/': {
        selectLanguageName: 'English',
        selectLanguageText: 'Languages',
        selectLanguageAriaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        navbar: [{ text: 'Guide', link: '/guide/getting-started' }],
        sidebar: {
          '/guide/': [
            {
              children: ['/guide/getting-started.md']
            }
          ]
        }
      },
      '/zh/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        navbar: [{ text: '指南', link: '/zh/guide/getting-started' }],
        sidebar: {
          '/zh/guide/': [
            {
              children: ['/zh/guide/getting-started.md']
            }
          ]
        }
      }
    }
  }),
  locales: {
    '/': {
      lang: 'English',
      title: 'Electron Kits',
      description: 'A out of the box kits for desktop application development.'
    },
    '/zh/': {
      lang: '简体中文',
      title: 'Electron Kits',
      description: '一个CesiumJS的vue3.x组件库。'
    }
  }
})
