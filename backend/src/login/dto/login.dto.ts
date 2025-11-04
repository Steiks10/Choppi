export interface loginDTO {
  email: string;
  password: string;
}

export interface loginResponse {
  token: string;
}

export interface loginUseCase {
  login(data: loginDTO): Promise<loginResponse>;
}
