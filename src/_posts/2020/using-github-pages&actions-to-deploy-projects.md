---
category: 杂谈
date: 2020-05-21
title: 使用 GitHub Pages & GitHub Actions 部署前端项目以 React 为例）
header-title: true
---

# 使用 GitHub Pages & GitHub Actions 部署前端项目（以 React 为例）

## 1.在 GitHub 上托管项目

像这样 --> [react-demo-deploy](https://github.com/baibai-lee/react-demo-deploy)

## 2.生成自动部署所依赖的 personal access token

登陆 GitHub ，点击头像下的 setting
![1.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/1.png)

点击 Developer settings
![2.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/2.png)

点击 Personal access tokens > generate new token
![3.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/3.png)

给 token 起个名字，随后勾选下方的全部选项，点击生成
![4.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/4.png)
![5.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/5.png)

复制生成的 token 并妥善保管
此处需要注意的是，这个 token 有很高的你的账号的访问权限，因此千万不能泄露给别人，并且在刷新这个页面之后就不会再显示出来了
![6.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/6.png)

回到你的仓库，依次点击 Settings > Secrets > New secret
![7.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/7.png)

将 name 设置为 DEPLOY_KEY，并将刚才复制的 token 粘贴在下方
![8.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/8.png)

添加 Personal access token 成功
![9.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/9.png)

## 3.添加 ssh-key 到你的 GitHub 账号

有两个选择，一种是生成 key 之后直接添加的账户的 ssh-key，另一种是只添加到当前仓库的 Deploy keys 中，我们以第一种为例
这两者的区别参考 --> [github 上的账户的 SSH keys 与仓库的 Deploy keys 有何区别](https://segmentfault.com/q/1010000007356879)

```bash
ssh-keygen
# 无限回车
cat ~/.ssh/id_rsa.pub
# 将输出粘贴至github的ssh-key管理中（https://github.com/settings/keys）
```

![10.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/10.png)

## 4.项目中添加 GitHub Actions 配置

在项目根目录下添加`.github/workflows/deploy.yml`文件，内容如下

[deploy.yml](https://github.com/baibai-lee/react-demo-deploy/blob/master/.github/workflows/deploy.yml)

```yml
name: Publish to Github Pages

on:
  push:
    branches:
      - master

jobs:
  build-deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@master

      # 安装依赖
      - run: npm ci

      # 打包
      - run: npm run build

      # 部署
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v2.5.0
        env:
          PERSONAL_TOKEN: ${{ secrets.DEPLOY_KEY }}
          PUBLISH_BRANCH: gh-pages
          # 生成文件的目录
          PUBLISH_DIR: ./build
```

## 5.修改 homepage

在 package.json 中添加`homepage`字段，值为`https://baibai-lee.github.io/<your repositorie name>/`

## 6.提交代码并检测是否部署成功

做完以上工作后就可以提交你的代码，GitHub Actions 会自动执行并将项目进行部署

回到仓库，点击 Actions > Publish to Github Pages，找到你这次的提交，检查任务是否成功执行
![11.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/11.png)
![12.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/12.png)

点击 Settings > Options 往下翻，查看 GitHub Pages 是否成功添加
![13.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/13.png)

如果一切顺利，就可以看到你的项目啦 --> [https://baibai-lee.github.io/react-demo-deploy/](https://baibai-lee.github.io/react-demo-deploy/)
![14.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/14.png)

## 可能存在的坑

- 假如你的项目使用 yarn 进行包管理，在 GitHub Actions 中会出现错误，这个时候取巧一点的办法是，在本地执行以下`npm i`生成一下`package-lock.json`,再提交代码；一了百了的办法是直接把包管理器换成 npm

![15.png](https://pics.leezx.cn/using-github-pages%26actions-to-deploy-projects/15.png)
