const fs = require("fs");
const path = require("path");

const root = __dirname;
const sectionsDir = path.join(root, "sections");
const templatePath = path.join(root, "index.template.html");
const outputPath = path.join(root, "index.html");

const sectionNames = [
  "hero",
  "about",
  "services",
  "experience",
  "foundation",
  "credentials",
  "contact",
];

function readFile(filePath) {
  return fs.readFileSync(filePath, "utf8").trim();
}

function buildIndex() {
  let html = readFile(templatePath);

  for (const name of sectionNames) {
    const sectionPath = path.join(sectionsDir, `${name}.html`);
    const marker = `{{${name}}}`;
    html = html.replace(marker, readFile(sectionPath));
  }

  fs.writeFileSync(outputPath, `${html}\n`, "utf8");
}

buildIndex();
