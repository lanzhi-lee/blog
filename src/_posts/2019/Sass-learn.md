---
category: CSS
tags:
  - Sass
date: 2020-01-01
title: Sass学习记录
header-title: true
---

# Sass学习记录

## 学习资源

sass参考手册 http://sass.bootcss.com/docs/sass-reference/

sass基础视频教程 https://www.bilibili.com/video/av24719712

## 注释

sass中的注释分为单行注释、多行注释和强制注释

单行注释**一直不会**出现在编译后的css中，写法为 `// 注释内容`

多行注释不会出现在**压缩模式**编译后的css中，写法为 `/* 注释内容 */`

强制注释会**一直**出现在编译后的css中，写法为 `/*! 注释内容 */`

## 变量

使用`$`开头，与其他语言类似，变量值可以是数字、字符串，也可以引用其他变量

```scss
$primary-color: #1269b5;
$primary-border: 1px solid $primary-color;

// 在变量的命名中 - 和 _ 可以交替使用，但为了统一，尽量不要这么用
// 例如： $primary-color 在引用时，可以使用 $primary-color 也可以使用 $primary_color
```

## 嵌套

实例：

```scss
.nav {
    height: 100px;

    ul {
        margin: 0;

        li {
            float: left;
            list-style: none;
            padding: 5px;
        }
    }
}

// 等价于：

.nav {
    height: 100px;
}

.nav ul {
    margin: 0;
}

.nav ul li {
    float: left;
    list-style: none;
    padding: 5px;
}
```

#### 嵌套中调用父选择器

在子选择器中使用 `&`，常在使用伪类时使用

```scss
a {
    display: inline-block;
    color: black;

    &:hover {
        color: red;
    }
}
```

#### 属性嵌套

常用在属性名出现大量重复时

```scss
body {
    font: {
        size: 15px;
        weight: normal;
    }
}

.nav {
    border: 1px solid black {
        left: 0;
        right: 0;
    }
}

// 等价于

body {
    font-size: 15px;
    font-weight: normal;
}

.nav {
    border: 1px solid black;
    border-left: 0;
    border-right: 0;
}
```

## 混合 — Mixin

可理解为一块有名字的、已经定义好的一块样式，可以重复地在其他地方使用，可以在mixin中使用`sass`的其他特性，例如使用嵌套、重复使用mixin等

```scss
// 基本使用

// 定义
@mixin 名字 (参数1，参数2 ...){
  // 样式
}

// 调用
@include 名字
```

```scss
@mixin alert {
    color: #8a6d3b;
    background-color: #fcf8e3;

    a {
        color: #664c2b;
    }
}

.alert-warning {
    @include alert;
}

// 编译后等价于

.alert-warning {
    color: #8a6d3b;
    background-color: #fcf8e3;
}

.alert-warning a {
    color: #664c2b;
}
```

#### Mixin的参数

```scss
@mixin alert ($text-color, $background) {
    color: $text-color;
    background-color: $background;

    a {
        color: darken($text-color, 10%);
        // 一个处理颜色的函数，使颜色加深10%
    }
}

.alert-warning {
    @include alert(#8a6d3b, #fcf8e3);
    // 使用时应保持定义时的参数顺序
}

// 编译后等价于

.alert-warning {
    color: #8a6d3b;
    background-color: #fcf8e3;
}

.alert-warning a {
    color: #66512c;
}
```

也可以使用命名的方式指定参数，这时就可以不用按照定义时的参数顺序

```scss
.alert-info {
    @include alert($background:#d9edf7, $text-color:#31708f)
}

// 编译后等价于

.alert-info {
    color: #31708f;
    background-color: #d9edf7;
}

.alert-info a {
    color: #245269;
}
```

## 继承 — extend

也被翻译为`扩展`，功能为使一个选择器可以使用另一个选择器中的全部样式

```scss
// 基本使用
@extend 选择器
```

```scss
.alert {
    padding: 15px;
}

.alert a {
    font-weight: bold;
}

.alert-info {
    @extend .alert;
    background-color: #d9edf7;
}

// 编译后等价于

.alert, .alert-info {
    padding: 15px;
}

.alert a, .alert-info a {
    font-weight: bold;
}

.alert-info {
    background-color: #d9edf7;
}
```

## Partials与import

css自带了`import`导入的功能，但使用import导入的模块 ，但浏览器在每次使用时都会发出新的http请求，会造成性能问题，sass扩展了这个功能，使得在编译时可以将多个文件中的所有的样式输出到一个文件中，这样的一个文件被称为`Partial`，**使用`_`开头** 

```scss
// _base.scss
body{
    margin: 0;
    padding: 0;
}

// style.scss
@import "base";

// other style

// 编译后等价于

// style.css
body{
    margin: 0;
    padding: 0;
}

// other style
```

## 数据类型

可以使用`type-of()`检查类型，返回可能为`number`、`string`、`list`、`color`等

#### 数字

可以包含单位，例如`px`、`em`、`%`，可以使用`+` `-` `*` `/` `取模`等数学运算

```scss
// 基本运算
2 + 8 // 10
8 - 2 // 6
2 * 8 // 16
8 / 2 // 8/2 
// sass中支持css的全部属性，例如 font:16px/1.8 serif这样的写法，因此使用除法时需要将语句放在()中
(8 / 2) // 4
// 除法会保留结果的小数部分

// 可以使用单位
5px + 5px // 10px 
5px - 2 // 3px
5px * 2 // 10px
5px * 2px // 10px*px
// px*px在css中并不是可用的单位，使用时需要注意
10px / 2px // 5 单位会在除法时抵消
10px / 2 // 5px

// 混合运算
3 + 2 * 5px // 13px
(3 + 2) * 5px // 25px
```

##### 数字函数

```scss
abs() // 取绝对值
round() // 四舍五入取整
ceil() // 向上取整
flow() // 向下取整
percentage() // 取百分数
		percentage(65px / 100px) // 输出 65%
min() // 取最小值，可以接受多个参数
max() // 取最大值，可以接受多个参数
```

#### 字符串

```scss
"xiao" + mi // "xiaomi"
xiao + "mi" // xiaomi
"xiaomi" + 3000 // "xiaomi3000"
xiao - mi // "xiao-mi"
xiao / mi // "xiao/mi"
xiao * mi // error 无意义，会报错
```

##### 字符串函数

```scss
to-upper-case() // 全部大写
to-lower-case() // 全部小写
str-length() // 检查字符串的长度
str-index(str, char) // 检查一个字符(串)在指定的字符串中的索引位置，从1开始
str-insert(str, char, index) // 将新的字符(串)插入到指定的字符串的指定位置
```

#### 颜色

```scss
#ff0000 // 16进制数字
rgb(255, 0, 0) // rgb模式
red black // 常用的颜色字符串 
hsl(0, 100%, 50%) // 色相、饱和度、明度
```

##### 颜色函数

```scss
rgb() // 返回rgb颜色
rgba() // 最后一个参数为透明度 这两个函数与 css 类似，但是可以接受的参数类型更多一些

hsl()
hsla()

adjust()
hue()

lighten()
darken()

saturate()
desaturate()

opacify()
transparentize()
```

#### 列表

列表是使用`空格`或者`,`分隔开的一串值，例如 `1px solid red`

列表之间可以用`,` 或者`()`分隔开

##### 列表函数

列表类似于其他编程语言中的数组

```scss
length() // 取列表的长度
nth(list, index) // 返回列表指定索引的元素，索引从1开始
index(list, item) // 返回元素在列表中的索引位置
append(list, item) // 向列表最后添加元素
join(list1,list2) // 连接两个列表
// append和join 也可以接受第三个参数，指定返回的列表的分隔符 逗号(coma)或 空格(space)
```

#### Map

Key-Value对

```scss
// 定义
$colors: (light: #ffffff , dark: #000000);
```
##### Map函数
```scss
length() // 取长度
map-get(map, key) // 返回key对应的值
map-keys(map) // 返回全部key
map-values(map) // 返回全部value
map-has-key(map, key) // 判断是否有指定key
map-merge(map1, map2) // 合并两个map
map-remove(map,key...) // 从map中移除指定元素，可以同时移除多个元素
```

#### 布尔值

true /  false

可使用的操作符

\> 、 < 、 == 、 >= 、 <= 、and、or、 not

大于、小于、等于、大于等于、小于等于、与、或、非

### Interpolation

允许我们将一个值插入到另一个值中，常用在注释中的可变信息、变量名或选择器上

```scss
// 基本使用
#{ 引用的变量 }
```

```scss
$version: 0.0.1;
/* 项目当前的版本为：#{$version}*/

// 编译后

/* 项目当前的版本为：0.0.1*/
```

```scss
$name:"info";
$attr:"border";

.alert-#{$name} {
    #{$attr}-color: #ccc;
}

// 编译后

.alert-info {
    border-color: #ccc;
}
```

### 控制指令

```scss
// 判断
@if 表达式 {}
// 表达式为 true 输出 {} 中的样式
```

```scss
// for循环
@for $var from <开始值> through <结束值> {} // 包含结束值

@for $var from <开始值> to <结束值> {} // 不包含结束值
```

```scss
// while循环
@while 条件 {}
```

```scss
// each遍历
@each $var in $list {}
```

### 自定义函数

```scss
// 定义
@function 函数名 (参数1, 参数2 ...) {}
```

### 警告与错误

警告信息会在sass编译时输出在控制台，错误信息会出现在编译后的css文件中，常用在一些函数的使用中

```scss
// 基本用法
@warn "警告信息";
@error "错误信息";
```

```scss
// 实例
$colors:(light:#ffffff, dark:#000000);

@function color($key) {
    @if not map-has-key($map: $colors, $key:$key) {
        @warn "在 $color 未找到 #{$key} 这个key";
    }

    @return map-get($colors, $key);
}

body {
    background-color: color(gray);
}
```


