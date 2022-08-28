export interface Environment {
  production: boolean;
  apiKey: string;
  fbDbUrl: string;
}

export interface FbCreateResponse {
  name?: string;
}
