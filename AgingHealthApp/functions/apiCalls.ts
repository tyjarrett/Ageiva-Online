import { Axios, AxiosResponse } from "axios";
import { apiGet, apiPost } from "./apiUtils";
import {
  CreateUserResponse,
  GetTokenResponse,
  HealthData,
  PredictionResponse,
  QualToQuantResponse,
  PassTokenResponse,
  resetRequestResponse,
  resetPassTokenResponse,
  resetPassResponse,
} from "../types/apiResponses";
import { PResponse, VariableId } from "../types/Profile";

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

export function createDataPoint(
  record: Record<VariableId, PResponse>,
  token: string
): Promise<AxiosResponse<string>> {
  return apiPost("healthmodel/", record, token);
}

export function getHealthData(
  token: string
): Promise<AxiosResponse<HealthData>> {
  return apiGet("healthmodel/", token);
}

export function makePrediction(
  token: string
): Promise<AxiosResponse<PredictionResponse>> {
  return apiGet("healthmodel/predict/", token);
}

export function getQualToQuant(
  token: string
): Promise<AxiosResponse<QualToQuantResponse>> {
  return apiGet("healthmodel/q2q/", token);
}

export function resetRequest(
  email: string
): Promise<AxiosResponse<resetRequestResponse>> {
  return apiPost("users/resetrequest/" + email + "/", {});
}

export function resetPassToken(
  passToken: string
): Promise<AxiosResponse<resetPassTokenResponse>> {
  return apiPost("users/resettoken/" + passToken + "/", {});
}

export function resetPass(
  passToken: string,
  new_password: string,
  confirm_password: string
): Promise<AxiosResponse<resetPassResponse>> {
  return apiPost("users/reset/" + passToken + "/", {
    new_password,
    confirm_password,
  });
}

export function requestPassToken(
  email: string
): Promise<AxiosResponse<PassTokenResponse>> {
  return apiPost("password_reset/", { email });
}
