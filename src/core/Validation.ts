import { ValidateOptions } from '../interfaces';

export default class Validation {
  public static checkRequired(value: any): boolean {
    return String(value).trim().length > 0;
  }

  public static checkEquals(value: any, compare: any): boolean {
    return String(value) === String(compare);
  }

  public static checkLessThan(value: any, compare: any): boolean {
    return String(value) < String(compare);
  }

  public static checkLessThanOrEqual(value: any, compare: any): boolean {
    return String(value) <= String(compare);
  }

  public static checkGreaterThan(value: any, compare: any): boolean {
    return String(value) > String(compare);
  }

  public static checkGreaterThanOrEqual(value: any, compare: any): boolean {
    return String(value) >= String(compare);
  }

  public static checkProperty(value: any, property: any): boolean {
    if (typeof value !== 'object') return false;
    if (typeof property !== 'string') return false;
    return property in value;
  }

  public static checkIsIncluded(value: any, include: any): boolean {
    if (Array.isArray(value)) {
      return [...value].includes(include);
    } else {
      return String(value).includes(String(include));
    }
  }

  public static checkIsBetween(
    value: any,
    left: any,
    right: any,
    include: 'l' | 'r' | 'lr' | 'none'
  ): boolean {
    switch (include) {
      case 'l':
        return String(value) >= String(left) && String(value) < String(right);
      case 'lr':
        return String(value) >= String(left) && String(value) <= String(right);
      case 'r':
        return String(value) > String(left) && String(value) <= String(right);
      default:
        return String(value) > String(left) && String(value) < String(right);
    }
  }

  public static checkStartsWith(value: any, startsWith: any): boolean {
    return String(value).startsWith(String(startsWith));
  }

  public static checkEndsWith(value: any, endsWith: any): boolean {
    return String(value).endsWith(String(endsWith));
  }

  public static validateOptions({
    value,
    opts,
  }: {
    value: string | number;
    opts?: ValidateOptions;
  }): boolean {
    if (opts === undefined) return true;
    if (opts !== undefined && value === undefined) return false;
    const [key, first, second, third] = opts;

    switch (key) {
      case 'btw':
        return Validation.checkIsBetween(
          value,
          first,
          second,
          third === undefined ? 'none' : third
        );
      case 'edw':
        return Validation.checkEndsWith(value, first);
      case 'eq':
        return Validation.checkEquals(value, first);
      case 'gt':
        return Validation.checkGreaterThan(value, first);
      case 'gte':
        return Validation.checkGreaterThanOrEqual(value, first);
      case 'inc':
        return Validation.checkIsIncluded(value, first);
      case 'lt':
        return Validation.checkLessThan(value, first);
      case 'lte':
        return Validation.checkLessThanOrEqual(value, first);
      case 'neq':
        return !Validation.checkEquals(value, first);
      case 'ninc':
        return !Validation.checkIsIncluded(value, first);
      case 'property':
        return Validation.checkProperty(value, first);
      case 'required':
        return Validation.checkRequired(value);
      case 'stw':
        return Validation.checkStartsWith(value, first);
    }
  }
}
