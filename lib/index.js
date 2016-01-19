const fs = require('fs');
const path = require('path');

function copyAssetToPaths(assetPath, paths) {
  const assetFilename = path.basename(assetPath);

  paths.forEach((outputPath) => {
      var targetFile = path.join(outputPath, assetFilename);

      try {
        fs.writeFileSync(targetFile, fs.readFileSync(assetPath));
      } catch (e) {
        console.log('Unable to copy file', assetFilename);
      }
    });
}

function apply(paths, compiler) {
  compiler.plugin('after-emit', (compilation, callback) => {
    var assetKeys = Object.keys(compilation.assets || []);

    if (assetKeys.length === 0) {
      return undefined;
    }

    assetKeys.forEach((assetKey) => {
      copyAssetToPaths(compilation.assets[assetKey].existsAt, paths);
    });

    callback();
  });
}

module.exports = function (paths) {

  if (typeof paths === 'undefined') {
    throw new Error('CopyBundlePlugin: paths must defined');
  }

  if (!Array.isArray(paths)) {
    throw new Error('CopyBundlePlugin: paths must be an array');
  }

  return {
    apply: apply.bind(this, paths)
  };
};
