export interface FetchPostInfoParams {
  postId: string;
  accessToken: string;
}

export interface PostInfoResponse {
  msg: string;
  description?: string;
  result: PostInfo;
}

export interface PostInfo {
  board_title: string;
  post_title: string;
  writer: string;
  content: string;
  category?: string | null;
  images?: string | null;
  view_num: number;
  like_num: number;
  updated_at: string;
  created_at: string;
}

export interface PostURLParams {
  boardTitle: string;
  postId: string;
}

export interface BoardTitleList {
  [key: string]: string;
}

export interface FetchCreatePostParams {
  postTitle: string;
  boardTitle: string;
  category?: string | null;
  content: string;
  images?: string | null;
  accessToken: string;
}

export interface CreatePostResponse {
  msg: string;
  description?: string;
  post_id?: number;
}
