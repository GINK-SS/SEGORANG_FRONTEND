import { UserInfoResponse } from '../../types/common';

export const BASE_URI = process.env.REACT_APP_BASE_URI;

export const fetchUserInfo = async (accessToken: string): Promise<UserInfoResponse> => {
  const response = await fetch(`${BASE_URI}/api/v1/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};
