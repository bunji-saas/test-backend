import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isDateAfter', async: false })
export class IsDateAfterConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  validate(value: Date | unknown, args: ValidationArguments) {
    if (!value) return true; // If value is not provided, skip validation (handled by @IsOptional)
    const [relatedPropertyName] = args.constraints as [string];
    const relatedValue = (args.object as { [relatedPropertyName]: Date | string })[
      relatedPropertyName
    ];
    if (!(value instanceof Date)) return false;
    if (!(relatedValue instanceof Date)) return false;

    return value.getTime() > relatedValue.getTime();
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints as [string];
    const propertyName = args.property;
    return `${propertyName} must be after ${relatedPropertyName}`;
  }
}

export function IsDateAfter(property: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsDateAfterConstraint,
    });
  };
}
