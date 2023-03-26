import { rest, RestRequest } from 'msw';
import { getBulletinBoardData, getHotBoardData } from '../mockData';

const BASE_URL = `http://scof.link:7000`;

type IBoardItems = {
  [key: string]: {
    data: {
      boardCategory: string;
      category?: string;
      likeNum: number;
      title: string;
      commentNum: number;
      writer: string;
      viewNum: number;
      date: string;
      postNum: number;
    }[];
  };
};

const boardItems: IBoardItems = {
  hot: { data: getHotBoardData() },
  bulletin: { data: getBulletinBoardData() },
};

export const boardHandlers = [
  // 게시판 글 목록 가져오기
  rest.get(
    `${BASE_URL}/api/board/:boardTitle`,
    (req: RestRequest<{}, { boardTitle: string }>, res, ctx) => {
      const { boardTitle } = req.params;

      return res(
        ctx.json(
          boardItems[boardTitle]
            ? { result: boardItems[boardTitle].data }
            : { result: [] }
        )
      );
    }
  ),
];
