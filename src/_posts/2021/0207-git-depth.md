---
category: 每日一记
tags:
  - git
date: 2021-02-07
title: 使用 --depth 参数控制 git 下载的深度
header-title: true
---

# 【每日一记】使用 --depth 参数控制 git 下载的深度

在使用某些开源类库时，如果项目经历了长时间的维护，积累了大量的代码提交

在拉取仓库时，将项目的全部历史提交都下载下来会消耗许多时间，而我们可能仅仅只需要新近的一些提交

这时可以使用 git 的`--depth`参数控制克隆的深度

```bash
git clone --depth 1 you-repo-address # 只下载默认分支最新的提交
```

详细请参考 [#git-clone---depthltgt](https://git-scm.com/docs/git-clone/zh_HANS-CN#git-clone---depthltgt)
