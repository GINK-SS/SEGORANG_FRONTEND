import {
  CreatePostResponse,
  FetchCreatePostParams,
  FetchDeletePostParams,
  FetchModifyPostParams,
  FetchPostInfoParams,
  PostInfoResponse,
} from '../../types/post';
import { BASE_URI } from '../common';

export const fetchPostInfo = async ({
  postId,
  accessToken,
}: FetchPostInfoParams): Promise<PostInfoResponse> => {
  const response = await fetch(`${BASE_URI}/api/v1/post/${postId}`, {
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
  const response = await fetch(`${BASE_URI}/api/v1/post`, {
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

export const fetchModifyPost = async ({
  postId,
  title,
  category = null,
  content,
  images = null,
  accessToken,
}: FetchModifyPostParams) => {
  const response = await fetch(`${BASE_URI}/api/v1/post/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title,
      category,
      content,
      images,
    }),
  });

  return await response.json();
};

export const fetchDeletePost = async ({ postId, accessToken }: FetchDeletePostParams) => {
  const response = await fetch(`${BASE_URI}/api/v1/post/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.ok;
};
