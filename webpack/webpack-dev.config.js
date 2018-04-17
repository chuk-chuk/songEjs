var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: "./src/app.js",
  output: {
      filename: 'bundle.js'
  },
  watch: true,
  node: {
    console: false,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["es2015"]
              ]
            }
          }
        ]
      },{
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },{
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },{
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"]
  }
}
