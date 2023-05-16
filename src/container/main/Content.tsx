import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { fetchBoardItemList } from '../../api/board';
import { userInfoState } from '../../atoms';
import Banner from '../../components/main/content/Banner';
import BoardWrapper from '../../components/main/content/BoardWrapper';
import { data } from '../../lib/data';
import { MainBoardItem } from '../../types/board';
import Board from './Board';

const Content = () => {
  const [boardItemList, setBoardItemList] = useState<MainBoardItem>(
    data.mainBoardList.reduce((acc: MainBoardItem, boardTitle) => {
      acc[boardTitle] = [];
      return acc;
    }, {})
  );
  const { accessToken } = useRecoilValue(userInfoState);

  useEffect(() => {
    const getBoardItemList = async () => {
      data.mainBoardList.map(async (boardTitle) => {
        const {
          result: { data },
        } = await fetchBoardItemList({
          boardTitle,
          page: 1,
          limit: 5,
          accessToken,
        });

        setBoardItemList((prev) => ({
          ...prev,
          [boardTitle]: data,
        }));
      });
    };

    getBoardItemList();
  }, [accessToken]);

  const anotherBoardList = data.mainBoardList.map((boardTitle, index) => {
    if (boardTitle === 'hot') return null;
    if (index % 2 !== 0)
      return (
        <BoardWrapper key={index}>
          <Board boardTitle={boardTitle} boardItems={boardItemList[boardTitle]} />

          {index + 1 < data.mainBoardList.length && (
            <Board
              boardTitle={data.mainBoardList[index + 1]}
              boardItems={boardItemList[data.mainBoardList[index + 1]]}
            />
          )}
        </BoardWrapper>
      );

    return null;
  });

  return (
    <>
      <Banner img="images/banner.png" />

      <Board isFull boardTitle="hot" boardItems={boardItemList['hot']} />

      {anotherBoardList}
    </>
  );
};

export default Content;
