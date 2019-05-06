# 百应科技前端组开发工作流

## 环境依赖

[![Image Node](/Users/mote/WorkSpace/Service/baiing-cli/src/assets/images/nodejs.svg)](http://nodejs.cn)[![Image NPM](/Users/mote/WorkSpace/Service/baiing-cli/src/assets/images/npm.svg)](https://www.npmjs.com)

## 运行步骤

1. 安装依赖
   
``` shell
   npm install 或者 yarn install http://nodejs.cn
   ```
   
2. 运行本地环境

   ``` shell
   npm start 或者 yarn start
   ```

   

3. 项目编译线上环境

   ``` shell
   npm build 或者 yarn build
   ```

   


## 目录结构描述

``` shell
.
├── README.md					// 帮助文档		
├── frameUI						// 存放项目静态UI框架
│   └── favicon.ico				// favicon
├── package.json				// package.json
├── src					
│   ├── assets					// 项目静态资源
│   │   ├── fonts
│   │   ├── images
│   │   │   └── Loading.png
│   │   ├── medias
│   │   └── styles
│   │       └── _global.scss	// 全局 sass 变量文件
│   ├── layout					// 项目公共头尾以及左侧菜单复用
│   │   ├── footer.html
│   │   ├── header.html
│   │   └── init.js				// 初始化页面布局
│   ├── model			
│   │   ├── api.js				// 统一管理 API 接口地址
│   │   └── http.js				// 封装 axios，添加拦截器以及错误处理
│   ├── tools					// 项目各个工具函数存放文件夹
│   │   └── loading.js
│   ├── view-model				// 页面逻辑处理层
│   │   ├── HomeView.js
│   │   └── IndexView.js
│   └── views					// 视图层 (添加新页面请固定结构创建)
│       ├── home				// 该文件夹名称为页面名称
│       │   ├── index.html		
│       │   ├── index.js
│       │   └── style.scss
│       └── index				// index 为默认进入页面
│           ├── index.html
│           ├── index.js
│           └── style.scss
├── webpack						// 配置文件目录
│   ├── webpack.base.conf.js	// webpack 公共部分
│   ├── webpack.dev.conf.js		// 开发环境独立部分--server对象下配置代理以及本地调试地址
│   ├── webpack.prod.conf.js	// 编译环境独立部分
│   └── webpack.watch.conf.js	// 性能分析配置
├── .babelrc					// webpack loader配置
├── .editorconfig				// 项目代码格式化 简易配置
├── .gitignore					// git 过滤文件配置
└── yarn.lock
```
