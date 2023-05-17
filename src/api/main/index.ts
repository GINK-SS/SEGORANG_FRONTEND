import { FetchYoutubeItemListParams, YoutubeItemListResponse } from '../../types/main';
import { BASE_URL } from '../common';

export const fetchYoutubeItemList = async ({
  accessToken,
}: FetchYoutubeItemListParams): Promise<YoutubeItemListResponse> => {
  const response = await fetch(`${BASE_URL}/api/v1/youtube?page=1&limit=4`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};
