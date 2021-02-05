---
category: 每日一记
tags:
  - typescript
date: 2021-02-03
title: event.target不是HTMLElement如何处理
header-title: true
---

# 【每日一记】event.target 不是 HTMLElement 如何处理

## 具体表现

在使用 ts 开发前端项目时，如果标注事件响应回调函数的 event 对象类型为 Event，会在尝试使用 event.target.className（等其他的 dom 实例属性）得到提示：

```javascript
// 类型“EventTarget”上不存在属性“className”。ts(2339)
const name = event.target.className
```

## 解决办法

1. 显式地指定 event.target 为指定的 dom 类型，例如：

```typescript
const name = (event.target as HTMLElement).className
```

2. 更改 event 的类型，如下：

```typescript
// 可以将此类型放在.d.ts中。确保全局可用
type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T
  currentTarget: T
}

function handleClick(event: HTMLElementEvent<HTMLElement>) {
  const name = event.target.className
}
```

## 参考资料

https://stackoverflow.com/a/42066698/10828735
