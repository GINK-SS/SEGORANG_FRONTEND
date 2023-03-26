import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getBoardList } from '../../api';
import { userInfoState } from '../../atoms';
import BoardHeader from '../../components/BoardHeader';
import BoardItemList from '../../components/BoardItemList';
import BoardListFooter from '../../components/BoardListFooter';
import NavContainer from '../../components/NavContainer';

interface IParams {
  boardTitle: string;
}

interface IBoardItem {
  boardTitle: string;
  category?: string;
  likeNum: number;
  postTitle: string;
  commentNum: number;
  writer: string;
  viewNum: number;
  date: string;
  postId: string;
}

function NormalBoard() {
  const [boardItems, setBoardItems] = useState<IBoardItem[]>([]);
  const { boardTitle }: IParams = useParams();
  const userInfo = useRecoilValue(userInfoState);

  const getBoardListAndSet = async () => {
    const { result } = await getBoardList(boardTitle, userInfo.accessToken);
    setBoardItems(result);
  };

  useEffect(() => {
    getBoardListAndSet();
  }, [boardTitle]);

  return (
    <>
      <BoardHeader />
      <NavContainer />
      <BoardItemList boardItem={boardItems} />
      <BoardListFooter />
    </>
  );
}

export default NormalBoard;
