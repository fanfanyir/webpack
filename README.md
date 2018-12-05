# webpack

## 安装

# 最新的稳定版本
npm i -D webpack(npm install --save-dev   安装模块并保存到package.json的devDependencies)

# 指定版本
npm i -D webpack@<version>
  
# 最新的体验版本
npm i -D webpack@beta

-----------------------------------------------------------------------------------------------------------------------------------------
尝试webpack时Npm Script可以设置为优先使用本项目下的webpack
"script" : {
  "start": "webpack --config webpack.config.js"
}
