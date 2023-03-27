export interface SJAuthFormData {
  studentId: string;
  studentPw: string;
}

export interface SJAuthResponse {
  result?: {
    AuthResponse: [
      boolean,
      boolean,
      number,
      string,
      { major: string; name: string },
      string
    ];
    in_db: boolean;
  };
  msg: string;
  process_time: number;
  description?: string;
}

export interface SJAuthState {
  studentId: string;
  userName: string;
  userMajor: string;
}

export interface SignUpFormData {
  userId: string;
  userPw: string;
  userPw2: string;
  userNickname: string;
}

export interface DuplicateResponse {
  process_time: number;
  msg: string;
  result: { in_db: boolean };
}

export interface FetchSignUpParams {
  studentId: string;
  userId: string;
  userPw: string;
  userName: string;
  userMajor: string;
  userNickname: string;
  isSejongAuth: boolean;
}

export interface SignUpResponse {
  msg: string;
  description?: string;
}
