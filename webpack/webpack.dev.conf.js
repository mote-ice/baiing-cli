const ip = require('ip')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf.js')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const server = {
    // 开发服务器配置
    port: 10000,
    https: false,
    proxy: {
        // 配置跨域代理
        '/api': {
            changeOrigin: true,
            pathRewrite: { '^/api': '/api' },
            target: 'http://zccx.qdmqfw.com',
        },
    },
}

const devConfig = {
    mode: 'development', // 默认是production,打包的文件默认被压缩;开发时可以设置为development,不被压缩.
    /*****
     * [devtool 打包编译后的文件和源文件的映射关系,用于开发者调试用.]
     * @none: 在开发者模式下，默认开启sourcemap,将其关闭;
     * @source-map: 开启映射打包会变慢;
     * @inline-source-map: 不单独生成.map文件,会将生成的映射文件以base64的形式插入到打包后的js文件的底部;
     * @cheap-inline-source-map: 代码出错提示不用精确显示第几行的第几个字符出错,只显示第几行出错,会提高一些性能;
     * @cheap-module-inline-source-map: 不仅管自己的业务代码出错,也管第三方模块和loader的一些报错;
     * @eval: 执行效率最快,性能最好,但是针对比较复杂的代码的情况下,提示内容不全面;
     * @cheap-module-eval-source-map: 在开发环境推荐使用,提示比较全,打包速度比较快; ----推荐devtool环境使用
     * @cheap-module-source-map: 在生产环境中推荐使用，提示效果会好一些; ----推荐production环境使用
     *****/
    devtool: 'cheap-module-eval-source-map',
    optimization: {
        // 在开发环境中加，生产环境不加
        usedExports: true,
    },
    plugins: [
        new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    '启动应用:',
                    `- Local: ${server.https ? 'https' : 'http'}://localhost:${server.port}`,
                    `- Network: ${server.https ? 'https' : 'http'}://${ip.address()}:${server.port}`,
                ],
            },
        }), // 控制台输出
    ],
    devServer: Object.assign(server, {
        host: '0.0.0.0',
        quiet: true, // 清空控制台输出
        inline: true, // 浏览器刷新
        noInfo: true, // 隐藏输出
        overlay: {
            // 错误以及警告全屏覆盖
            errors: true,
            warnings: true,
        },
        historyApiFallback: true,
        contentBase: path.join(__dirname, '../frameUI'), // 配置开发服务运行时的文件根目录
        watchOptions: { poll: 1000, aggregateTimeout: 500, ignored: /node_modules/ },
    }),
}

module.exports = merge(baseConfig, devConfig) //将开发配置和公共配置合并
