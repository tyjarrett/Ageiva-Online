import { AxiosResponse } from "axios";
import { apiGet, apiPost } from "./apiUtils";

export function getUserGivenToken(token: string): Promise<AxiosResponse<User>> {
  return apiGet("users/me/", token);
}

export function getToken(
  username: string,
  password: string
): Promise<AxiosResponse<GetTokenResponse>> {
  return apiPost("users/token/", {
    username: username,
    password: password,
  });
}

export function createUser(
  username: string,
  password: string
): Promise<AxiosResponse<CreateUserResponse>> {
  return apiPost("users/", { username, password });
}
