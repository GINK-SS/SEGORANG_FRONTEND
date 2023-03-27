export interface UserInfoResponse {
  msg: string;
  result: {
    id: string;
    name: string;
    nickname: string;
    major: string;
  };
}
