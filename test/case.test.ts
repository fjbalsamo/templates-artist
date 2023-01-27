import {
  camelCase,
  dotCase,
  kebabCase,
  pascalCase,
  pathCase,
  snakeCase,
  trainCase,
} from '../src/utils/case-util';

describe('Case Util', () => {
  it('camelCase', () => {
    const res = camelCase('my text');
    expect(res).toEqual('myText');
  });

  it('dot.case', () => {
    const res = dotCase('my text');
    expect(res).toEqual('my.text');
  });

  it('kebab-case', () => {
    const res = kebabCase('my text');
    expect(res).toEqual('my-text');
  });

  it('pascal-case', () => {
    const res = pascalCase('my text');
    expect(res).toEqual('MyText');
  });

  it('snake_case', () => {
    const res = snakeCase('my text');
    expect(res).toEqual('my_text');
  });

  it('train-case', () => {
    const res = trainCase('my text');
    expect(res).toEqual('my-text');
  });

  it('pathCase', () => {
    const res = pathCase('my Text');
    expect(res).toEqual('my/text');
  });
});
