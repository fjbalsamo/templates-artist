/* eslint no-use-before-define: 0 */  // --> OFF

type InputType =
  | 'input'
  | 'number'
  | 'checkbox'
  | 'single-select'
  | 'multi-select';

export type ValidateOptions =
  | ['required']
  | ['eq', number | string]
  | ['neq', number | string]
  | ['stw', string | number]
  | ['edw', string | number]
  | ['lt', number]
  | ['gt', number]
  | ['lte', number]
  | ['gte', number]
  | ['property', string]
  | ['inc', string | number]
  | ['ninc', string | number]
  | ['btw', number, number, 'l' | 'r' | 'lr' | undefined];

interface TemplateQuestion {
  type: InputType;
  name: string;
  message: string;
  validation?: {
    opts: ValidateOptions;
    messageError: string;
  };
}

interface TemplateArtistInput extends TemplateQuestion {
  type: 'input';
  default?: string;
}

interface TemplateArtistNumber extends TemplateQuestion {
  type: 'number';
  default?: number;
}

interface TemplateArtistCheckbox extends TemplateQuestion {
  type: 'checkbox';
  default?: boolean;
}

interface TemplateArtistSingleSelect<T> extends TemplateQuestion {
  type: 'single-select';
  default?: T;
  choices: Array<TemplateArtistChoice<T>>;
}

interface TemplateArtistMultiSelect<T> extends TemplateQuestion {
  type: 'multi-select';
  default?: Array<T>;
  choices: Array<TemplateArtistChoice<T>>;
}

interface TemplateArtistChoice<T> {
  name: string;
  value: T;
}

export type TemplateArtistQuestion =
  | TemplateArtistInput
  | TemplateArtistNumber
  | TemplateArtistCheckbox
  | TemplateArtistSingleSelect<string>
  | TemplateArtistSingleSelect<number>
  | TemplateArtistMultiSelect<string>
  | TemplateArtistMultiSelect<number>;
