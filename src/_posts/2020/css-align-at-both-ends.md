---
category: CSS
date: 2020-01-18
title: CSS 分散/两端对齐
header-title: true
---

# CSS 分散/两端对齐

#### 实现效果：

![css-align-at-both-ends-1.png](https://oss.leezx.cn/picsbed/css-align-at-both-ends-1.png)

```html
<div class="box1">
  <div class="test1">姓 名</div>
  <div class="test1">姓 名 姓 名</div>
  <div class="test1">姓 名 名</div>
  <div class="test1">所 在 地</div>
  <div class="test1">工 作 单 位</div>
</div>`
```

```css
.box1{
    width:30%;
}

.test1 {
  text-align:justify;
  text-justify:distribute-all-lines;  /*ie6-8*/
  text-align-last:justify;            /* ie9*/
  -moz-text-align-last:justify;       /*ff*/
  -webkit-text-align-last:justify;    /*chrome 20+*/
}
```

#### 要点
1. 元素需要有宽度（等宽）
2. 元素中的内容需要被空格分隔