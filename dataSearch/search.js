const fs = require("fs");

const files = getFilesRecursively(`${process.cwd()}/dataSearch/data`).sort();
files.forEach(file => {
  const content = fs.readFileSync(file).toString();
  const match = content.match(/desiredProp: "(.*)",/);
  if (match) {
    console.log(match[1]);
  }
});

function getFilesRecursively(path, result = []) {
  const content = fs.readdirSync(path);
  content.forEach(entry => {
    const entryPath = `${path}/${entry}`;
    if (fs.statSync(entryPath).isDirectory()) {
      getFilesRecursively(entryPath, result);
    } else {
      result.push(entryPath);
    }
  });
  return result;
}
