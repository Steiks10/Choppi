import { loginDTO, loginResponse } from '../dto/login.dto';

export abstract class LoginRepository {
  abstract login(data: loginDTO): Promise<loginResponse>
}

