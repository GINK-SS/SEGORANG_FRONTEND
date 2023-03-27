import { rest, RestRequest } from 'msw';
import { Post } from '../../types/board';
import { getBulletinBoardData, getHotBoardData, getPostData } from '../mockData';

const BASE_URL = `http://scof.link:7000`;

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
  // 게시물 상세 내용 가져오기
  rest.get(
    `${BASE_URL}/api/board/:boardTitle/:postId`,
    (req: RestRequest<{}, { boardTitle: string; postId: string }>, res, ctx) => {
      const { boardTitle, postId } = req.params;

      return res(ctx.json(getPostData({ boardTitle, postId })));
    }
  ),
];
