// check if the email is already exists if it is return a 400 error
import { ValidationOptions, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IsUniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(User)
    private authRepository: Repository<User>,
  ) {}

  async validate(value: any): Promise<boolean> {
    console.log('value', value);
    const user = await this.authRepository.findOne({ where: { email: value } });
    return !user;
  }
}


export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUniqueEmailValidator,
    });
  };
}
