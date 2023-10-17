/*
 * Project: Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 *
 * Created Date:
 * Author:
 *
 */

const unzipper = require("unzipper"),
  fs = require("fs"),
  PNG = require("pngjs").PNG,
  path = require("path");

/**
 * Description: decompress file from given pathIn, write to given pathOut
 *
 * @param {string} pathIn
 * @param {string} pathOut
 * @return {promise}
 */
const unzip = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
        .pipe(unzipper.Extract({ path: pathOut}))
        .on("close", () => {
            resolve("Extraction operation complete");
          })
        .on("error", (err) => {
            reject(err)
        });    
});
};

/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path
 *
 * @param {string} path
 * @return {promise}
 */
const readDir = (path) => {
  const fs = require("fs");
  const { readdir } = require("fs/promises");
  
  let fileList = [];
  return readdir(path).then(entries => {
      for (const entry of entries) {
        let stats = fs.statSync(path + '/' + entry);
        if (stats.isFile()) {
          fileList.push(path + '/' + entry);
        }
      }
      return fileList;
    })
    .catch(err => {
      return err;
    });
};

/**
 * Description: Read in png file by given pathIn,
 * convert to grayscale and write to given pathOut
 *
 * @param {string} filePath
 * @param {string} pathProcessed
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  const transformation = new PNG({});
  return new Promise((resolve, reject) => {
     fs.createReadStream(pathIn)
      .pipe(transformation)
      .on("parsed", function() {
          for (var y = 0; y < this.height; y++) {
              for (var x = 0; x < this.width; x++) {
                  var idx = (this.width * y + x) << 2;
                  var grayScaleValue = (this.data[idx] + this.data[idx + 1] + this.data[idx + 2]) / 3;
                  this.data[idx] = grayScaleValue;
                  this.data[idx + 1] = grayScaleValue;
                  this.data[idx + 2] = grayScaleValue;
              }
          }

          this.pack().pipe(fs.createWriteStream(pathOut + '/' + pathIn.substr(pathIn.lastIndexOf('/') + 1))
            .on("close", () => resolve())
            .on("error", (err) => reject(err)));
      })
      .on("error", err => reject(err));
    });
};

module.exports = {
  unzip,
  readDir,
  grayScale,
};
