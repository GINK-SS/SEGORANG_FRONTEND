export interface FetchPostInfoParams {
  boardTitle: string;
  postId: string;
  accessToken: string;
}

export interface PostInfoResponse {
  boardTitle: string;
  postTitle: string;
  writer: string;
  date: string;
  viewNum: number;
  likeNum: number;
  content: string[];
}

export interface PostURLParams {
  boardTitle: string;
  postId: string;
}

export interface BoardTitleList {
  [key: string]: string;
}
