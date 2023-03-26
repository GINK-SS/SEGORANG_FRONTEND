export const getHotBoardData = () => {
  const hotBoardData = [];
  for (let i = 200; i >= 1; i -= 1) {
    let data = {
      boardCategory: 'bulletin',
      category: '자유',
      likeNum: i * 2,
      title: `자유 게시판 게시물 ${i}`,
      commentNum: i * 3,
      writer: `임시유저${i}`,
      viewNum: i * 10,
      date: '23.03.26',
      postNum: i,
    };
    hotBoardData.push(data);
  }

  return hotBoardData;
};

export const getBulletinBoardData = () => {
  const bulletinBoardData = [];
  for (let i = 200; i >= 1; i -= 1) {
    let data = {
      boardCategory: 'bulletin',
      category: '자유',
      likeNum: i * 2,
      title: `자유 게시판 게시물 ${i}`,
      commentNum: i * 3,
      writer: `임시유저${i}`,
      viewNum: i * 10,
      date: '23.03.26',
      postNum: i,
    };
    bulletinBoardData.push(data);
  }

  return bulletinBoardData;
};

interface IGetPostProps {
  boardCategory: string;
  postNum: number;
}

export const getPostData = ({ boardCategory, postNum }: IGetPostProps) => {
  return {
    boardTitle: '자유 게시판',
    postTitle: `자유 게시판 게시물 ${postNum}`,
    writer: `임시유저${postNum}`,
    date: '23.03.26',
    viewNum: postNum * 10,
    likeNum: postNum * 2,
    postContent: [
      '임시 데이터',
      '\n',
      '임시입니다.',
      '\n',
      '에러없이 잘 작동했으면 좋겠습니다.',
    ],
  };
};
