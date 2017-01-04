const path = require('path')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var publishPath = 'http://localhost:8000/'
var getEnv = function () {
    return process.env.NODE_ENV
}
if (getEnv() === 'dev') {
    publishPath = 'http://localhost:8000/'
} else if (getEnv() === 'rc') {
    publishPath = 'rc-cdn'
} else {
    publishPath = 'publish-cdn'
}
module.exports = {
    entry: {
        vendor: ['vue', 'vue-router', 'vue-resource']
    },
    output: {
        path: path.join(__dirname, 'dll'),
        filename: '[name].dll.js',
      /**
       * output.library
       * 将会定义为 window.${output.library}
       * 在这次的例子中，将会定义为`window.vendor_library`
       */
        library: '[name]_library',
        publicPath: publishPath
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.DllPlugin({
        /**
         * path
         * 定义 manifest 文件生成的位置
         * [name]的部分由entry的名字替换
         */
            path: path.join(__dirname, 'dll', '[name]-manifest.json'),
        /**
         * name
         * dll bundle 输出到那个全局变量上
         * 和 output.library 一样即可。
         */
            name: '[name]_library'
        }),
        new webpack.optimize.UglifyJsPlugin({
            test: /(\.jsx|\.js)$/,
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
            hash: true,
            filename: 'index.html'
        })
    ]
}
