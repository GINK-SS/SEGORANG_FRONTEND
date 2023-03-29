import { FetchPostInfoParams, PostInfoResponse } from '../../types/post';
import { BASE_URL } from '../common';

export const fetchPostInfo = async ({
  postId,
  accessToken,
}: FetchPostInfoParams): Promise<PostInfoResponse> => {
  const response = await fetch(`${BASE_URL}/api/v1/board?post_id=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};
