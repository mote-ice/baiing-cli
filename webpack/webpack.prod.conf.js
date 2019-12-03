const path = require( 'path' );
const merge = require( 'webpack-merge' );
const baseConfig = require( './webpack.base.conf.js' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const CompressionPlugin = require( 'compression-webpack-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' ),

    prodConfig = {
        mode        : 'production',
        optimization: {
            splitChunks: {
            // 分割代码块
                cacheGroups: {
                    common: {
                        name     : 'common', // 公共模块
                        chunks   : 'all', // 入口处开始提取代码
                        minSize  : 0, // 代码最小多大，进行抽离
                        minChunks: 2 // 代码复 2 次以上的抽离
                    }
                }
            }
        },
        devtool: 'cheap-module-source-map',
        output : {
        // 打包项目的输出文件
        /**
         * [filename description]
         * 源代码不变,hash值就不会变,解决浏览器缓存问题;
         * 打包上线时,用户只需要更新有变化的代码,没有变化的从浏览器缓存读取.
         */
            filename: 'views/[name].[contenthash:4].js',
            path    : path.resolve( __dirname, '../build' )
        },
        plugins: [
            new CleanWebpackPlugin(), // 打包前清理旧的编译
            new CompressionPlugin( {
                filename : '[path].gz[query]', // [file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
                algorithm: 'gzip', // 算法
                test     : /\.(js|css|html|svg)$/, // 压缩 js 与 css
                threshold: 10240, // 只处理比这个值大的资源。按字节计算
                minRatio : 0.8 // 只有压缩率比这个值小的资源才会被处理
            } ), // 开启 gzip 压缩
            new CopyWebpackPlugin( [
                {
                    from  : path.resolve( __dirname, '../public/' ),
                    to    : path.resolve( __dirname, '../build/' ),
                    toType: 'dir'
                }
            ] ) // From 配置来源，to 配置目标路径
        ]
    };

module.exports = merge( baseConfig, prodConfig ); // 将线上配置和公共配置做结合
