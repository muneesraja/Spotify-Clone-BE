// create a dto for the error response
// this is used to return a error response to the client
import { ApiProperty } from '@nestjs/swagger';

// this is the error response dto
// it is used to return a error response to the client
// it is used in the auth controller
export class ErrorResponseDto {
  @ApiProperty({ description: 'The error message' })
  message: string;

  @ApiProperty({ description: 'The error status code' })
  statusCode: number;

  @ApiProperty({ description: 'The error timestamp' })
  timestamp: string;
}