import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';
import BoardItemList from '../../components/container/board/BoardItemList';
import BoardItemListFooter from '../../components/container/board/BoardItemListFooter';
import { BoardItemInfo } from '../../types/board';
import { fetchBoardItemList } from '../../api/board';
import CreatePost from '../../components/container/board/CreatePost';
import { UrlParams } from '../../types/common';

function Board() {
  const [boardItemList, setBoardItemList] = useState<BoardItemInfo[]>([]);
  const [lastPage, setLastPage] = useState(0);
  const { boardTitle }: UrlParams = useParams();
  const userInfo = useRecoilValue(userInfoState);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('page') ?? '1';
  const status = searchParams.get('status');

  const getBoardItemList = async () => {
    const {
      result: { data, last_page },
    } = await fetchBoardItemList({
      boardTitle,
      page: Number(page),
      limit: 20,
      accessToken: userInfo.accessToken,
    });

    setBoardItemList(data);
    setLastPage(last_page);
  };

  useEffect(() => {
    if (status !== 'create') getBoardItemList();
  }, [boardTitle, page]);

  return (
    <>
      {status === 'create' ? (
        <>
          <CreatePost boardTitle={boardTitle} />
        </>
      ) : (
        <>
          <BoardItemList
            boardItemList={boardItemList}
            boardTitle={boardTitle}
            page={Number(page)}
          />
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
