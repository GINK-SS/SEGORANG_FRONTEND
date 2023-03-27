export interface LoginFormData {
  userId: string;
  userPw: string;
}

export interface FetchLoginParams {
  userId: string;
  userPw: string;
}

export interface LoginResponse {
  msg: string;
  description?: string;
  result?: {
    access_token: string;
  };
}
