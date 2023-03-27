export const getHotBoardData = () => {
  const hotBoardData = [];
  for (let i = 200; i >= 1; i -= 1) {
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

  return hotBoardData;
};

export const getBulletinBoardData = () => {
  const bulletinBoardData = [];
  for (let i = 200; i >= 1; i -= 1) {
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

  return bulletinBoardData;
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
