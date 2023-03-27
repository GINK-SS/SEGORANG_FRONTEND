import { FetchPostListParams, PostListResponse } from '../../types/board';
import { BASE_URL } from '../common';

export const fetchPostList = async ({
  boardTitle,
  page,
  accessToken,
}: FetchPostListParams): Promise<PostListResponse> => {
  const response = await fetch(`${BASE_URL}/api/board/${boardTitle}?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};
