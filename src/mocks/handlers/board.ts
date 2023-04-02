import { rest, RestRequest } from 'msw';
import { BASE_URL } from '../../api/common';
import { getBulletinBoardData, getHotBoardData } from '../mockData';

const getBoardItemList = (boardTitle: string, page: number, limit: number) => {
  if (boardTitle === 'hot') return getHotBoardData(page, limit);
  if (boardTitle === 'bulletin') return getBulletinBoardData(page, limit);

  return { data: [], lastPage: 0 };
};

export const boardHandlers = [
  // 게시판 글 목록 가져오기
  rest.get(
    `${BASE_URL}/api/v1/board/:boardTitle`,
    (req: RestRequest<{}, { boardTitle: string }>, res, ctx) => {
      const { boardTitle } = req.params;
      const page = req.url.searchParams.get('page');
      const limit = req.url.searchParams.get('limit');

      return res(
        ctx.json({
          result: {
            data: getBoardItemList(boardTitle, Number(page), Number(limit)).data,
            lastPage: getBoardItemList(boardTitle, Number(page), Number(limit)).lastPage,
          },
        })
      );
    }
  ),
];
