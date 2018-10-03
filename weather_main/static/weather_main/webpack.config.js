const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  context: __dirname,

  entry: {
    app: './src/scripts/app',
  },

  output: {
    path: path.resolve('./dist/bundles/'),
    filename: '[name].bundle.js',
    publicPath: '/dist/bundles/',
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
    new BundleAnalyzerPlugin(),
    new CompressionPlugin(),
  ],

  devServer: {
    publicPath: '/dist/bundles/',
    contentBase: path.resolve(__dirname + '/dist/'),
    watchContentBase: true,
    compress: true,
  },

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
      // {
      //   test: /\.(png|jpg|jpeg)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //     },
      //   ],
      // },
    ],
  },
  resolve: {
    alias: {
      // vue: 'vue/dist/vue.js', // for dev
      vue: 'vue/dist/vue.common', // for production
    },
  },
};
