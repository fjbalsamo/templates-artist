import { TemplateArtistValidation } from '../src/core';

describe('Validation Test', () => {
  it('checkEndsWith', () => {
    const check = TemplateArtistValidation.checkEndsWith('my value', 'value');
    expect(check).toEqual(true);
  });

  it('checkEquals', () => {
    const check = TemplateArtistValidation.checkEquals('value', 'value');
    expect(check).toEqual(true);
  });

  it('checkGreaterThan', () => {
    const check = TemplateArtistValidation.checkGreaterThan(1, 2);
    expect(check).toEqual(false);
  });

  it('checkGreaterThanOrEqual', () => {
    const check = TemplateArtistValidation.checkGreaterThanOrEqual(1, 2);
    expect(check).toEqual(false);
  });

  it('checkIsBetween', () => {
    const check = TemplateArtistValidation.checkIsBetween(2, 1, 3);
    expect(check).toEqual(true);
  });

  it('checkIsIncluded', () => {
    const check = TemplateArtistValidation.checkIsIncluded(
      ['one', 'two'],
      'two'
    );
    expect(check).toEqual(true);
  });
});
