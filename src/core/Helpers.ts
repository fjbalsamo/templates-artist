import HBS from 'handlebars';
import {
  camelCase,
  dotCase,
  kebabCase,
  pascalCase,
  snakeCase,
  trainCase,
} from '../utils/case-util';
import Validation from './Validation';

export default class Helpers {
  public static init() {
    HBS.registerHelper('camelCase', function(value: string) {
      return camelCase(value);
    });
    HBS.registerHelper('dotCase', function(value: string) {
      return dotCase(value);
    });

    HBS.registerHelper('kebabCase', function(value: string) {
      return kebabCase(value);
    });

    HBS.registerHelper('pascalCase', function(value: string) {
      return pascalCase(value);
    });

    HBS.registerHelper('snakeCase', function(value: string) {
      return snakeCase(value);
    });

    HBS.registerHelper('trainCase', function(value: string) {
      return trainCase(value);
    });

    HBS.registerHelper('upperCamelCase', function(value: string) {
      return pascalCase(value);
    });

    HBS.registerHelper('upperCase', function(value: string) {
      return value.toUpperCase();
    });

    HBS.registerHelper('lowerCase', function(value: string) {
      return value.toLowerCase();
    });

    HBS.registerHelper('eq', function(v: any, c: any) {
      return Validation.checkEquals(v, c);
    });

    HBS.registerHelper('neq', function(v: any, c: any) {
      return !Validation.checkEquals(v, c);
    });

    HBS.registerHelper('gt', function(v: any, c: any) {
      return Validation.checkGreaterThan(v, c);
    });

    HBS.registerHelper('gte', function(v: any, c: any) {
      return Validation.checkGreaterThanOrEqual(v, c);
    });

    HBS.registerHelper('lt', function(v: any, c: any) {
      return Validation.checkLessThan(v, c);
    });

    HBS.registerHelper('lte', function(v: any, c: any) {
      return Validation.checkLessThanOrEqual(v, c);
    });

    HBS.registerHelper('inc', function(v: any, c: any) {
      return Validation.checkIsIncluded(v, c);
    });

    HBS.registerHelper('ninc', function(v: any, c: any) {
      return !Validation.checkIsIncluded(v, c);
    });

    HBS.registerHelper('pkg', function(value: string) {
      return value;
    });
  }
}
