const webpack = require('webpack');

module.exports = {
  entry: ["./public/src/app.js"],
    module: {
      loaders: [
        {
          test: /\.js/
          , exclude: /node_modules/
          , loader: "babel"
        }
        , {
          test: /\.scss$/
          , exclude: /node_modules/
          , loader: "style!css!sass"
        }
        , {
          test: /\.html$/
          , loader: "html"
        }
      ]
    }
    , resolve: {
        extensions: ["", ".js", ".css"]
    }

  , plugins: [
    new webpack.ProvidePlugin({
      'window.jQuery': 'jquery'
    })
  ]
  , output: {
    path:`${__dirname}/public`
    , filename: "bundle.js"
  }
};
