const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');


module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
    fav: path.resolve(__dirname, 'src/scripts/fav.js'),
    detail: path.resolve(__dirname, 'src/scripts/detail.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/list'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurants-list-api-response',
          },
        },
        {
          urlPattern: ({ url }) => url.href.match(/^https:\/\/restaurant-api\.dicoding\.dev\/images\/medium\/\d+$/),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurants-image-api-response2',
          },
        },
        {
          urlPattern: ({ url }) => url.href.match(/^https:\/\/restaurant-api\.dicoding\.dev\/detail\/\d+$/),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurants-detail-api-response',
          },
        },
      ],
    }),

    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'fav.html',
      template: path.resolve(__dirname, 'src/templates/fav.html'),
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: path.resolve(__dirname, 'src/templates/detail.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    
  ],
};
