export const getHotBoardData = (page: number) => {
  const hotBoardData = [];
  for (let i = 300 - (page - 1) * 20, j = 0; j < 20; i -= 1, j += 1) {
    let data = {
      boardTitle: 'bulletin',
      postCategory: '자유',
      likeNum: i * 2,
      postTitle: `자유 게시판 게시물 ${i}`,
      commentNum: i * 3,
      writer: `임시유저${i}`,
      viewNum: i * 10,
      date: '23.03.26',
      postId: String(i),
    };
    hotBoardData.push(data);
  }

  return { data: hotBoardData, lastPage: 15 };
};

export const getBulletinBoardData = (page: number) => {
  const bulletinBoardData = [];
  for (let i = 260 - (page - 1) * 20, j = 0; j < 20; i -= 1, j += 1) {
    let data = {
      boardTitle: 'bulletin',
      likeNum: i * 2,
      postTitle: `자유 게시판 게시물 ${i}`,
      commentNum: i * 3,
      writer: `임시유저${i}`,
      viewNum: i * 10,
      date: '23.03.26',
      postId: String(i),
    };
    bulletinBoardData.push(data);
  }

  return { data: bulletinBoardData, lastPage: 13 };
};

interface GetPostProps {
  boardTitle: string;
  postId: string;
}

export const getPostData = ({ boardTitle, postId }: GetPostProps) => {
  return {
    boardTitle,
    postTitle: `자유 게시판 게시물 ${postId}`,
    writer: `임시유저${postId}`,
    date: '23.03.26',
    viewNum: Number(postId) * 10,
    likeNum: Number(postId) * 2,
    content: [
      '임시 데이터',
      '\n',
      '임시입니다.',
      '\n',
      '에러없이 잘 작동했으면 좋겠습니다.',
    ],
  };
};
