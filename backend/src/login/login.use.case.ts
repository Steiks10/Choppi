import { loginResponse, loginDTO } from './dto/login.dto';

export interface loginUseCase {
  login(data: loginDTO): Promise<loginResponse>;
}
