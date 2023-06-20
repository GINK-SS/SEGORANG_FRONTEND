import { rest, RestRequest } from 'msw';
import { BASE_URI } from '../../api/common';
import { getPostData } from '../mockData';

export const postHandlers = [
  // 게시물 상세 내용 가져오기
  rest.get(
    `${BASE_URI}/api/v1/post/:postId`,
    (req: RestRequest<{}, { postId: string }>, res, ctx) => {
      const { postId } = req.params;

      return res(ctx.json({ msg: 'success', result: getPostData({ postId }) }));
    }
  ),
];
