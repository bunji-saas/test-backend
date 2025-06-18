import { TransformationType } from 'class-transformer';
import _ from 'lodash';

function toDate(value: string): Date {
  return new Date(value);
}

function toString(value: Date): string {
  return JSON.stringify(value);
}

export function transformDate({
  value,
  type,
}: {
  value: Date | string;
  type: TransformationType;
}): Date | string {
  if (_.isNil(value)) return value;
  switch (type) {
    case TransformationType.PLAIN_TO_CLASS:
    case TransformationType.CLASS_TO_CLASS:
      return toDate(value as string);
    case TransformationType.CLASS_TO_PLAIN:
      return toString(value as Date);
    default:
      throw new Error(`unknown-transformation-type : ${type as TransformationType}`);
  }
}
