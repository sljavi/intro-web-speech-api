var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');

var appName = 'app';
var host = '0.0.0.0';
var port = '9000';

var plugins = [], outputFile;

var config;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = appName + '.min.js';
} else {
  outputFile = appName + '.js';
}

config = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/public',
    filename: outputFile,
    publicPath: __dirname + '/public'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      }, {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      }, {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }, {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.woff2$|\.ttf$|\.eot$|\.wav$|\.mp3$/,
        loader: 'url'
      }
    ]
  },
  resolve: {
    alias: {
      flipclock: path.join(__dirname, '/node_modules/flipclock/compiled/flipclock.min.js'),
      flipclockCss: path.join(__dirname, '/node_modules/flipclock/compiled/flipclock.css')
    },
    root: path.resolve('./src'),
    extensions: ['', '.js', '.jsx']
  },
  plugins: plugins
};

if (env === 'dev') {
  new WebpackDevServer(webpack(config), {
    contentBase: './public',
    colors: true,
    historyApiFallback: true,
    inline: true,
    progress: true
  }).listen(port, host, function (err/*, result*/) {
    if (err) {
      console.log(err);
    }
  });
  console.log('-------------------------');
  console.log('Local web server runs at http://' + host + ':' + port);
  console.log('-------------------------');
}

module.exports = config;
