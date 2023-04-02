import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';
import BoardHeader from '../../components/container/board/BoardHeader';
import BoardItemList from '../../components/container/board/BoardItemList';
import BoardItemListFooter from '../../components/container/board/BoardItemListFooter';
import NavContainer from '../../components/container/board/NavContainer';
import { BoardURLParams, BoardItemInfo } from '../../types/board';
import { fetchBoardItemList } from '../../api/board';
import CreatePost from '../../components/container/board/CreatePost';

function Board() {
  const [boardItemList, setBoardItemList] = useState<BoardItemInfo[]>([]);
  const [lastPage, setLastPage] = useState(0);
  const { boardTitle }: BoardURLParams = useParams();
  const userInfo = useRecoilValue(userInfoState);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('page') ?? '1';
  const status = searchParams.get('status');

  const getBoardItemList = async () => {
    const {
      result: { data, lastPage },
    } = await fetchBoardItemList({
      boardTitle,
      page: Number(page),
      limit: 20,
      accessToken: userInfo.accessToken,
    });

    setBoardItemList(data);
    setLastPage(lastPage);
  };

  useEffect(() => {
    if (status !== 'create') getBoardItemList();
  }, [boardTitle, page]);

  return (
    <>
      <BoardHeader />
      <NavContainer />
      {status === 'create' ? (
        <>
          <CreatePost boardTitle={boardTitle} />
        </>
      ) : (
        <>
          <BoardItemList boardItemList={boardItemList} page={Number(page)} />
          <BoardItemListFooter
            boardTitle={boardTitle}
            page={Number(page)}
            lastPage={lastPage}
          />
        </>
      )}
    </>
  );
}

export default Board;
