import fs from 'fs';
import path from 'path';
import { TemplateArtistQuestion, ValidateOptions } from '../interfaces';
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
        message: 'This is an input text',
        name: 'name',
        default: 'Jhon',
        validation: {
          opts: ['required'],
          messageError: 'your name must be have 3 chars minimun',
        },
        render: "text"
      },
      {
        type: 'input',
        message: 'This is a Description text',
        name: 'description',
        default: 'about me',
        validation: {
          opts: ['required'],
          messageError: 'your name must be have 3 chars minimun',
        },
        render: "textarea"
      },
      {
        type: 'checkbox',
        message: 'This is a confirmation checkbox',
        name: 'confirm',
        default: false,
      },
      {
        type: 'number',
        message: 'This is an input number',
        name: 'yearsOld',
        default: 18,
        validation: {
          opts: ['gte', 18],
          messageError: 'your age is required',
        },
      },
      {
        type: 'single-select',
        message: 'This is a single select input',
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
        message: 'This is a multiple select input',
        choices: [
          { name: 'camaro', value: 'camaro' },
          { name: 'mustang', value: 'mustang' },
        ],
        default: ['camaro'],
      },
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
      if(!answers[name]) {
        errors.push({
          messageError: `Missing answer for ${name}`,
          name,
        });
      }
      if (!check) {
        errors.push({
          messageError: validation?.messageError || `${name} is wrong`,
          name,
        });
      }
    });
    const questionNames = questions.map(q => q.name)
    Object.keys(answers).forEach(answer => {
      if(!questionNames.includes(answer)) {
        errors.push({
          messageError: `Missing question for ${answer}`,
          name: answer,
        });
      }
    })
    return errors;
  }

  public static questionsToPromts(questions: TemplateArtistQuestion[]) {
    return questions.map(q => {
      return {
        name: q.name,
        type: convertType(q.type),
        message: q.message,
        validate: valitationToFunction({ validator: q.validation }),
        default: q.default,
        choices: (q as any)?.choices,
        render: convertRender(q),
      }
    })
  }
}

function convertType(type: Pick<TemplateArtistQuestion, 'type'>['type']) {
  if (type == 'single-select')
    return 'list'
  if(type == 'multi-select')
    return 'checkbox';
  if(type == 'checkbox')
    return 'confirm';
  return type;
}

function convertRender(question: TemplateArtistQuestion) {
  if (question.type == 'single-select' || question.type == 'multi-select') {
    return 'select'
  }
  if(question.type == 'input') {
    return question.render || 'text'
  }
  return question.type;
}

function valitationToFunction({ validator }: {
  validator?: {
    opts: ValidateOptions | ['required'];
    messageError: string;
  };
} = {}): (value: any) => boolean | string {
  if (!validator) return () => true;
  const opts = validator.opts
  if (opts[0] == 'required') {
    return (name) => {
      if (name.length > 0)
        return true;
      return validator.messageError;
    };
  }
  return (_value) => true;
}
