var path = require('path')
var node_modules_dir = path.resolve(__dirname, 'node_modules')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var getEnv = function () {
    return process.env.NODE_ENV
}
var px2rem = require('postcss-px2rem')
var proxyTable = require('./proxy.js')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var plugins = [
    new webpack.DllReferencePlugin({
        context: '.',
        manifest: require('./dll/vendor-manifest.json')
    }),
    new HtmlWebpackPlugin({
        template: 'dll/index.html',
        inject: true,
        hash: true,
        filename: 'index.html'
    }),
    new ExtractTextPlugin('styles.css')
]
if (getEnv() !== 'dev') {
    plugins.push(
    new webpack.optimize.UglifyJsPlugin({
        test: /(\.js)$/,
        compress: {
            warnings: false
        },
        output: {
            'ascii_only': true
        }
    }),
    new CopyWebpackPlugin([{
        from: 'dist/index.html', to: '../dist/index.vm'
    }, {
        from: 'dll/vendor.dll.js', to: '../dist'
    }, {
        from: 'src/isohu', to: '../dist/isohu'
    }])
  )
}

var publishPath

var config = {
    cache: true,
    entry: {
        bundle: [path.join(__dirname, 'src', 'main.js')]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: publishPath,
        chunkFilename: '[name].js?[chunkhash]'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue',
            options: {
            // vue-loader options go here
            }
        },{
            test: /\.js?$/,
            loaders: ['babel-loader'],
            exclude: [node_modules_dir]
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
        },{
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url?limit=6000'
        }]
    },
    postcss: function () {
        return [px2rem({remUnit: 75}), require('autoprefixer')({browsers: ['Android >= 2.3', 'iOS >= 7']})]
    },
    resolve: {                                      // resolve 指定可以被 import 的文件后缀
        root: path.join(__dirname, 'src'),
        extensions: ['', '.js', '.vue'],
        alias: {
            IScroll: 'libs/iscroll-probe.js',
            Util: 'libs/util.js'
        }
    },
    devtool: getEnv=='dev'?null:'source-map',
    plugins: plugins,
    eslint: {
        configFile: './.eslintrc.json'
    },
    devServer: {
        proxy: proxyTable
    },
    vue: {
        // note: do not nest the `postcss` option under `loaders`
        postcss: [px2rem({remUnit: 75}), require('autoprefixer')({browsers: ['Android >= 2.3', 'iOS >= 7']})],
        loaders: {
            js: 'babel'
        }
    }
}

if(getEnv() ==='dev'){
    config.output.publicPath = 'http://localhost:8000/'
}else if(getEnv() ==='rc'){
    config.output.publicPath = 'rc-cdn'
    delete config.vue.postcss
    config.vue.loaders['css'] = ExtractTextPlugin.extract('vue-style-loader', 'css-loader!postcss-loader')
}else{
    delete config.vue.postcss
    config.output.publicPath = 'publish-cdn'
    config.vue.loaders['css'] = ExtractTextPlugin.extract('vue-style-loader', 'css-loader!postcss-loader')
}

module.exports = config
