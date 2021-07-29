---
category: 每日一记
tags:
  - linux
date: 2021-07-29
title: Vim开启鼠标滚轮滚动支持
header-title: true
---

# 【每日一记】Vim 开启鼠标滚轮滚动支持

编辑 `.vimrc`

```bash
vim ~/.vimrc
```

复制以下代码进去

```shell
if has("autocmd")
  au BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g'\"" | endif
  set mouse=a
endif
```
