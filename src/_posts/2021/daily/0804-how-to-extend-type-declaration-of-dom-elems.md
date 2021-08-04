---
category: 每日一记
tags:
  - react
  - typescript
date: 2021-08-04
title: TS如何扩展DOM元素的类型声明
header-title: true
---

# TS 如何扩展 DOM 元素的类型声明

> 参考：https://www.jianshu.com/p/1d8078d04568

React 中写的 HTML 元素都有对应的类型声明，假如给元素添加了不在类型声明里的属性，就会抛错，解决办法如下：

```typescript
declare module 'react' {
  interface HTMLAttributes<T> {
    'new-key'?: number
  }
}
```
