---
category: 学习笔记
tags:
  - javascript
date: 2021-02-18
title: jsconfig.json 中文文档
header-title: true
---

# jsconfig.json 中文文档

[英文原版文档地址](https://code.visualstudio.com/docs/languages/jsconfig) https://code.visualstudio.com/docs/languages/jsconfig

## jsconfig.json 是什么？

目录中存在`jsconfig.json`文件时，表明该目录是 JavaScript 项目的根目录。`jsconfig.json`文件指定了根文件以及 [JavaScript 语言服务](https://github.com/microsoft/TypeScript/wiki/JavaScript-Language-Service-in-Visual-Studio) 提供的功能选项

> **Tip:** 如果不使用 JavaScript，那么无需关心`jsconfig.json`

> **Tip:** `jsconfig.json`源于 TypeScript 的配置文件[tsconfig.json](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)。相当于`tsconfig.json`的`allowJs`属性设置为`true`

## 为什么需要 jsconfig.json 文件？

Visual Studio Code 的`JavaScript支持`可以在两种不同的模式下运行：

- **文件范围 - 没有 jsconfig.json**：在此模式下，在 Visual Studio Code 中打开的 JavaScript 文件被视为独立的单元。只要文件`a.js`没有明确引用文件`b.ts`(使用`import`或**CommonJS** [modules](http://www.commonjs.org/specs/modules/1.0))，那么两个文件之间就没有公共的项目上下文

- **显式项目 - 包含 jsconfig.json**：JavaScript 项目是通过`jsconfig.json`文件定义的，目录中存在此文件表示该目录是 JavaScript 项目的根目录。文件本身可以选择列出属于项目的文件，要从项目中排除的文件以及编译器选项等（请参见下文）

当工作空间中有一个定义项目上下文的`jsconfig.json`文件时，JavaScript 体验会得到改善。因此，当在新的工作区中打开 JavaScript 文件时，我们提供了创建`jsconfig.json`文件的提示

### jsconfig.json 的位置

通过创建一个`jsconfig.json`文件，我们将代码的这一部分（网站的客户端）定义为 JavaScript 项目。如下所示，将文件放置在 JavaScript 代码的根目录下

![jsconfig 设置](https://code.visualstudio.com/assets/docs/languages/javascript/jsconfig_setup.png)

在更复杂的项目中，工作空间中可能定义了多个`jsconfig.json`文件。这将需要执行此操作，以便 IntelliSense 不会把一个项目中的代码错误地提示给另一个项目中的代码。下面是一个带有`client`和`server`文件夹的项目，其中显示了两个单独的 JavaScript 项目

![多个 jsconfig](https://code.visualstudio.com/assets/docs/languages/javascript/complex_jsconfig_setup.png)

> 注： IntelliSense 译为智能感知，在 vscode 环境下意为智能代码提示，下文不再翻译

## 实例

默认情况下，JavaScript 语言服务将分析并为你的 JavaScript 项目中的所有文件提供 IntelliSense，你需要指定要排除或包括的文件，以提供适当的 IntelliSense

### 使用 exclude 属性

`exclude`属性（[glob 模式](https://www.cnblogs.com/savorboard/p/glob.html)）告诉语言服务哪些文件不属于源代码，这样可以使性能保持较高水平。如果 IntelliSense 速度较慢，则可尝试一些文件(夹)添加到`exclude`列表中（VS Code 如果检测到速度减慢将提示你执行此操作）

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6"
  },
  "exclude": ["node_modules"]
}
```

> **Tip:** 建议排除由构建过程生成的文件（例如`dist`目录），否则这些文件将导致建议显示两次，并且会降低 IntelliSense 的速度

### 使用 include 属性

另外，可以使用 include 属性（全局模式）在项目中显式设置文件。如果不存在`include`属性，则默认为包含目录和子目录中的所有文件。当指定`include`属性时，仅包括指定的那些文件。下面是一个带有显式`include`属性的示例

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6"
  },
  "include": ["src/**/*"]
}
```

> **Tip:** exclude 和 include 中的文件路径是相对于 jsconfig.json 位置的

## jsconfig Options

以下是用于配置 JavaScript 语言支持的`jsconfig`的`compilerOptions`

> **Tip:** 不要被 compilerOptions 所迷惑。该属性存在是因为 jsconfig.json 源自 tsconfig.json，后者用于编译 TypeScript

| 选项                           | 描述                                                                                                             |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `noLib`                        | 不包括默认库文件 lib.d.ts                                                                                        |
| `target`                       | 指定要使用的默认库 lib.d.ts，可选 es3 / es5 / es6 / es2015 / es2016 / es2017 / es2018 / es2019 / es2020 / esnext |
| `module`                       | 指定模块系统（生成模块代码时），可选 amd / commonJS / es2015 / es6 / esnext / none / system / umd                |
| `moduleResolution`             | 指定如何解析模块以进行导入，可选 node / classic                                                                  |
| `checkJs`                      | 对 JavaScript 文件启用类型检查                                                                                   |
| `experimentalDecorators`       | 为`ES装饰器`提案提供实验支持                                                                                     |
| `allowSyntheticDefaultImports` | 允许从模块进行默认导入而没有默认导出。这不影响代码生成，仅影响类型检查                                           |
| `baseUrl`                      | 基本目录，用于解析非相对模块名称                                                                                 |
| `paths`                        | 指定要相对于 baseUrl 选项计算的路径映射                                                                          |

可在 [TypeScript 编译选项文档](https://www.typescriptlang.org/docs/handbook/compiler-options.html) 中阅读有关可用的`compilerOptions`的更多信息

## 使用 Webpack 别名

为了使 IntelliSense 使用 Webpack 别名，需要使用全局模式指定`paths`

例如，对于别名 ClientApp

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "ClientApp/*": ["./ClientApp/*"]
    }
  }
}
```

然后使用别名

```js
import Something from 'ClientApp/foo'
```

## 最佳实践

尽可能排除包含 JavaScript 代码但又不属于项目源代码的文件(夹)

> **Tip:** 如果工作空间中没有`jsconfig.json`，则 VS Code 默认情况下将排除`node_modules`文件夹

下表是 常见项目组件 到其 安装文件夹的表，建议将其排除在外：

| 组件                            | 要排除的文件夹                 |
| ------------------------------- | ------------------------------ |
| `node`                          | 排除`node_modules` 文件夹      |
| `webpack`, `webpack-dev-server` | 排除生成内容文件夹, 例如`dist` |
| `bower`                         | 排除`bower_components`文件夹   |
| `ember`                         | 排除`tmp` and`temp`文件夹      |
| `jspm`                          | 排除`jspm_packages`文件夹      |

当 JavaScript 项目变得太大而性能降低时，通常是由于库文件夹（如`node_modules`）所致。如果 VS Code 检测到项目过大，将提示你编辑`exclude`列表
