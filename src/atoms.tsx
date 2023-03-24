import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

interface IUserInfo {
  accessToken: string;
  userId: string;
  userName: string;
  userNickname: string;
  userMajor: string;
}

interface IPostInfo {
  boardTitle: string;
  postTitle: string;
  writer: string;
  date: string;
  viewNum: number;
  likeNum: number;
  postContent: string[];
}

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export const userInfoState = atom<IUserInfo>({
  key: 'userInfo',
  default: {} as IUserInfo,
  effects_UNSTABLE: [persistAtom],
});

export const postInfoState = atom<IPostInfo>({
  key: 'postInfo',
  default: {} as IPostInfo,
});
