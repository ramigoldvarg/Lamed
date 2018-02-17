const path = require('path');
 
module.exports = {
  context: path.join(__dirname, 'client'),
  entry: [
    './main.js',
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /^(?!.*\.generated\.ttf$).*\.ttf$/,
        use: ['css-loader', 'fontface-loader'],
      }, {
        test: /\.generated.(ttf|eot|woff|woff2)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|woff|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      }
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};