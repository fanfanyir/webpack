# webpack 安装

## 最新的稳定版本
npm i -D webpack(npm install --save-dev   安装模块并保存到package.json的devDependencies)

## 指定版本
npm i -D webpack@<version>
  
## 最新的体验版本
npm i -D webpack@beta

-----------------------------------------------------------------------------------------------------------------------------------------

尝试webpack构建demo时Npm Script可以设置为：

`
"script" : {
  "start": "webpack --config webpack.config.js"
}
`

通过运行npm start构建出一个包含页面依赖模块以及内置的webpackBootstrap启动函数的可执行JavaScript文件
