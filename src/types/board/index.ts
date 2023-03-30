export interface MainBoardItemInfo {
  category: string;
  title: string;
  commentNum: number;
  likeNum: number;
}

export interface BoardItemInfo {
  post_id: number;
  board_title: string;
  post_title: string;
  writer: string;
  type?: string;
  image?: string;
  like_num: number;
  view_num: number;
  comment_num: number;
  created_at: string;
  updated_at: string;
}

export interface FetchBoardItemListParams {
  boardTitle: string;
  page: number;
  limit: number;
  accessToken: string;
}

export interface BoardItemListResponse {
  result: {
    data: BoardItemInfo[];
    lastPage: number;
  };
}

export interface BoardURLParams {
  boardTitle: string;
}
