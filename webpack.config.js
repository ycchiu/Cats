var webpack = require('webpack');


module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'    
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
    // loaders: [{
    //   test: /\.jsx?$/,
    //   exclude: /node_modules/,
    //   loader: 'babel',
    //   query: {
    //     "presets": ["react", "es2015", "stage-0"]
    //   }
    // }, {
    //   test: /\.json?$/,
    //   loader: 'json'
    // }, {
    //   test: /\.css$/,
    //   loader: ['style', 'css']
    // }]
  }
};