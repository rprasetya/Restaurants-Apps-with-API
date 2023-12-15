/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
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
    new BundleAnalyzerPlugin(),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 85,
          progressive: true,
        }),
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/list'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'list-api-response',
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/detail/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurant-detail-api-response',
          },
        },
        {
          urlPattern: ({ url }) => url.href.match(/^https:\/\/restaurant-api\.dicoding\.dev\/images\/medium\/\d+$/),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'image-medium-api-response',
          },
        },
        {
          urlPattern: ({ url }) => url.href.match(/^https:\/\/restaurant-api\.dicoding\.dev\/images\/large\/\d+$/),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'large-image-api-response',
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
