const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

(async () => {
  const srcPath = path.join(__dirname, 'styles');
  const distPath = path.join(__dirname, 'project-dist/bundle.css');
  const writeStream = fs.createWriteStream(distPath);

  const styleFiles = await fsPromises.readdir(srcPath);
  for (const file of styleFiles) {
    const filePath = path.join(srcPath, file);
    const fileContent = await fsPromises.readFile(filePath);
    const ext = path.extname(file);
    if (ext === '.css') {
      writeStream.write(fileContent);
    }
  }
})();
