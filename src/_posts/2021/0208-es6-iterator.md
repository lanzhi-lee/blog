---
category: 每日一记
tags:
  - javascript
date: 2021-02-08
title: ES6 中 iterator 有什么作用
header-title: true
---

# 【每日一记】ES6 中 iterator 有什么作用

iterator 译为迭代器，是设计模式中迭代器模式的实现，该模式的定义是在不暴露对象内部具体实现的同时，提供一种统一简便地访问集合内部数据的方式。

## 基本用法

ES6 在原有的 `Array` 以及新增的 `Map`、`Set` 集合上部署了 iterator 接口，使得可以使用新增的`for...of...`循环方便的遍历集合中的数据

```javascript
const arr = [1, 2, 3]
for (const val of arr) {
  console.log(val)
}
// 1 2 3

const map = new Map([
  [1, 'val1'],
  [2, 'val2'],
  [3, 'val3'],
])
for (const val of map) {
  console.log(val)
}
// [1, "val1"]
// [2, "val2"]
// [3, "val3"]

const set = new Set([1, 2, 3, 3])
for (const val of set) {
  console.log(val)
}
// 1 2 3
```

## 整点别的

iterator 意在提供一种统一的、能够处理所有不同的数据结构的接口机制，因此只要任意的对象上实现了 Symbol.iterator 就可以使用`for...of...`来遍历，比如

```javascript
const obj = {
  [Symbol.iterator]() {
    let index = 0
    return {
      next: function() {
        if (index < 5) {
          return { value: index++, done: false }
        } else return { done: true }
      },
    }
  },
}

for (let val of obj) {
  console.log(val)
}
// 0 1 2 3 4
// obj上没有任何我们添加的属性，由于实现了Symbol.iterator，在循环中输出了值
```

甚至可以

```javascript
const obj = {
  *[Symbol.iterator]() {
    yield 0
    yield 1
    yield 2
    yield 3
  },
}

for (let item of obj) {
  console.log(item)
}
// 0 1 2 3
// 这里用到了Generator语法，详情请查阅参考资料
```

## 参考资料

[Iterator 和 for...of 循环](https://es6.ruanyifeng.com/#docs/iterator)

[Generator 函数的语法](https://es6.ruanyifeng.com/#docs/generator)
