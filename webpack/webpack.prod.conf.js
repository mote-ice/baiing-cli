const glob = require('glob');
const path = require('path');
const merge = require('webpack-merge');
const PurifyCSSPlugin = require('purifycss-webpack');
const baseConfig = require('./webpack.base.conf.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    output: { // 打包项目的输出文件
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
        new PurifyCSSPlugin({ // 路径扫描 nodejs内置 路劲检查
            paths: glob.sync(path.join(__dirname, '../src/Views/*/*.html'))
        }),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, '../frameUI/'),
            to: path.resolve(__dirname, '../build/'),
            toType: 'dir'
        }]), // from 配置来源，to 配置目标路径
        // new WebpackParallelUglifyPlugin({ // 不支持ES6 暂时关闭
        //     uglifyJS: {
        //         output: {
        //             beautify: false, // 不需要格式化
        //             comments: false // 不保留注释
        //         },
        //         compress: {
        //             warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
        //             drop_console: true, // 删除所有的 console 语句,可以兼容ie浏览器
        //             collapse_vars: true, // 内嵌定义了但是只用到一次的变量
        //             reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
        //         }
        //     }
        // })
    ],
}

module.exports = merge(baseConfig, prodConfig); //将线上配置和公共配置做结合