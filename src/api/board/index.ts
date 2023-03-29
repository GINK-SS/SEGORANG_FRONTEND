import { FetchPostListParams, PostListResponse } from '../../types/board';
import { BASE_URL } from '../common';

export const fetchPostList = async ({
  boardTitle,
  page,
  limit,
  accessToken,
}: FetchPostListParams): Promise<PostListResponse> => {
  const response = await fetch(
    `${BASE_URL}/api/v1/board/${boardTitle}?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return await response.json();
};
