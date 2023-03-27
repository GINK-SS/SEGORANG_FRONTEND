import {
  DuplicateResponse,
  FetchSignUpParams,
  SignUpResponse,
  SJAuthResponse,
} from '../../types/signUp';
import { BASE_URL } from '../common';

export const fetchSJAuth = async (
  studentId: string,
  studentPw: string
): Promise<SJAuthResponse> => {
  const response = await fetch(`${BASE_URL}/api/auth/sejong`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sj_id: studentId,
      sj_pw: studentPw,
    }),
  });

  return await response.json();
};

export const fetchSignUp = async ({
  studentId,
  userId,
  userPw,
  userName,
  userMajor,
  userNickname,
  isSejongAuth,
}: FetchSignUpParams): Promise<SignUpResponse> => {
  const response = await fetch(`${BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sj_id: studentId,
      id: userId,
      pw: userPw,
      name: userName,
      major: userMajor,
      nickname: userNickname,
      sejong_auth: isSejongAuth,
    }),
  });

  return await response.json();
};

export const fetchDuplicateId = async (userId: string): Promise<DuplicateResponse> => {
  const response = await fetch(`${BASE_URL}/api/auth/id`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: userId,
    }),
  });

  return await response.json();
};

export const fetchDuplicateNickname = async (
  userNickname: string
): Promise<DuplicateResponse> => {
  const response = await fetch(`${BASE_URL}/api/auth/nickname`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nickname: userNickname,
    }),
  });

  return await response.json();
};
