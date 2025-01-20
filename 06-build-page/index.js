const fs = require('fs');
const path = require('path');
const fsPromises = require('fs/promises');

(async () => {
  const distPath = path.join(__dirname, 'project-dist');
  await fsPromises.mkdir(distPath, { recursive: true });

  let templateContent = await fsPromises.readFile(
    path.join(__dirname, 'template.html'),
    'utf8',
  );
  const components = await fsPromises.readdir(
    path.join(__dirname, 'components'),
  );
  for (const file of components) {
    const filePath = path.join(__dirname, 'components', file);
    const fileContent = await fsPromises.readFile(filePath, 'utf8');
    const componentName = path.basename(filePath, '.html');
    templateContent = templateContent.replace(
      `{{${componentName}}}`,
      fileContent,
    );
  }
  await fsPromises.writeFile(
    path.join(distPath, 'index.html'),
    templateContent,
  );

  const stylesOutput = fs.createWriteStream(path.join(distPath, 'style.css'));
  const stylesPath = path.join(__dirname, 'styles');
  const styleFiles = await fsPromises.readdir(stylesPath);
  for (const file of styleFiles) {
    const filePath = path.join(stylesPath, file);
    const fileContent = await fsPromises.readFile(filePath);
    const ext = path.extname(file);
    if (ext === '.css') {
      stylesOutput.write(fileContent);
    }
  }
  try {
    await fsPromises.access(path.join(distPath, 'assets'));
    await fsPromises.rm(path.join(distPath, 'assets'), { recursive: true });
  } catch (err) {
    console.log(err);
  }
  await fsPromises.mkdir(path.join(distPath, 'assets'), { recursive: true });

  const copyFiles = async (src, dest) => {
    const items = await fsPromises.readdir(src);
    for (const item of items) {
      const itemPath = path.join(src, item);
      const stats = await fsPromises.stat(itemPath);
      if (stats.isFile()) {
        await fsPromises.copyFile(itemPath, path.join(dest, item));
      } else if (stats.isDirectory()) {
        await fsPromises.mkdir(path.join(dest, item), { recursive: true });
        await copyFiles(itemPath, path.join(dest, item));
      }
    }
  };
  await copyFiles(
    path.join(__dirname, 'assets'),
    path.join(distPath, 'assets'),
  );
})();
