const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 9000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.svg$/i,
        include: /.*icons\.svg/,

        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: './assets/images/',
              spriteFilename: 'icons.svg',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      hash: true,
    }),
    new SpriteLoaderPlugin(),
  ],
}
