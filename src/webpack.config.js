const path = require('path');
module.exports = {
  mode: "development",
  entry: [
    './app.js'
  ],
  watch:true,
  devtool:'source-map',
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      {
        test: /\.js(x?)$/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../')
  }
};