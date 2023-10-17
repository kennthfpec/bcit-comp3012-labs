const path = require("path");
/*
 * Project: Milestone 1
 * File Name: main.js
 * Description:
 *
 * Created Date: 10/16/2023
 * Author: Kenneth Fong
 *
 */

const IOhandler = require("./IOhandler");
const zipFilePath = path.join(__dirname, "myfile.zip");
const pathUnzipped = path.join(__dirname, "unzipped");
const pathProcessed = path.join(__dirname, "grayscaled");
const { pipeline } = require("stream");

IOhandler.unzip(zipFilePath, pathUnzipped)
  .then((result) => {
    console.log(result);
    IOhandler.readDir(pathUnzipped)
      .then(files => {
        let grayScalePromises = [];
        files.forEach(file => {
          grayScalePromises.push(IOhandler.grayScale(file, pathProcessed));            
        });

        return Promise.all(grayScalePromises)
          .then(() => {
            console.log("All files have been grayscaled successfully!");
          });
        }
      )
  })
  .catch(err => {
    console.log(err);
  });
