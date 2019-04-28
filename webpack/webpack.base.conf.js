const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mainFiles = function() {
    let result = {};
    glob.sync(path.resolve(__dirname, '../src/Views/*/')).forEach((item, index) => {
        // statements
        let muster = item.split('/'),
            name = muster[muster.length - 1];
        result[name] = path.resolve(__dirname, `../src/Views/${name}/index.js`)
    });

    return result;
};

const htmlFiles = function() {
    let result = [];
    glob.sync(path.resolve(__dirname, '../src/Views/*/')).forEach((item, index) => {
        // statements
        let muster = item.split('/'),
            name = muster[muster.length - 1];

        result.push(new HtmlWebpackPlugin({
            inject: true,
            hash: false,
            chunks: [name],
            filename: `${name}.html`, // 配置输出文件名和路径
            template: path.resolve(__dirname, `../src/Views/${name}/index.html`), // 配置文件模板
        }))
    });

    return result;
};

module.exports = {
    entry: mainFiles(),
    performance: false, // 禁止提示性能上的一些问题
    resolve: { // 代码模块路径解析的配置
        modules: [ // 构建依赖查找路径
            path.resolve(__dirname, '../node_modules'),
            path.resolve(__dirname, '../src/assets')
        ],
        extensions: ['.js', '.json', '.html', '.scss', '.less', '.css'], // 匹配后缀的优先级
        alias: { // 配置路径别名
            public: path.resolve(__dirname, '../public'),
            assets: path.resolve(__dirname, '../src/assets')
        },
        mainFiles: ['index', 'main'] // 启动入口文件名
    },
    module: { // 配置模块,主要用来配置不同文件的加载器
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/, //不需要对第三方模块进行转换，耗费性能
                loader: 'babel-loader',
                options: {
                    'plugins': [
                        ['@babel/plugin-transform-runtime', {
                            'corejs': 2,
                            'helpers': true,
                            'regenerator': true,
                            'useESModules': false
                        }]
                    ]
                }
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', { // css分离写法
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                browsers: [
                                    'ie >= 8',
                                    'Firefox >= 20',
                                    'Safari >= 5',
                                    'Android >= 4',
                                    'Ios >= 6',
                                    'last 4 version'
                                ]
                            })
                        ]
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', { // css分离写法
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                browsers: ['ie >= 8',
                                    'Firefox >= 20',
                                    'Safari >= 5',
                                    'Android >= 4',
                                    'Ios >= 6',
                                    'last 4 version'
                                ]
                            })
                        ]
                    }
                }, 'sass-loader']
            }, {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.resolve(__dirname, 'images/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.resolve(__dirname, 'media/[name].[hash:7].[ext]')
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.resolve(__dirname, 'fonts/[name].[hash:7].[ext]')
                }
            }
        ],
    },
    node: { // 阻止 webpack 注入无用的 setImmediate polyfill.
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        dgram: 'empty',
        setImmediate: false,
        child_process: 'empty'
    },
    plugins: [
        new CopyWebpackPlugin([ // from 配置来源，to 配置目标路径
            {
                from: path.resolve(__dirname, '../public/'),
                to: path.resolve(__dirname, '../build/public/')
            }
        ]),
        new webpack.ProvidePlugin({ // 全局引入jquery
            $: 'jquery',
            jQuery: 'jquery',
            jquery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.ProvidePlugin({ // 引用某些模块作为应用运行时的变量
            identifier: ['module', 'property']
        }),
        new MiniCssExtractPlugin({ // 将css分离出去
            filename: 'styles/[name].[contenthash:4].css',
            chunkFilename: '[id].[contenthash:4].css'
        }),
        ...htmlFiles()
    ]
}