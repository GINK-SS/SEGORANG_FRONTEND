import { useHistory } from 'react-router-dom';
import BoardItem from '../../components/main/content/BoardItem';
import BoardComponent from '../../components/main/content/Board';
import { MainBoardItemInfo } from '../../types/board';
import { data } from '../../lib/data';

interface BoardProps {
  isFull?: boolean;
  boardTitle: string;
  boardItems: MainBoardItemInfo[];
}

const Board = ({ isFull = false, boardTitle, boardItems }: BoardProps) => {
  const history = useHistory();

  const onBoard = (boardTitle: string) => history.push(`/board/${boardTitle}`);

  const onPost = (boardTitle: string, postId: number) =>
    history.push(`/post/${postId}?boardTitle=${boardTitle}&boardPage=1`);

  const boardItemsComponent = boardItems.map((value, index) => (
    <BoardItem
      key={index}
      category={value.category}
      title={value.post_title}
      commentNum={value.comment_num}
      likeNum={value.like_num}
      onClick={() => onPost(boardTitle, value.post_id)}
    />
  ));

  return (
    <BoardComponent
      isFull={isFull}
      onClick={() => onBoard(boardTitle)}
      boardTitle={data.boardTitleToKR[boardTitle]}
    >
      {boardItemsComponent}
    </BoardComponent>
  );
};

export default Board;
