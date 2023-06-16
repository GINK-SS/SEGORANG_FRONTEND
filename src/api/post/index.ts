import {
  CreatePostResponse,
  FetchCreatePostParams,
  FetchPostInfoParams,
  PostInfoResponse,
} from '../../types/post';
import { BASE_URL } from '../common';

export const fetchPostInfo = async ({
  postId,
  accessToken,
}: FetchPostInfoParams): Promise<PostInfoResponse> => {
  const response = await fetch(`${BASE_URL}/api/v1/post/${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};

export const fetchCreatePost = async ({
  postTitle,
  boardTitle,
  category = null,
  content,
  images = null,
  accessToken,
}: FetchCreatePostParams): Promise<CreatePostResponse> => {
  const response = await fetch(`${BASE_URL}/api/v1/post`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      post_title: postTitle,
      board_title: boardTitle,
      category,
      content,
      images,
    }),
  });

  return await response.json();
};
