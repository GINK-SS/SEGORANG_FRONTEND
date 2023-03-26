import { rest, RestRequest } from 'msw';
import { getBulletinBoardData, getHotBoardData, getPostData } from '../mockData';

const BASE_URL = `http://scof.link:7000`;

type IBoardItems = {
  [key: string]: {
    data: {
      boardTitle: string;
      postCategory?: string;
      likeNum: number;
      postTitle: string;
      commentNum: number;
      writer: string;
      viewNum: number;
      date: string;
      postId: string;
    }[];
  };
};

interface IPost {
  result: {
    boardTitle: string;
    postTitle: string;
    writer: string;
    date: string;
    viewNum: number;
    likeNum: number;
    postContent: string[];
  };
}

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
  // 게시판 글 상세 내용 가져오기
  rest.get(
    `${BASE_URL}/api/board/:boardTitle/:postId`,
    (req: RestRequest<{}, { boardTitle: string; postId: string }>, res, ctx) => {
      const { boardTitle, postId } = req.params;

      return res(ctx.json(getPostData({ boardTitle, postId })));
    }
  ),
];
