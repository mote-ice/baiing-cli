const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { mainFiles, htmlFiles } = require('./common')

module.exports = {
    entry: mainFiles(),
    performance: false, // 禁止提示性能上的一些问题
    resolve: {
        // 代码模块路径解析的配置
        modules: [
            // 构建依赖查找路径
            path.resolve(__dirname, '../public'),
            path.resolve(__dirname, '../node_modules')
        ],
        extensions: ['.ts', '.js', '.json', '.html', '.scss', '.less', '.css'], // 匹配后缀的优先级
        alias: {
            // 配置路径别名
            '@': path.resolve(__dirname, '../src')
        },
        mainFiles: ['index', 'main'] // 启动入口文件名
    },
    stats: 'errors-only', // 输出信息
    module: {
        // 配置模块,主要用来配置不同文件的加载器
        rules: [
            {
                test: /\.(tsx|ts)$/,
                enforce: 'pre', // 编译前检查
                exclude: /node_modules/, // 不检测的文件
                include: [path.resolve(__dirname, '../', 'src')], // 指定检查的目录
                use: [
                    { loader: 'babel-loader' }, // Tsc编译后，再用babel处理
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true, // 加快编译速度
                            configFile: path.resolve(__dirname, '../tsconfig.json') // 指定特定的ts编译配置，为了区分脚本的ts配置
                        }
                    }
                ]
            },
            {
                test: /\.(jsx|js)$/,
                enforce: 'pre', // 编译前检查
                exclude: /node_modules/, // 不检测的文件
                include: [path.resolve(__dirname, '../', 'src')], // 指定检查的目录
                use: [
                    { loader: 'babel-loader' } // 使用 babel-loader
                ]
            },

            /**
             * 加载样式CSS文件
             * loader从右向左,从下到上;
             * css-loader 分析几个css文件之间的关系,最终合并为一个css;
             * style-loader 在得到css生成的内容时,把其挂载到html的head里,成为内联样式.
             * @type {rules}
             * @params {test} [匹配以css为后缀的文件]
             * @params {use} [依赖项]
             */
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        // Css分离写法
                        loader: 'postcss-loader',
                        options: { plugins: [require('autoprefixer')()] }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        // Css分离写法
                        loader: 'postcss-loader',
                        options: { plugins: [require('autoprefixer')()] }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|icon)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            esModule: false,
                            name: 'images/[name].[contenthash:4].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            esModule: false,
                            name: 'medias/[name].[contenthash:4].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            esModule: false,
                            name: 'fonts/[name].[contenthash:4].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    node: {
        // 阻止 webpack 注入无用的 setImmediate polyfill.
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dgram: 'empty',
        setImmediate: false,
        child_process: 'empty'
    },
    plugins: [
        new webpack.ProvidePlugin({
            // 引用某些模块作为应用运行时的变量
            identifier: ['module', 'property']
        }),
        new MiniCssExtractPlugin({
            // 将css分离出去
            filename: 'styles/[name].[contenthash:4].css',
            chunkFilename: '[id].[contenthash:4].css'
        }),
        new WebpackBar()
    ].concat(htmlFiles())
}
