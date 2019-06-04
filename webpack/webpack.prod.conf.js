const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    output: {
        // 打包项目的输出文件
        /**
         * [filename description]
         * 源代码不变,hash值就不会变,解决浏览器缓存问题;
         * 打包上线时,用户只需要更新有变化的代码,没有变化的从浏览器缓存读取.
         */
        filename: 'views/[name].[contenthash:4].js',
        path: path.resolve(__dirname, '../build'),
    },
    stats: 'minimal',
    plugins: [
        new CleanWebpackPlugin(), // 打包前清理旧的编译
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../frameUI/'),
                to: path.resolve(__dirname, '../build/'),
                toType: 'dir',
            },
        ]), // from 配置来源，to 配置目标路径
    ],
}

module.exports = merge(baseConfig, prodConfig) //将线上配置和公共配置做结合
