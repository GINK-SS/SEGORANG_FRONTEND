import { FetchLoginParams, LoginResponse } from '../../types/login';
import { BASE_URI } from '../common';

export const fetchLogin = async ({
  userId,
  userPw,
}: FetchLoginParams): Promise<LoginResponse> => {
  const response = await fetch(`${BASE_URI}/api/auth/signin`, {
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
