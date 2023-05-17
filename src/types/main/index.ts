export interface YoutubeItemInfo {
  link: string;
  thumb_nail: string;
  title: string;
}

export interface FetchYoutubeItemListParams {
  accessToken: string;
}

export interface YoutubeItemListResponse {
  msg: string;
  result: {
    link: string;
    thumb_nail: string;
    title: string;
  }[];
}
