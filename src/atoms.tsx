import { atom } from 'recoil';

interface IUserInfo {
  accessToken: string;
  userName: string;
  userNickname: string;
  userMajor: string;
}

export const userInfoState = atom<IUserInfo>({
  key: 'userInfo',
  default: {
    accessToken: '',
    userName: '',
    userNickname: '',
    userMajor: '',
  },
});
