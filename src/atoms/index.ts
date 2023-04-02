import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { UserInfo } from '../types/common';

const { persistAtom } = recoilPersist({
  storage: sessionStorage,
});

export const userInfoState = atom<UserInfo>({
  key: 'userInfo',
  default: {} as UserInfo,
  effects_UNSTABLE: [persistAtom],
});
