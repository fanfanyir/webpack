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
        //
        //
        //
        //
        mainFields: ['jsnext:main', 'main'],
    }
}
