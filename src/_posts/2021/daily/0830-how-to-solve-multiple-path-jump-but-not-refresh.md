---
category: 每日一记
tags:
  - react
  - react-router
date: 2021-08-30
title: 如何解决React路由跳转但页面不刷新的问题？
header-title: true
---

# 如何解决 React 路由跳转但页面不刷新的问题？

这种场景的具体描述是：React 多路由对应相同组件时，多路由间相互跳转，但组件并没有重新加载，例如

```tsx
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { DetailPage } from './views/detail'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* ...other routes */}
        <Route path='/detail/:id' exact component={DetailPage} />
      </Switch>
    </BrowserRouter>
  )
}
```

此时，从 `/detail/1` 跳转到 `/detail/2`，页面就不会刷新

解决办法是，给`DetailPage`组件增加唯一`key`，如下：

```tsx
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { DetailPage } from './views/detail'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* ...other routes */}
        <Route path='/detail/:id' exact render={(props) => <DetailPage {...props} key={props.match.params.id} />} />
      </Switch>
    </BrowserRouter>
  )
}
```
