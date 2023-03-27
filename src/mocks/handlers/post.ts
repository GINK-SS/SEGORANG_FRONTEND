import { rest, RestRequest } from 'msw';
import { BASE_URL } from '../../api/common';
import { getPostData } from '../mockData';

export const postHandlers = [
  // 게시물 상세 내용 가져오기
  rest.get(
    `${BASE_URL}/api/board/:boardTitle/:postId`,
    (req: RestRequest<{}, { boardTitle: string; postId: string }>, res, ctx) => {
      const { boardTitle, postId } = req.params;

      return res(ctx.json(getPostData({ boardTitle, postId })));
    }
  ),
];
