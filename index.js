const express = require("express");
const { createModule } = require("./createModule");
const { zipModule } = require("./zipModule.js");
const { cleanUp } = require("./cleanup");

const app = express();
const port = 3000;

const settingsData = [
  {
    tabSlug: "general",
    tabTitle: "General",
    sections: [
      {
        sectionSlug: "headline",
        sectionTitle: "Headline",
        fields: [
          {
            fieldSlug: "headline_text",
            fieldLabel: "Headline Text",
            fieldType: "Text",
            fieldTypeSettings: { fieldsTextDefaultValue: "this is a test" },
            fieldPreviewSettings: { fieldClassSelector: "heading" },
          },
          {
            fieldSlug: "description_text",
            fieldLabel: "description",
            fieldType: "Text",
            fieldTypeSettings: { fieldsTextDefaultValue: "this is a test" },
            fieldPreviewSettings: { fieldClassSelector: "description" },
          },
        ],
      },
      {
        sectionSlug: "headline_two",
        sectionTitle: "Headline Two",
        fields: [
          {
            fieldSlug: "headline_two_text",
            fieldLabel: "Headline Text",
            fieldType: "Text",
            fieldTypeSettings: { fieldsTextDefaultValue: "this is a test" },
            fieldPreviewSettings: { fieldClassSelector: "heading-2" },
          },
          {
            fieldSlug: "description_text_two",
            fieldLabel: "description",
            fieldType: "Textarea",
            fieldTypeSettings: {
              fieldsTextareaDefaultValue: "this is a test",
              fieldsNumberOfRows: 6,
            },
            fieldPreviewSettings: { fieldClassSelector: "description-2" },
          },
        ],
      },
    ],
  },
];
const moduleInfo = {
  moduleClassName: "TestModule",
  moduleName: "Test Module",
  moduleDescription: "This is a generative Module made by me",
  moduleCategory: "testing",
  moduleSlug: "test-module",
  CONST_plugin: "TEST_PLUGIN",
  settingsData,
};

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/make-module", async (req, res, next) => {
  await createModule(moduleInfo);
  //package module
  await zipModule(moduleInfo.moduleSlug);
  //send it
  await sendFile(res, next, moduleInfo.moduleSlug);
  //clean up
  cleanUp(moduleInfo.moduleSlug);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

function sendFile(res, next, fileName) {
  var options = {
    root: __dirname,
    dotfiles: "deny",
    headers: {
      "x-timestamp": Date.now(),
      "x-sent": true,
    },
  };
  const moduleZip = `${fileName}.zip`;
  return new Promise((resolve, reject) => {
    res.sendFile(moduleZip, options, function (err) {
      if (err) {
        next(err);
        reject(err);
      } else {
        console.log("Sent:", fileName);
        resolve();
      }
    });
  });
}
