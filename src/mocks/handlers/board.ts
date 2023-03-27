import { rest, RestRequest } from 'msw';
import { BASE_URL } from '../../api/common';
import { Post } from '../../types/board';
import { getBulletinBoardData, getHotBoardData } from '../mockData';

interface PostList {
  [key: string]: {
    data: Post[];
  };
}

const postList: PostList = {
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
          postList[boardTitle]
            ? { result: { data: postList[boardTitle].data } }
            : { result: { data: [] } }
        )
      );
    }
  ),
];
