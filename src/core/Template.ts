import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import File from './File';
import Helpers from './Helpers';

function checkAnswers({
  answers,
  readFiles,
}: {
  answers: Record<string, any>;
  readFiles: Array<{ source: string; filePath: string }>;
}): string[] {
  const errors: string[] = [];

  readFiles.forEach(({ filePath, source }) => {
    try {
      const filePathCompile = Handlebars.compile(filePath, { strict: true });
      const sourceCompile = Handlebars.compile(source, { strict: true });
      filePathCompile(answers);
      sourceCompile(answers);
    } catch (error) {
      const hbsException = error as Handlebars.Exception;
      errors.push(hbsException.message);
    }
  });
  return errors;
}

export default class Template {
  public static createApp({
    answers,
    destinationApp,
    templatePath,
  }: {
    templatePath: string;
    destinationApp: string;
    answers: Record<string, any>;
  }): { statusCode: number; errors: string[] } {
    Helpers.init();
    const readFiles = File.readFiles(templatePath);

    const errors = checkAnswers({ answers, readFiles });

    if (errors.length > 0) {
      return { statusCode: 400, errors };
    } else {
      readFiles.forEach(({ filePath, source }) => {
        const notCompiledFullPath = path.join(destinationApp, `./${filePath}`);

        let compiledFullPath = '';

        const contentCompiler = Handlebars.compile(source, { strict: true });
        const content = contentCompiler(answers);

        if (notCompiledFullPath.includes('{{')) {
          const pathCompiler = Handlebars.compile(notCompiledFullPath);
          compiledFullPath = pathCompiler(answers);
        } else {
          compiledFullPath = notCompiledFullPath;
        }
        const dirName = path.dirname(compiledFullPath);
        if (!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName, { recursive: true });
        }
        fs.writeFileSync(compiledFullPath, content, { encoding: 'utf-8' });
      });
      return { statusCode: 200, errors: [] };
    }
  }
}
