import { PostListResponse } from './types/board';
import { UserInfoResponse } from './types/common';
import { FetchLoginParams, LoginResponse } from './types/login';
import { FetchPostInfoParams, PostInfoResponse } from './types/post';
import {
  DuplicateResponse,
  FetchSignUpParams,
  SignUpResponse,
  SJAuthResponse,
} from './types/signUp';

const BASE_URL = `http://scof.link:7000`;

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

export const fetchLogin = async ({
  userId,
  userPw,
}: FetchLoginParams): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URL}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: userId,
      pw: userPw,
    }),
  });

  return await response.json();
};

export const fetchUserInfo = async (accessToken: string): Promise<UserInfoResponse> => {
  const response = await fetch(`${BASE_URL}/api/v1/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};

// MOCK
export const fetchPostList = async (
  boardTitle: string,
  accessToken: string
): Promise<PostListResponse> => {
  const response = await fetch(`${BASE_URL}/api/board/${boardTitle}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};

export const fetchPostInfo = async ({
  boardTitle,
  postId,
  accessToken,
}: FetchPostInfoParams): Promise<PostInfoResponse> => {
  const response = await fetch(`${BASE_URL}/api/board/${boardTitle}/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};
