---
category: 学习笔记
tags:
  - javascript
date: 2021-02-10
title: 使用 JSDoc 给 js 项目添加类型注释
header-title: true
---

# 使用 JSDoc 给 js 项目添加类型注释

公司有些早期的 js 项目仍然需要维护，于是使用 JSDoc 给代码加上了类型注释，结合 vscode 的代码提示，给维护效率带来了一定提高，将一些用法心得记录如下。

## 类型定义

使用类型前需要先定义类型，以下以定义对象的方式举例 JSDoc 的类型定义（类比 ts 的 interface）

```javascript
/**
 * @typedef {Object} BaseInterface
 * @property {number} num 数字
 * @property {string} str 字符串
 * @property {boolean} boo 布尔值
 * @property {Array<string>} arr1 字符串数组
 * @property {number[]} arr2 数字数组
 * @property {{key1: number, key2: string}} obj1 对象
 * @property {{[key: string]: string}} obj2 索引类型对象
 * @property {() => void} fun1 无参无返回值的函数
 * @property {(param1: number, param2: string) => void} fun2 有参无返回值的函数
 * @property {() => number} fun3 无参有返回值的函数
 *
 * @property {string} [optional] 可选参数
 *
 * @property {'name' | 'age' | 'gender'} str_literal 字符串字面量
 *
 * @property {[number, string]} tuple 元组
 *
 */
```

除去以上的基本类型外，还支持一些 ts 的工具泛型，如下

```javascript
/**
 * @type {Record<'key1'|'key2'|'key3', string>} Record 工具泛型
 *
 * @typedef {Pick<BaseInterface, 'num'|'str'>} demoPick
 */
```

更多详细用法请查看参考资料

## 类型标记

### 普通标记

```javascript
/** 这是一个普通变量 */
let baseVar = 1

/** @type {number} */
let baseVar1 = 1

/** @type {BaseInterface['num']} */
let baseVar2 = 1
```

### 函数标记

```javascript
// 自动类型推断
function fun1() {
  return 1
}
const fun2 = () => 2

/** @type {() => void} */
let fun3

/**
 * 标记函数参数类型
 * @param {number} param1
 * @param {string} param2
 */
function fun4(param1, param2) {
  return 0
}

/**
 * 标记函数返回值类型
 *  @returns {number} */
function fun5() {
  if (exp1) return var1
  else return var2
}
```

### 类标记

```javascript
class Class1 {
  /**
   * @param {number} param1
   * @param {number} param2 */
  constructor(param1, param2) {
    /** 普通类成员 */
    this.var2 = 1
  }
  /** @type {string} 静态类成员 */
  static var1

  /** 静态类方法 */
  static fun1() {}

  /** 普通类方法 */
  fun2() {}
}

// Class1.var1
// Class1.fun1()
const c1 = new Class1()
// c1.var2
c1.fun2()
```

## 优缺点

### 优点

1. 添加注释后，类型提示非常舒服
2. 变量、函数的注释能在后期维护的时候迅速了解到用法

### 缺点

1. 没有模块，复杂的类型定义在不引入 ts 的情况下，只能挨个文件复制类型定义
2. 约束不强，不会像 ts 那样报错，尽管在文件首行增加注释`// @ts-check`后会有所缓解，但是仍推荐尽可能使用 ts！

## 参考资料

[JSDoc 官网](https://jsdoc.app/)

[typescriptlang - jsdoc-supported-types](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)

[typescriptlang - utility-types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
