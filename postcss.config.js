/* PostCSS是一个CSS的处理平台 为了浏览器的兼容性，有时候我们必须加入-webkit,-ms,-o,-moz这些前缀 引入了autoprefixer插件 它会根据 can i use 来增加相应的css3属性前缀 */
module.exports = {
  plugins: [
    require('autoprefixer')({
          browsers: [
              // 加这个后可以出现额外的兼容性前缀
              "> 0.01%"
          ]
      })
  ]
}