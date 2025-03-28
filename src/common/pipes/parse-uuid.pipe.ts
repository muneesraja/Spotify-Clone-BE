import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ParseUUIDPipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (!isUUID(value, 4)) {
      throw new BadRequestException(`Invalid ID format: ${value} is not a valid UUID`);
    }
    return value;
  }
} 