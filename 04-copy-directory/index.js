const fs = require('fs/promises');
const path = require('path');

const copyDir = async () => {
  const newDirPath = path.join(__dirname, 'files-copy');
  const copyingDirPath = path.join(__dirname, 'files');

  await fs.mkdir(newDirPath, { recursive: true });

  const existingFiles = await fs.readdir(newDirPath);
  for (const file of existingFiles) {
    const filePath = path.join(newDirPath, file);
    await fs.unlink(filePath);
  }

  const filesToCopy = await fs.readdir(copyingDirPath);
  for (const file of filesToCopy) {
    const srcPath = path.join(copyingDirPath, file);
    const destPath = path.join(newDirPath, file);
    await fs.copyFile(srcPath, destPath);
  }
  return `Copied to ${newDirPath}`;
};
copyDir().then((r) => console.log(r));
