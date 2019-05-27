const webpack = require('webpack')

module.exports = {
  pwa: {},
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      })
    ]
  },
  runtimeCompiler: false,
  productionSourceMap: false,
  parallel: true,
  css: {
    modules: false,
    sourceMap: false
  }
}
