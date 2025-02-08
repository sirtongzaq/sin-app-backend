export function isNullOrUndefined(value: unknown): value is null | undefined {
    return value === null || typeof value === 'undefined';
}

export function isEmptyList(value: unknown[]) {
  return value.length < 1;
}

export const isEmpty = (object: any) => {
  return Object.keys(object).length < 1;
};

export const isEmptyObject = (object: any): boolean => {
  return Object.keys(object).length <= 0;
};

export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}

export function isObject(value: unknown): value is Record<string, any> | NonNullable<unknown> {
  return typeof value === 'object' && !Array.isArray(value) && value !== null;
}

export function isExistsArrayItem(value: unknown[], item: unknown) {
  return value.some((val) => val === item);
}