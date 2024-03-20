import { AxiosResponse } from "axios";
import { apiGet, apiPost } from "./apiUtils";
import {
  CreateUserResponse,
  GetTokenResponse,
  HealthData,
  PredictionResponse,
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
