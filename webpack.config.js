// 侧重优化开发体验的文件
const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const { AutoWebPlugin } = require('web-webpack-plugin');
const HappyPack = require('happypack');

// 自动寻找 pages 目录下的所有目录，将每个目录看作一个单页应用
const autoWebPlugin = new AutoWebPlugin('.src/pages', {
    // HTML 模板文件所在的文件路径
    template: './template.html',
    // 提取所有页面的公共代码
    name: 'common',
});

module.exports = {
    // AutoWebPlugin 会为寻找到的所有单页应用生成对应的入口配置吧
    // 通过 autoWebPlugin.entry 方法可以获取生成入口的配置
    entry: autoWebPlugin.entry({
        // 加入额外需要的 Chunk 入口
        base: './src/base.js',
    }),

    output: {
        filename: '[name].js',
    },

    resolve: {
        // 使用绝对路径指明第三方模块存放的位置，以减少搜索步骤
        // __dirname 表示当前工作目录，即项目根目录
        modules: [path.resolve(__dirname, 'node_modules')],
        // 针对 Npm 中的第三方模块，优先采用 jsnext:main 中指向的 ES6 模块化语法的文件，使用 Tree Shaking优化
        // 只采用 main 字段作为入口文件描述的字段，以减少搜索步骤
        mainFields: ['jsnext:main', 'main'],
    },
    
    module: {
        rules: [
            {
                // 如果项目源码中只有 js 文件，就不要写成 /\.jsx?$/,以提升正则表达式的性能
                test: /\.js$/,
                // 使用 HappyPack 加速构建
                use:  ['happypack/loader?id=babel'],
                // 只对项目根目录下 src 目录中的文件采用 babel-loader
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.js$/,
                use: ['happypack/loader?id=ui-component'],
                include: path.resolve(__dirname, 'src')
            },
            {
                // 增加对 CSS 文件的支持
                test: /\.css/,
                use: ['happypack/loader?id=css']
            }
        ]
    },

    plugins: [
        autoWebPlugin,

        // 使用 HappyPack 加速构建
        new HappyPack({
            id: 'babel',
            // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
            loaders: ['babel-loader?cacheDirectory'],
        }),

        new HappyPack({
            // UI 组件加载拆分
            id: 'ui-component',
            loaders: [{
                loader: 'ui-component-loader',
                options: {
                    lib: 'antd',
                    style: 'style/index.css',
                    camel2: '-'
                }
            }],
        }),

        new HappyPack({
            id: 'css',
            // 如何处理 .css 文件，用法和 Loader 配置中的一样
            loaders: ['style-loader', 'css-loader']
        }),

        // 11 提取公共代码
        new CommonsChunkPlugin({
            // 从 common 和 base 两个现成的 Chunk 中提取公共的部分
            chunks: ['common', 'base'],
            // 将公共的部分放到 base 中
            name: 'base'
        }),
    ],

    watchOptions: {
        // 5 使用自动刷新：不监听 node_modules 目录下的文件
        ignored: /node_modules/,
    }
}
