---
category: 每日一记
tags:
  - react
date: 2021-08-30
title: React 如何给列表渲染的各个元素添加 Ref
header-title: true
---

# React 如何给列表渲染的各个元素添加 Ref

下面是一种写法

```tsx
import { useRef } from 'react'

const App = () => {
  const preset = Array(10)
    .fill('')
    .map((_, index) => index)
  const Refs = preset.map(() => useRef(null))

  return (
    <div className='list'>
      {preset.map((elem, index) => (
        <div ref={Refs[index]} className='item' key={elem}>
          {elem}
        </div>
      ))}
    </div>
  )
}
```

这里集中介绍了其他的可行的办法

https://stackoverflow.com/questions/54633690/how-can-i-use-multiple-refs-for-an-array-of-elements-with-hooks

需要注意的是，处理列表元素时，首选尝试把相关的监听委托给父元素等办法

因为同时保留大量 Dom 元素的引用，可能会导致性能问题，非必要时个人不太建议给列表元素都增加 Ref
