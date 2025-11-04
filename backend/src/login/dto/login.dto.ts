import { ApiProperty } from '@nestjs/swagger';

export class loginDTO {
  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'StrongP@ssw0rd' })
  password: string;
}

export class loginResponse {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  token: string;
}

export interface loginUseCase {
  login(data: loginDTO): Promise<loginResponse>;
}
