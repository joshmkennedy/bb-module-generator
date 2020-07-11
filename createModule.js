const fs = require("fs");
const { createBBModuleContent } = require("./generateModulePHP");

async function createModule(data) {
  const { moduleSlug, moduleName } = data;
  //create moduleDir
  await mkDirAsync(`${moduleSlug}`);
  //create includes Dir
  await mkDirAsync(`${moduleSlug}/includes`);
  //create frontend.php
  writeFileAsync(
    `${moduleSlug}/includes/frontend.php`,
    `<?php ?>
    <h1>${moduleName}</h1>`
  );
  //create css Dir
  await mkDirAsync(`${moduleSlug}/css`);
  //create index.css
  writeFileAsync(`${moduleSlug}/css/index.css`, `/* ${moduleName}'s css */`);
  //create js Dir
  await mkDirAsync(`${moduleSlug}/js`);
  //create index.js
  await writeFileAsync(`${moduleSlug}/js/index.js`, `/* ${moduleName}'s js */`);
  //create module.php
  await createModulePHP(data);
}

async function createModulePHP(data) {
  const { moduleSlug } = data;
  const moduleContent = await createBBModuleContent(data);
  writeFileAsync(`${moduleSlug}/${moduleSlug}.php`, moduleContent);
}

async function writeFileAsync(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`./mods/${path}`, data, "utf8", (e, data) => {
      if (e) {
        reject(e);
      } else {
        resolve(data);
      }
    });
  });
}
async function mkDirAsync(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(`./mods/${path}`, (e) => {
      if (e) {
        reject(e);
      } else {
        resolve();
      }
    });
  });
}

module.exports = { createModule };
