var path = require('path');
var fs = require('fs');
var expect = require('expect');
var CopyAssetsPlugin = require('../lib/index.js');
var rm_rf = require('rimraf');
var webpack = require('webpack');
var mkdirp = require('mkdirp');

var TEMP_DIR = path.join(__dirname, '../tmp');
var OUTPUT_DIR = path.join(TEMP_DIR, '/output');
var ADDITIONAL_OUTPUT_DIR = path.join(TEMP_DIR, '/additional_output');

function fixtureFile(filename) {
  return path.join(__dirname, '/fixtures/', filename);
}

describe('Copy Asset Plugin', function () {

  it('should throw error if no paths provided', function () {
    expect(function () {
      new CopyAssetsPlugin();
    }).toThrow(/paths must defined/);
  });

  it('should throw error if paths are not in array format', function () {
    expect(function () {
      new CopyAssetsPlugin({});
    }).toThrow(/paths must be an array/);
  });

  describe('Copying files', function () {

    // before(function (done) {
    //   mkdirp.sync(OUTPUT_DIR);
    //   mkdirp.sync(ADDITIONAL_OUTPUT_DIR);
    //   done();
    // })

    beforeEach(function (done) {
      rm_rf(TEMP_DIR, function () {
        mkdirp.sync(OUTPUT_DIR);
        mkdirp.sync(ADDITIONAL_OUTPUT_DIR);
        done();
      });
    });

    it('It should copy files over', function (done) {
      var bundledFilename = 'index.bundle.js';

      var webpackConfig = {
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

      webpack(webpackConfig, function (err, stats) {
        expect(err).toNotExist;
        expect(stats.hasErrors()).toBe(false);

        // test original output exists
        expect(fs.accessSync(path.join(OUTPUT_DIR, bundledFilename), fs.F_OK)).toNotThrow;

        // test copies are made
        expect(fs.accessSync(path.join(ADDITIONAL_OUTPUT_DIR, bundledFilename), fs.F_OK)).toNotThrow;

        done();
      });

    });
  });

});
