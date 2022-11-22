import fs from 'fs';

function getFiles({
  path,
  files = [],
}: {
  path: string;
  files?: string[];
}): string[] {
  fs.readdirSync(path).forEach(item => {
    const childPath = `${path}/${item}`;
    if (fs.lstatSync(childPath).isDirectory()) {
      getFiles({ path: childPath, files });
    } else {
      files.push(childPath);
    }
  });
  return files;
}

export default class File {
  /**
   * Read template source
   * @param templatePath directory path where is template soruces
   * @returns
   */
  public static readFiles(
    templatePath: string
  ): Array<{ source: string; filePath: string }> {
    const files: string[] = getFiles({ path: templatePath });
    return files.map(file => {
      const source = fs.readFileSync(file, { encoding: 'utf-8' });
      const filePath = file.replace(templatePath, '').replace('.hbs', '');

      return {
        source,
        filePath,
      };
    });
  }
}
