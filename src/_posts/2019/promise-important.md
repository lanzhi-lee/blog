---
category: 学习笔记
tags:
  - es-next
date: 2020-01-01
title: Promise的几个关键问题
header-title: true
---

# Promise的几个关键问题

## 1. 如何改变Promise的状态？

如果当前状态是pending

- resolve(value)：变为resolved
- reject(reason)：变为rejected
- 抛出异常：变为rejected

## 2. 一个Promise指定多个成功/失败回调函数，都会调用吗？

当 promise 改变为对应状态时都会顺序先后调用

## 3. 改变Promise状态和指定回调函数谁先谁后？

1. **都有可能**, 正常情况(异步)下是先指定回调再改变状态, 但也可以先改状态再指定回调
2. 如何先改状态再指定回调? 

   1. 在执行器中直接调用 resolve() / reject() 
   2. 延迟更长时间才调用 then() 
3. 什么时候才能得到数据? 
   1. 如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据
   2. 如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据

## 4. promise.then()返回的新promise的结果状态如何确定？

1. 简单表达:由then()指定的回调函数执行的结果决定

2. 详细表达: 
   1. 如果抛出异常, 新 promise 变为 rejected, reason 为抛出的异常
   2. 如果返回的是非 promise 的任意值, 新 promise 变为 resolved, value 为返回的值
   3. 如果返回的是另一个新 promise, 此 promise 的结果就会成为新 promise 的结果

## 5. Promise如何串联多个操作任务？

1. promise 的 then()返回一个新的 promise, 可以开成 then()的链式调用
2. 通过then的链式调用串连多个同步/异步任务

## 6. Promiss异常穿透？

1. 当使用promise的then链式调用时,可以在最后指定失败的回调
2. 前面任何操作出了异常, 都会传到最后失败的回调中处理

## 7. 如何中断promise链？

1. 当使用promise的then链式调用时,在中间中断,不再调用后面的回调函数
2. 办法:在回调函数中返回一个pendding状态的promise对象
