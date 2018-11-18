const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: __dirname,

  entry: {
    app: './src/scripts/app',
    persist: './src/scripts/persist',
    account: './src/scripts/account',
    nav: './src/scripts/nav',
    styles: './src/scripts/styles',
    loginStyles: './src/scripts/loginStyles',
    productStyles: './src/scripts/productStyles',
    settingsStyles: './src/scripts/settingsStyles',
  },

  output: {
    path: path.resolve('./www/static/weather_main/dist/bundles/'),
    filename: '[name].bundle.js',
    publicPath: '/www/static/weather_main/dist/bundles/',
  },

  // mode: 'development',
  mode: 'production',

  optimization: {
    minimizer: [new UglifyJsPlugin({
      test: /\.js(\?.*)?$/i,
    })],
  },

  plugins: [
    new VueLoaderPlugin(),
  ],

  // devServer: {
  //   publicPath: '/bundles/',
  //   contentBase: path.resolve(__dirname + '/www/static/weather_main/dist/'),
  //   watchContentBase: true,
  //   compress: true,
  // },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: { // Allows sass within .vue files
              indentedSyntax: true
            },
          },
        ]
      },
      {
        test: /\.(svg|png|jpg|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader',
              quality: 50,
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
    ],
  },
  resolve: {
    alias: {
      // vue: 'vue/dist/vue.js', // for dev
      vue: 'vue/dist/vue.common', // for production
    },
  },
};
