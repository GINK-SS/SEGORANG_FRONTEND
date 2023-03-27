export interface MainBoardPost {
  category: string;
  title: string;
  commentNum: number;
  likeNum: number;
}

export interface Post {
  boardTitle: string;
  postCategory?: string;
  likeNum: number;
  postTitle: string;
  commentNum: number;
  writer: string;
  viewNum: number;
  date: string;
  postId: string;
}

export interface PostListResponse {
  result: {
    data: Post[];
  };
}

export interface BoardURLParams {
  boardTitle: string;
}
