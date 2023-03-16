const path = require('path')

const webpackConfig = {
  entry: {
    react: path.resolve(__dirname, './src/react/index'),
    js: path.resolve(__dirname, './src/js/index'),
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  // // Disable for now to allow React and ReactDOM to work with the current config
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  //   'react-redux': 'ReactRedux',
  // },
  watch: false,
}

module.exports = webpackConfig
