export const getHotBoardData = (page: number, limit: number) => {
  const hotBoardData = [];
  const dataAmount = 300;
  const lastPage = Math.ceil(dataAmount / limit);
  if (page > lastPage) return { data: [], lastPage };

  for (let i = dataAmount - (page - 1) * limit, j = 0; j < limit; i -= 1, j += 1) {
    let data = {
      post_id: i,
      board_title: 'hot',
      post_title: `자유 게시판 게시물 ${i}`,
      writer: `임시유저${i}`,
      category: '자유',
      like_num: i * 2,
      view_num: i * 10,
      comment_num: i * 3,
      created_at: '23.03.26',
      updated_at: '23.03.29',
    };
    hotBoardData.push(data);
  }

  return { data: hotBoardData, lastPage };
};

export const getBulletinBoardData = (page: number, limit: number) => {
  const bulletinBoardData = [];
  const dataAmount = 300;
  const lastPage = Math.ceil(dataAmount / limit);

  if (page > lastPage) return { data: [], lastPage };

  for (let i = dataAmount - (page - 1) * limit, j = 0; j < limit; i -= 1, j += 1) {
    let data = {
      post_id: i,
      board_title: 'bulletin',
      post_title: `자유 게시판 게시물 ${i}`,
      writer: `임시유저${i}`,
      like_num: i * 2,
      view_num: i * 10,
      comment_num: i * 3,
      created_at: '23.03.26',
      updated_at: '23.03.29',
    };
    bulletinBoardData.push(data);
  }

  return { data: bulletinBoardData, lastPage };
};

interface GetPostProps {
  postId: string;
}

export const getPostData = ({ postId }: GetPostProps) => {
  return {
    board_title: 'bulletin',
    post_title: `자유 게시판 게시물 ${postId}`,
    writer: `임시유저${postId}`,
    content:
      '<p><strong>안녕하세요</strong></p><p><ins>임시입니다</ins></p><p><span style="font-size: 30px;"><del>임시라고 합니다</del></span></p>',
    view_num: Number(postId) * 10,
    like_num: Number(postId) * 2,
    created_at: '23.03.26',
    updated_at: '23.03.29',
  };
};
