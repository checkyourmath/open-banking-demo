import { BadRequestException, ValidationError } from '@nestjs/common';

export class ValidationHelper {

  public static validationExceptionFactory(errors: ValidationError[]): BadRequestException {
    const result = errors.map((error) => ({
      property: error.property,
      message: error.constraints && error.constraints[Object.keys(error.constraints)[0]],
    }));

    return new BadRequestException(result);
  }

}
