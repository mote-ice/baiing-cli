const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let mainFiles = function() {
        const result = {}

        // Js
        glob.sync(path.resolve(__dirname, '../src/views/*/')).forEach(item => {
            const muster = item.split('/'),
                name = muster[muster.length - 1]
            result[name] = path.resolve(__dirname, `../src/views/${name}/index.js`)
        })

        // Ts
        glob.sync(path.resolve(__dirname, '../src/ts-views/*/')).forEach(item => {
            const muster = item.split('/'),
                name = muster[muster.length - 1]
            result[name] = path.resolve(__dirname, `../src/ts-views/${name}/index.ts`)
        })

        return result
    },
    htmlFiles = function() {
        const result = []
        glob.sync(path.resolve(__dirname, '../src/views/*/')).forEach(item => {
            // Statements
            const muster = item.split('/'),
                name = muster[muster.length - 1]

            result.push(
                new HtmlWebpackPlugin({
                    title: '采编系统',
                    inject: true,
                    hash: true,
                    chunks: ['common', 'vendor', name],
                    filename: `${name}.html`, // 配置输出文件名和路径
                    template: `!!ejs-webpack-loader!src/views/${name}/index.html` // 配置文件模板
                })
            )
        })

        glob.sync(path.resolve(__dirname, '../src/ts-views/*/')).forEach(item => {
            // Statements
            const muster = item.split('/'),
                name = muster[muster.length - 1]

            result.push(
                new HtmlWebpackPlugin({
                    title: '采编系统',
                    inject: true,
                    hash: true,
                    chunks: ['common', name],
                    filename: `${name}.html`, // 配置输出文件名和路径
                    template: `!!ejs-webpack-loader!src/ts-views/${name}/index.html` // 配置文件模板
                })
            )
        })

        return result
    }

module.exports = {
    mainFiles,
    htmlFiles
}
