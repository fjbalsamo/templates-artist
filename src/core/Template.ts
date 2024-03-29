import Handlebars from 'handlebars';
import path from 'path';
import fs from 'fs';
import File, { ReadFile } from './File';
import Helpers from './Helpers';
import { TemplateArtistQuestion } from '../interfaces';
import Questions from './Questions';

function checkAnswers({
  answers,
  readFiles,
}: {
  answers: Record<string, any>;
  readFiles: ReadFile[];
}): string[] {
  const errors: string[] = [];

  readFiles.forEach(({ filePath, source, isBin }) => {
    if(!isBin){
      try {
        const filePathCompile = Handlebars.compile(filePath, { strict: true });
        const sourceCompile = Handlebars.compile(source, { strict: true });
        filePathCompile(answers);
        sourceCompile(answers);
      } catch (error) {
        const hbsException = error as Handlebars.Exception;
        errors.push(hbsException.message);
      }
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
      readFiles.forEach(({ filePath, source, isBin }) => {
        const notCompiledFullPath = path.join(destinationApp, `./${filePath}`);

        let compiledFullPath = '';

        let content = source;
        if(!isBin) {
          const contentCompiler = Handlebars.compile(source, { strict: true });
          content = contentCompiler(answers);
        }

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

  public static test({ answers, questions, templatePath }: {
    answers: Record<string, any>;
    questions: TemplateArtistQuestion[];
    templatePath: string;
  }) {
    const results = Questions.matchWitchAnswers({
      answers,
      questions,
    })
    const readFiles = File.readFiles(templatePath);

    Helpers.init();
    const errors = checkAnswers({ answers, readFiles });

    return [...results, ...errors];
  }
}
