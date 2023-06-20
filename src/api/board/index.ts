import { FetchBoardItemListParams, BoardItemListResponse } from '../../types/board';
import { BASE_URI } from '../common';

export const fetchBoardItemList = async ({
  boardTitle,
  page,
  limit,
  accessToken,
}: FetchBoardItemListParams): Promise<BoardItemListResponse> => {
  const response = await fetch(
    `${BASE_URI}/api/v1/board/${boardTitle}?page=${page}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return await response.json();
};
