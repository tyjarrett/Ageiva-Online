import { VariableId } from "./Profile";

export type GetTokenResponse = {
  token: string;
};

export type CreateUserResponse = {
  username: string;
  token: string;
};

export type resetRequestResponse = {
  email: string;
};

export type HealthDataPoint = {
  id: number;
  age: number;
  date: string;
  data: Record<VariableId, number>;
};

export type HealthData = {
  background: string;
  health_data: HealthDataPoint[];
};

export type PredictionResponse = {
  health: Record<VariableId, number>[];
  survival: number[];
};

export type PassTokenResponse = {
  passwordToken: string;
};

export type QualToQuantResponse = Record<VariableId, Record<number, number>>;
