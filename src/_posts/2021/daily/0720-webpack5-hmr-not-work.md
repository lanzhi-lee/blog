---
category: 每日一记
tags:
  - webpack
date: 2021-07-20
title: 升级Webpack5后HMR不生效了？
header-title: true
---

# 【每日一记】升级 Webpack5 后 HMR 不生效了？

解决办法：

检查 network 面板，确认是否有正常的 webpack-dev-server 的 websocket 通信

随后尝试在 webpack 配置文件中增加 `target: 'web'`，即：

```javascript
module.exports = {
  target: 'web',
  // ......
}
```
