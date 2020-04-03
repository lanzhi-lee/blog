const Conf = require('./conf')

module.exports = {
  // 网站 Title
  title: '兰之的博客',
  // 网站描述
  description: '兰之的博客',
  // 开发服务指定的端口
  // 网站语言
  locales: {
    '/': { lang: 'zh-CN', },
  },
  port: 3001,

  // base: '/blog/',

  markdown: {
    lineNumbers: true,
  },

  head: [
    ['style', {}, `*{filter: grayscale(100%);}`],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: "image/x-icon", href: '/favicon.ico' }],
    ['meta', { name: 'google-site-verification', content: "QqTmeO1tqP2z-OKc8Wk3n1Fzj9gFxNZ4IMgMtuep00w" }],
    ['script', {}, Conf.ba], // 百度统计的代码
  ],

  plugins: [
    ['@vuepress/google-analytics', { 'ga': Conf.ga }],
  ],

  // 使用的主题
  theme: 'meteorlxy',

  // 主题配置
  themeConfig: {
    // 主题语言，参考下方 [主题语言] 章节
    lang: 'zh-CN',

    // 顶部导航栏内容
    nav: [
      { text: '首页', link: '/', exact: true },
      { text: '文章', link: '/posts/', exact: false },
      { text: '关于', link: '/about.html', exact: false },
    ],

    // 个人信息（没有或不想设置的，删掉对应字段即可）
    personalInfo: {
      // 昵称
      nickname: '李兰之',
      // 个人简介 (支持 HTML)
      description: '永远相信美好的事情即将发生！',
      // 电子邮箱
      email: 'baibai_lee@163.com',
      // 所在地
      location: 'Beijing City, China',
      // 组织
      organization: 'Xiaomi',
      // organization: '<a href="https://www.mi.com/" target="_blank">Xiaomi</a>',
      // 头像
      // 设置为外部链接
      avatar: 'https://baibai-mine.oss-cn-shanghai.aliyuncs.com/tb6501982-tinfied.jpg',
      // 或者放置在 .vuepress/public 文件夹
      // 例如 .vuepress/public/img/avatar.jpg
      // avatar: '/img/avatar.jpg',

      // 社交平台帐号信息
      sns: {
        // Github 帐号和链接
        github: { account: '李三思', link: 'https://github.com/baibai-lee' },
        // Facebook 帐号和链接
        facebook: { account: 'Lanzhi Lee', link: 'https://www.facebook.com/lanzhi.leezx' },
        // 知乎 帐号和链接
        zhihu: { account: '李三思', link: 'https://www.zhihu.com/people/li-bai-75-59' },
        // 掘金 帐号和链接
        juejin: { account: '脑洞清奇李兰之', link: 'https://juejin.im/user/5d32b0315188252d1d5f9d4d' },
      },
    },

    // 上方 header 的相关设置 (可选)
    header: {
      // header 的背景，可以使用图片，或者随机变化的图案（geopattern）
      background: {
        // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效
        // url: '/assets/img/bg.jpg',

        // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为空白背景
        useGeo: true,
      },

      // 是否在 header 显示标题
      showTitle: true,
    },

    // 底部 footer 的相关设置 (可选)
    footer: {
      // 是否显示 Powered by VuePress
      poweredBy: false,
      // 是否显示使用的主题
      poweredByTheme: false,
      // 添加自定义 footer (支持 HTML)
      // custom: `Powered by VuePress | Fork from <a href="https://github.com/meteorlxy/vuepress-theme-meteorlxy" target="_blank">meteorlxy</a>`
      custom: `Powered by <a href="https://github.com/vuejs/vuepress" target="_blank">VuePress</a> | 
      Fork from <a href="https://github.com/meteorlxy/vuepress-theme-meteorlxy" target="_blank">meteorlxy</a>`,
    },

    // 个人信息卡片相关设置 (可选)
    infoCard: {
      // 卡片 header 的背景，可以使用图片，或者随机变化的图案（geopattern）
      headerBackground: {
        // 使用图片的 URL，如果设置了图片 URL，则不会生成随机变化的图案，下面的 useGeo 将失效
        // url: '/assets/img/bg.jpg',

        // 使用随机变化的图案，如果设置为 false，且没有设置图片 URL，将显示为空白背景
        useGeo: true,
      },
    },

    // 是否显示文章的最近更新时间
    lastUpdated: true,

    // 评论配置，参考下方 [页面评论] 章节
    comments: {
      owner: 'baibai-lee',
      repo: 'blog',
      clientId: Conf.comments.clientId,
      clientSecret: Conf.comments.clientSecret,
    },

    // 分页配置 (可选)
    pagination: {
      perPage: 10,
    },

    // 默认页面（可选，默认全为 true）
    defaultPages: {
      // 是否允许主题自动添加 Home 页面 (url: /)
      home: true,
      // 是否允许主题自动添加 Posts 页面 (url: /posts/)
      posts: true,
    },
  }
}