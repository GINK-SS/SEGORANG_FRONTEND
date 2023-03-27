import { PostListResponse } from '../../types/board';
import { BASE_URL } from '../common';

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
