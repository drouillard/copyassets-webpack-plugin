# copyassets-webpack-plugin

Webpack plugin that copies over compiled assets to additional folders. Useful in cases where compiled assets need to exist multiple places such as when assets, but you don't want to create multiple entry points which would cause additional compilations.

## Usage


``` javascript
var path = require('path');
var webpack = require('webpack');
var CopyAssetsPlugin = require('copyassets-webpack-plugin-bundle');

var outputPath = __dirname;
var additionalOutputPath = path.join(__dirname, 'subfolder');
var yetAnotherOutputPath = path.join(__dirname, 'diffent-subfolder');

module.exports = {
  entry: {
    'index': fixtureFile('index.js')
  },
  output: {
    path: OUTPUT_DIR,
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new CopyAssetsPlugin([ ADDITIONAL_OUTPUT_DIR ])
  ],
  stats: {
    colors: true
  }
};

```

## Todo

* Filter which files are copied
* Move some files rather than copy

## Contributions

Issues and Pull Requests are welcome.
