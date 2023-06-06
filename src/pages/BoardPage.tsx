import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { fetchBoardItemList } from '../api/board';
import { userInfoState } from '../atoms';
import Board from '../container/board/Board';
import { BoardItemInfo } from '../types/board';
import { UrlParams } from '../types/common';

const BoardPage = () => {
  const [boardItemList, setBoardItemList] = useState<BoardItemInfo[]>();
  const [lastPage, setLastPage] = useState(0);
  const { accessToken } = useRecoilValue(userInfoState);
  const { search } = useLocation();
  const { boardTitle }: UrlParams = useParams();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get('page') ?? '1';
  const status = searchParams.get('status');

  useEffect(() => {
    const getBoardItemList = async () => {
      const {
        result: { data, last_page },
      } = await fetchBoardItemList({
        boardTitle,
        page: Number(page),
        limit: 20,
        accessToken,
      });

      setBoardItemList(data);
      setLastPage(last_page);
    };

    if (status !== 'create') getBoardItemList();
  }, [accessToken, boardTitle, page, status]);

  return (
      <Board boardItemList={boardItemList} boardTitle={boardTitle} page={Number(page)} />
  );
};

export default BoardPage;
