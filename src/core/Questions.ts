import fs from 'fs';
import path from 'path';
import { TemplateArtistQuestion } from '../interfaces';
import Validation from './Validation';

function checkQuestions(questions: TemplateArtistQuestion[]): never | void {
  if (questions.filter(q => q.name.trim().length === 0).length > 0)
    throw new Error('a name is missing in this questions');

  const names = questions.map(q => q.name);
  if (names.length !== new Set(names).size)
    throw new Error('a name is duplicated in this questions');

  if (names.map(n => n[0].match(/([0-9])/)).filter(e => e !== null).length > 0)
    throw new Error('a name starts with a number in this questions');

  if (questions.filter(q => q.name.includes(' ')).length > 0)
    throw new Error('a name have white spaces in this questions');
}

export default class Questions {
  public static createExampleQuestions() {
    const questions: TemplateArtistQuestion[] = [
      {
        type: 'input',
        message: 'Type your name',
        name: 'name',
        default: 'Jhon',
        validation: {
          opts: ['required'],
          messageError: 'your name must be have 3 chars minimun',
        },
      },
      {
        type: 'checkbox',
        message: 'Confirm this action',
        name: 'confirm',
        default: false,
      },
      {
        type: 'number',
        message: 'Write your age',
        name: 'yearsOld',
        default: 18,
        validation: {
          opts: ['gte', 18],
          messageError: 'your age is required',
        },
      },
      {
        type: 'single-select',
        message: 'choice a food',
        name: 'food',
        choices: [
          { name: 'pizza', value: 'pizza' },
          { name: 'spagetti', value: 'spagetti' },
        ],
        default: 'pizza',
      },
      {
        type: 'multi-select',
        name: 'cars',
        message: 'choice any cars',
        choices: [
          { name: 'camaro', value: 'camaro' },
          { name: 'mustang', value: 'mustang' },
        ],
        default: ['camaro'],
      },
      {
        type: "input",
        name: "ide",
        message: "type your IDE",
        default: "vsc",
        validation: {
          opts: ['required'],
          messageError: "dlfldfkd"
        }
      }
    ];
    Questions.generateQuestions({
      questions,
      jsonFileName: 'example-questions',
    });
  }

  public static generateQuestions({
    questions,
    jsonFileName = 'template-questions',
  }: {
    questions: TemplateArtistQuestion[];
    jsonFileName?: string;
  }) {
    checkQuestions(questions);
    const jsonContent = JSON.stringify(questions, null, 2);

    const fileName = path.join(process.cwd(), `${jsonFileName}.json`);

    fs.writeFileSync(fileName, jsonContent);
  }

  public static readQuestions(
    questionsFilePath: string
  ): never | TemplateArtistQuestion[] {
    const fileContent = fs.readFileSync(questionsFilePath, {
      encoding: 'utf-8',
    });
    const questions: TemplateArtistQuestion[] = JSON.parse(fileContent);
    checkQuestions(questions);
    return questions;
  }

  public static matchWitchAnswers({
    answers,
    questions,
  }: {
    answers: Record<string, any>;
    questions: TemplateArtistQuestion[];
  }) {
    const errors: Array<{ name: string; messageError: string }> = [];
    questions.forEach(({ name, validation, ...rest }) => {
      const value: any =
        rest.default !== undefined ? rest.default : answers[name];
      const check: boolean = Validation.validateOptions({
        value,
        opts: validation?.opts,
      });
      if (!check) {
        errors.push({
          messageError: validation?.messageError || `${name} is wrong`,
          name,
        });
      }
    });
    return errors;
  }
}
