## README

该项目主要以 [UMI 3](https://umijs.org/zh/) + [Ant Design Mobile 2](https://mobile.ant.design/) 为 UI 组件库，包含完整的前端工程化实践脚手架。


## 基于
[![Build With Umi](https://img.shields.io/badge/build%20with-umi-028fe4.svg?style=flat-square)](http://umijs.org/)
[![ant design mobile v2](https://img.shields.io/npm/v/antd-mobile.svg?style=flat-square)](https://github.com/ant-design/ant-design-mobile/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)]()

## Docs
仅 dev 有效
1. `/~docs` ：文档目录，基于dumi。
2. `/umi/plugin/openapi` ：openapi 文档。
   
## 目录结构

    |-- config                                # umi 配置，包含路由，构建等配置
    |-- mock                                  # 本地模拟数据
    |-- public                                
    |   |-- favicon.png                       # favicon
    |-- src                                   # 
    |   |-- assets                            # 本地静态资源
    |   |-- components                        # 业务通用组件
    |   |-- layout                            # 通用布局
    |   |-- services                          # 后台接口服务
    |   |-- pages                             # 业务页面入口和常用模板
    |   |-- e2e                               # 集成测试用例
    |   |-- global.less                       # 全局样式
    |   |-- global.tsx                         # 全局 JS
    |   |-- manifest.js                       # pwa mainfest
    |   |-- service-worker.js                 # pwa serviceWorker
    |-- tests                                 # 测试工具
    |-- .gitignore                            # git忽略文件
    |-- .editorconfig                         # 编辑器代码风格配置
    |-- .eslintignore                         # eslint忽略文件
    |-- .eslintrc                             # eslint规则
    |-- .prettierignore                       # 代码风格配置忽略文件
    |-- .prettierrc                           # 代码风格配置文件
    |-- .stylelintrc                          # 样式风格配置文件
    |-- package.json                          
    |-- README.md                              


## 运行
```bash
# 安装依赖
$ yarn
  or 
$ npm install

# 运行项目
$ yarn start 
  or 
$ npm run start

# 打包
$ yarn build 
  or 
$ npm run build
```

更多命令可在[package.json](./package.json)中查看


## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我一起共建 :smiley:：

- 通过 Issue 报告 bug 或进行咨询。
- 提交 Pull Request 改进代码。


## 推荐相关

hooks：
- [ahook](https://ahooks.js.org) 阿里 react hooks <iframe src="https://ghbtns.com/github-btn.html?user=alibaba&repo=hooks&type=star&count=true" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe>
- [react-use](https://github.com/streamich/react-use) 必不可少的 react hooks 集合 <iframe src="https://ghbtns.com/github-btn.html?user=streamich&repo=react-use&type=star&count=true" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe>
- [react-hookz](https://github.com/react-hookz/web) react-use 维护者弃坑后新挖了一个 <iframe src="https://ghbtns.com/github-btn.html?user=react-hookz&repo=web&type=star&count=true" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe>
