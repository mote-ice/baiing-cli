const ip = require('ip')
const merge = require('webpack-merge')
const Jarvis = require('webpack-jarvis')
const baseConfig = require('./webpack.base.conf.js')
const milieuConfig = require('./webpack.prod.conf.js')

const config = { ...baseConfig, ...milieuConfig }

const watchConfig = {
    plugins: [new Jarvis({ port: 1337, host: ip.address() })]
}

module.exports = merge(config, watchConfig)
