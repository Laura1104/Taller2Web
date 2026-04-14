import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

// registerDecorator crea un decorador de validación personalizado
export function IsSlug(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isSlug',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          // Solo permite: letras minúsculas, números y guiones
          return typeof value === 'string' && /^[a-z0-9-]+$/.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must contain only lowercase letters, numbers, and hyphens`;
        },
      },
    });
  };
}