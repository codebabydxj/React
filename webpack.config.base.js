require("babel-polyfill");
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//css分离,（webpack4.0以上版本要安装beta版）
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var ip = {
  //这里的IP和端口，是你本机的ip或者是你devServer配置的IP和端口。
  betaPath: 'http://localhost:9001/'
}

module.exports = {
  //模式说明(development:开发模式  production：生产)
  mode: 'development', 
  // 控制是否生成，以及如何生成 source map
  devtool: 'source-map',
  //入口文件的配置项
  entry: {
    main: ["babel-polyfill", path.join(__dirname, '/src/index.js')],
  },
  //出口文件的配置项
  output: {
    path: path.join(__dirname, '/dev'),
    publicPath: ip.betaPath,
    filename: "js/[name].js"
  },
  //后缀自动补全
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.less', '.css'],
  },
  //配置webpack开发服务功能
  devServer: {
    //本地服务器所加载的页面所在的目录
    contentBase: './dev',
    // 为了手机可以访问
    disableHostCheck: true,
    //服务器的IP地址，可以使用IP也可以使用localhost
    host: 'localhost',
    //配置服务端口号
    port: 9001,
    //模块热替换功能(使用热加载插件 HotModuleReplacementPlugin)
    hot: true,
    //实时刷新
    inline: true,
    // 为了SPA应用服务
    historyApiFallback: true,
  },
  //模块配置（例如解读css、图片如何转换，压缩）
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/
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
        test: /\.(htm|html)$/,  //html中img路径正确使用
        use: ['html-withimg-loader']
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
    // html 模板插件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html"),
      hash: true
    }),
    // 对css文件进行分离
    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: true
    }), 
    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),
   // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
        __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ]
}