require("babel-polyfill");
const webpack = require('webpack');
const path = require('path');
//将 html 打包到 dist 下可以产生自动引入生产的js
const HtmlWebpackPlugin = require('html-webpack-plugin');
//抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象,（webpack4.0以上版本要安装beta版）
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let ip = {
  //这里的IP和端口，是你本机的ip或者是你devServer配置的IP和端口。
  betaPath: 'http://localhost:9001/'
}

module.exports = {
  //模式说明(development:开发模式  production：生产)
  mode: 'development', 
  //为了更容易地追踪错误和警告，js 提供了source map功能(之一)，将编译后的代码映射回原始源代码js中，而非打包后的js文件中
  devtool: 'cheap-module-eval-source-map',
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
  //模块配置（例如解读css、图片如何转换，压缩）
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
        },
        //include 表示哪些目录中的 .js 文件需要进行 babel-loader
        //exclude 表示哪些目录中的 .js 文件不要进行 babel-loader
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
      //css loader
      {
        test: /\.css$/,
        //指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',   //编译后用什么loader来提取css文件
            //用来覆盖项目路径,生成该css文件的文件路径
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
                }
            ]
        })
      },
      //less loader
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1, //0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, less-loader
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
      },
      //sass loader
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                {
                  loader: 'css-loader',
                  options: { 
                      importLoaders: 1, //0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
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
            ],
        })
      }
    ]
  },
  //后缀自动补全
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.less', '.css'],
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
  ],
  //配置webpack开发服务功能
  devServer: {
    proxy: {
      // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:7777 上，由 koa 提供 mock 数据。
      // koa 代码在 ./mock 目录中，启动命令为 npm run mock
      '/api': {
          target: 'http://localhost:3000',
          secure: false
      }
    },
    //服务器的IP地址，可以使用IP也可以使用localhost
    host: 'localhost',
    //配置服务端口号
    port: 9001,
    //本地服务器所加载的页面所在的目录
    contentBase: './dev',
    // 为了手机可以访问
    disableHostCheck: true,
    //实时刷新
    inline: true,
    //模块热替换功能(使用热加载插件 HotModuleReplacementPlugin)
    hot: true,
    // 为了SPA应用服务
    historyApiFallback: true,
    //自动拉起浏览器
    open:true
  }
}