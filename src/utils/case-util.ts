const anyCase = (str: string, join: string) =>
  str
    .replace(/\s+/g, ' ')
    .trim()
    .split(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/) // eslint-disable-line
    .join(join);

export function pascalCase(value: string): string {
  const str = value.replace(
    /\w+/g,
    w => w[0].toUpperCase() + w.slice(1).toLowerCase()
  );

  return anyCase(str, '');
}

export function camelCase(value: string): string {
  const str = value
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(w, i) {
      return i === 0 ? w.toLowerCase() : w.toUpperCase();
    })
    .replace(/\s+/g, '');

  return anyCase(str, '');
}

export function kebabCase(value: string): string {
  const str = value.toLowerCase();
  return anyCase(str, '-');
}

export function trainCase(value: string): string {
  return kebabCase(value);
}

export function snakeCase(value: string): string {
  const str = value.toLowerCase();
  return anyCase(str, '_');
}

export function dotCase(value: string): string {
  const str = value.toLowerCase();
  return anyCase(str, '.');
}
