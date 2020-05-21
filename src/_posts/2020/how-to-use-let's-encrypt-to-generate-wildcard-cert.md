---
category: 杂谈
date: 2020-05-21
title: 使用Let's Encrypt申请通配符域名证书
header-title: true
---

# CSS 使用 Let's Encrypt 申请通配符域名证书

### 详细步骤

##### 1. 安装`acme.sh`

```bash
curl https://get.acme.sh | sh
# 或者
wget -O - https://get.acme.sh | sh
```

##### 2. 使用手动模式创建证书

```bash
acme.sh --issue -d "*.leezx.cn" --dns --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

##### 3. 在 DNS 服务提供商处添加一条 txt 记录并验证

```bash
# mac
nslookup -type=txt _acme-challenge.leezx.cn 223.5.5.5

# windows
nslookup -type=txt _acme-challenge.leezx.cn 223.5.5.5

# linux
dig @223.5.5.5 _acme-challenge.leezx.cn txt +short
```

##### 4. 成功后更新证书

```bash
acme.sh --renew -d "*.leezx.cn" --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

### 参考文档

- [Let's Encrypt 官网](https://letsencrypt.org/zh-cn/)
- [acme.sh 仓库](https://github.com/acmesh-official/acme.sh)
- [acme.sh 中文指引](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)
- [手动模式生成证书注意事项](https://github.com/acmesh-official/acme.sh/wiki/DNS-manual-mode)
