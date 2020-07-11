const fs = require("fs");

async function cleanUp(moduleName) {
  removeDirAsync(`./modules/${moduleName}`);
  deleteFileAsync(`${moduleName}.zip`);
}
async function deleteFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(`./${path}`, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}
async function removeDirAsync(path) {
  return new Promise((resolve, reject) => {
    fs.rmdir(path, { recursive: true }, (e, data) => {
      if (e) {
        reject(e);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = { cleanUp };
