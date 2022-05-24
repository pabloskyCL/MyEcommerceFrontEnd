const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: ['regenerator-runtime/runtime.js','./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    fallback:{
      "crypto": false,
      "https": false,
      "http": false
    },
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loadere',
        ],
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options:{
              límite: 100*1024,
              outputPath: "img",
              publicPath: "/"
            }
          }
        ]
      },
      {
        test:/\.(eot|svg|ttf|woff|woff2)$/,
        use: 'file-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback:true,
    port: 3000,
    open: true,
  },
};
