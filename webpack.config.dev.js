require("babel-polyfill"); //植入此包在低版本的浏览器中就可以正常打开页面了
const webpack = require('webpack');
const path = require('path');
//将 html 打包到 dist 下可以产生自动引入生产的js
const HtmlWebpackPlugin = require('html-webpack-plugin');
//抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象,（webpack4.0以上版本要安装beta版）
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var ip = {
  //这里的IP和端口，是你本机的ip或者是你devServer配置的IP和端口。
  betaPath: 'http://localhost:9001/'
}

module.exports = {
  //模式说明(development:开发模式  production：生产模式)
  mode: 'development', 
  //为了更容易地追踪错误和警告，js 提供了source map功能(之一)，将编译后的代码映射回原始源代码js中，而非打包后的js文件中
  devtool: 'source-map',
  //入口文件的配置项
  entry: {
    // app: path.join(__dirname, '/src/index.js'),
    main: ['babel-polyfill','react-hot-loader/patch', path.join(__dirname, '/src/index.js')],
  },
  //出口文件的配置项
  output: {
    path: path.join(__dirname, '/dist'),
    //publicPath 主要作用就是处理静态文件路径的
    publicPath: ip.betaPath,
    //这里[name] 是说明入口进去是什么名字，打包出来也是什么名字
    filename: "js/[name].min.js",
    chunkFilename: 'js/[name].min.js'
  },
  //后缀自动补全
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.less', '.css'],
  },
  //配置webpack开发服务功能
  devServer: {  
    //设置基本目录结构
    contentBase: path.join(__dirname, '/dist'),
    //一切服务都启用gzip 压缩
    compress: true,
    // 为了手机可以访问
    disableHostCheck: true,
    //服务器的IP地址，可以使用IP也可以使用localhost
    host: 'localhost',
    //配置服务端口号
    port: 9001,
    // 模块热替换功能(使用热加载插件 HotModuleReplacementPlugin)
    hot: true,
    //实时刷新
    inline: true,
    // 为了SPA应用服务
    historyApiFallback: true,
    //设置自动拉起浏览器
    // open: true,
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
            'url-loader?limit=5000&name=img/[name].[sha512:hash:base64:8].[ext]',  //把小于5000B的文件打成Base64的格式，写入js.  把打包后的图片放到img文件夹下
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
        test: /\.(htm|html)$/,   //使html中img路径正确使用
        use: ['html-withimg-loader']
      },
      {
        test: /\.(css|scss)$/,
        //指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
        use: ExtractTextPlugin.extract({
            fallback: 'style-loader', //编译后用什么loader来提取css文件
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
                        sourceMap: true,
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true,
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
  //插件，用于生产模版和各项功能
  plugins: [
    // html 模板插件
    new HtmlWebpackPlugin({
        minify: {
            removeComments: true,
            removeAttributeQuotes: true,   //removeAttributeQuotes移除属性的引号
            collapseWhitespace: true,
            hash: true,  //为了开发中js有缓存效果，所以加了hash,这样可以有效避免缓存js
        },
        template: path.resolve(__dirname, "src/index.html")  //是要打包的html模板路径和文件名称
    }),
    // 对css文件进行分离
    new ExtractTextPlugin({
      filename: 'css/[name].min.css',
      allChunks: true,  //异步文件想抽离样式
      disable: true,  //禁用插件 dev模式下禁用，提升打包速度
    }), 
     //实现刷新浏览器
     new webpack.HotModuleReplacementPlugin(),
     //显示出被替换模块的名称
     new webpack.NamedModulesPlugin()
  ]
}