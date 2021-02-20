---
category: 学习笔记
tags:
  - jest
date: 2021-02-20
title: Jest 前端自动化测试基础 (二)异步代码测试
header-title: true
---

# Jest 前端自动化测试基础 (二)异步代码测试

上一篇文章中，介绍了 Jest 的一般套路和基本语法，这篇文章将会接着介绍异步代码的测试

## 回调函数

假如现在有一个接收一个`callback`函数为参数的`fetchData`函数，会在一段时间后调用`callback`，并在回调函数的参数中携带数据`hello jest`

有了上一节的基础，一个测试用例很快就能写出来

```js
function fetchData(callback) {
  setTimeout(() => {
    callback('hello jest')
  }, 1000)
}

test('是否返回 hello jest', () => {
  function callback(data) {
    expect(data).toBe('hello jest')
  }

  fetchData(callback)
})
// 执行了这段测试，控制态输出测试用例通过
```

**但这样是错误的！** 默认情况下，Jest 测试一旦执行到末尾就会完成，因此上面的代码中执行到`fetchData(callback)`就直接结束了，回调函数中的断言语句根本就没有执行

这个问题的解决办法是，将 test 函数的第二个参数由无参回调更改为一个接收一个 done 参数的回调，Jest 会等 done 回调函数执行结束后，结束测试

```js
test('是否返回 hello jest', (done) => {
  function callback(data) {
    expect(data).toBe('hello jest')
    done()
  }
  fetchData(callback)
})
```

若 done 函数从未被调用，测试用例执行将会失败，同时输出超时错误

```
Timeout - Async callback was not invoked within the 5000 ms timeout specified by jest.setTimeout.
```

## Promise

> 以下涉及 Promise 的部分中，`Promise被处理`是指 Promise 进入了 fulfilled 状态，`Promise被拒绝`是指 Promise 进入了 rejected 状态

如果异步代码使用了 Promise，可以直接在 test 中返回一个 Promise 对象，Jest 会等待该 Promise 被处理，如果 Promise 被拒绝，测试将自动失败

```js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('hello jest'), 1000)
  })
}

test('是否返回 hello jest', () => {
  // 确保返回了 Promise 对象，否则测试在 fetchData 执行完成之前就已经结束，随后then中的函数不会执行
  return fetchData().then((data) => {
    expect(data).toBe('hello jest')
  })
})
```

如果要测试被拒绝的 Promise，需要使用`.catch`方法，同时添加`expect.assertions`用来验证是否调用了指定次数的断言，否则 Promise 被处理时测试会直接通过

```js
function func(condition) {
  return condition ? Promise.resolve(0) : Promise.reject(1)
}

// 正常 catch 时没有问题
test('Promise 是否进入 rejected', () => {
  return func(false).catch((e) => expect(e).toBe(1))
})

test('Promise 是否进入 rejected', () => {
  // 确保之后的代码进行了1次断言
  expect.assertions(1) // 没有这句的话 测试可以通过
  return func(true).catch((e) => expect(e).toBe(1))
})
```

## .resolves / .rejects 匹配器

使用 Promise 时，也可以在 expect 语句中使用`.resolves`匹配器，Jest 将等待此 Promise 被处理，如果 Promise 被拒绝，测试将自动失败

```js
test('是否返回 hello jest', () => {
  // 确保返回了这句断言
  return expect(fetchData()).resolves.toBe('hello jest')
})
```

与之对应，可以使用`.rejects`测试被拒绝的 Promise

```js
test('Promise 是否进入 rejected', () => {
  return expect(func(false)).rejects.toBe(1)
})
```

## Async/Await

也可以在测试中使用`async/await`，例如

```js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('hello jest'), 1000)
  })
}

test('是否返回 hello jest', async () => {
  const data = await fetchData()
  expect(data).toBe('hello jest')
})

function func(condition) {
  return condition ? Promise.resolve(0) : Promise.reject(1)
}

test('Promise 是否进入 rejected', async () => {
  expect.assertions(1)
  try {
    await func(false)
  } catch (e) {
    expect(e).toBe(1)
  }
})
```

也可以将`async/await`和`.resolves/.rejects匹配器`组合起来使用

```js
test('是否返回 hello jest', async () => {
  await expect(fetchData()).resolves.toBe('hello jest')
})

test('Promise 是否进入 rejected', async () => {
  await expect(func(false)).rejects.toBe(1)
})
```

## 参考资料

[Jest - Testing Asynchronous Code](https://jestjs.io/docs/en/asynchronous)
