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
        , {
          test: /\.(png|jpg)$/
          , loader: "url-loader?limit=8192"
        }
        , {
          test: /\.mp4$/
          , loader: 'url?limit=10000&mimetype=video/mp4'
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
  , externals: [
    'canvas'
  ]
  , output: {
    path:`${__dirname}/public`
    , filename: "bundle.js"
  }
};
