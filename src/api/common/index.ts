import { UserInfoResponse } from '../../types/common';

export const BASE_URL = `http://scof.link:7000`;

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
