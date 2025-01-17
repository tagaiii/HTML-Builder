const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');
fs.readdir(folderPath, (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);
    fs.stat(filePath, (err, stats) => {
      if (err) throw err;
      if (stats.isFile()) {
        const fileName = path.basename(file, path.extname(file));
        const ext = path.extname(file);
        console.log(
          `${fileName} - ${ext.replace('.', '')} - ${stats.size} bytes`,
        );
      }
    });
  });
});
