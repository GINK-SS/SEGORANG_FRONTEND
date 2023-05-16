export interface UserInfo {
  accessToken: string;
  userId: string;
  userName: string;
  userNickname: string;
  userMajor: string;
}

export interface UserInfoResponse {
  msg: string;
  result: {
    id: string;
    name: string;
    nickname: string;
    major: string;
  };
}

export interface UrlParams {
  boardTitle: string;
}

export interface BoardTitleToKR {
  [key: string]: string;
}
