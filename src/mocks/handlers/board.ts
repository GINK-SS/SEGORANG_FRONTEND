import { rest, RestRequest } from 'msw';
import { BASE_URL } from '../../api/common';
import { getBulletinBoardData, getHotBoardData } from '../mockData';

const getPostList = (boardTitle: string, page: number) => {
  if (boardTitle === 'hot') return getHotBoardData(page);
  if (boardTitle === 'bulletin') return getBulletinBoardData(page);

  return [];
};

export const boardHandlers = [
  // 게시판 글 목록 가져오기
  rest.get(
    `${BASE_URL}/api/board/:boardTitle`,
    (req: RestRequest<{}, { boardTitle: string }>, res, ctx) => {
      const { boardTitle } = req.params;
      const page = req.url.searchParams.get('page');

      return res(ctx.json({ result: { data: getPostList(boardTitle, Number(page)) } }));
    }
  ),
];
