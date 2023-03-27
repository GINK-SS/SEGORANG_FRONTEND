import { FetchPostInfoParams, PostInfoResponse } from '../../types/post';
import { BASE_URL } from '../common';

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
