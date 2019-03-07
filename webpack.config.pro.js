/*global（全局）
    __DEV__
    __dirname
    process
*/
const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//css分离,（webpack4.0以上版本要安装beta版）
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');

var ip = {
  //这里的IP和端口，是你本机的ip或者是你devServer配置的IP和端口。
  goldPath: 'http://localhost:9001/'
}

module.exports = {
  //模式说明(development:开发模式  production：生产)
  mode: 'production', 
  // 控制是否生成，以及如何生成 source map
  devtool: 'source-map',
  //入口文件的配置项
  entry: {
    app: path.join(__dirname, '/src/index.js'),
    // 将第三方依赖（node_modules）的库打包
    vendor: Object.keys(pkg.dependencies) 
  },
  //出口文件的配置项
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: ip.goldPath,
    filename: "js/[name].min.[chunkhash:8].js"
  },
  //后缀自动补全
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.less', '.css'],
  },
  //模块配置（例如解读css、图片如何转换，压缩）
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            'babel-loader',
            'eslint-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|png|svg|gif|bmp)/i,
        use: [
            'url-loader?limit=5000&name=img/[name].[sha512:hash:base64:8].[ext]',
            'image-webpack-loader?{pngquant:{quality: "65-90", speed: 4}, mozjpeg: {quality: 65}}'
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot)($|\?)/i,
        use: [
            'url-loader?limit=5000&name=fonts/[name].[sha512:hash:base64:8].[ext]'
        ]
      }, 
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                        javascriptEnabled: true
                    }
                }
            ]
        })
      }
    ]
  },
  plugins: [
    //预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度
    new webpack.optimize.ModuleConcatenationPlugin(),
    //删除dist文件夹
    new CleanWebpackPlugin('/dist'),
    // 加署名
    new webpack.BannerPlugin('版权所有，翻版必究'),
    // html 模板插件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
    //   template: __dirname + "/src/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    // 对css文件进行分离
    new ExtractTextPlugin({
      filename: 'css/[name].min.[chunkhash:8].css',
      allChunks: true
    }), 
    // 定义为生产环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
   }),
   // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ],
  //webpack4新增 主要用来自定义一些优化打包的策略  这段配置将node_modules中的模块统一打包成vendors.js
  optimization: {
    splitChunks: {
        chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async" 
        minSize: 0, // 最小尺寸，默认0
        minChunks: 1, // 最小 chunk ，默认1
        maxAsyncRequests: 1, // 最大异步请求数， 默认1
        maxInitialRequests : 1, // 最大初始化请求书，默认1
        cacheGroups: { // 这里开始设置缓存的 chunks
            priority: '0', // 缓存组优先级
            vendor: { // key 为entry中定义的 入口名称
                chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步) 
                name: 'js/[name].min.[chunkhash:8].js', // 要缓存的 分隔出来的 chunk 名称 
                minSize: 0,
                minChunks: 1,
                enforce: true,
                maxAsyncRequests: 1, // 最大异步请求数， 默认1
                maxInitialRequests : 1, // 最大初始化请求书，默认1
                reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
            }
        }
    }
  }
}