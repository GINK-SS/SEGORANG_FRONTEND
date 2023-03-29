import { rest } from 'msw';
import { BASE_URL } from '../../api/common';
import { getPostData } from '../mockData';

export const postHandlers = [
  // 게시물 상세 내용 가져오기
  rest.get(`${BASE_URL}/api/v1/board`, (req, res, ctx) => {
    const postId = req.url.searchParams.get('post_id') as string;

    return res(ctx.json(getPostData({ postId })));
  }),
];
