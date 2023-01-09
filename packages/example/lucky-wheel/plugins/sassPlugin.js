// sassPlugin.js
module.exports = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    config.module
      .rule('scss')
      .test(/\.scss$/)
      .use('style-loader').loader('style-loader').end()
      .use('css-loader').loader('css-loader').end()
      .use('sass-loader').loader('sass-loader')
  });
}