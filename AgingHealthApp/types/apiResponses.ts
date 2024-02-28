export type GetTokenResponse = {
  token: string;
};

export type CreateUserResponse = {
  username: string;
  token: string;
};

export type HealthData = {
  background: string;
  health_data: [object];
};
