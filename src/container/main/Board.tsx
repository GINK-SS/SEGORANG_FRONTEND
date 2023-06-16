import { useHistory } from 'react-router-dom';
import BoardItem from '../../components/main/content/BoardItem';
import BoardComponent from '../../components/main/content/Board';
import { MainBoardItemInfo } from '../../types/board';
import { data } from '../../lib/data';
import { YoutubeItemInfo } from '../../types/main';
import BoardPhotoItem from '../../components/main/content/BoardPhotoItem';
import BoardPhotoWrapper from '../../components/main/content/BoardPhotoWrapper';

interface BoardProps {
  link?: string;
  isFull?: boolean;
  isPhoto?: boolean;
  boardTitle: string;
  boardItems?: MainBoardItemInfo[];
  boardPhotoItems?: YoutubeItemInfo[];
}

const Board = ({
  link,
  isFull = false,
  isPhoto = false,
  boardTitle,
  boardItems,
  boardPhotoItems,
}: BoardProps) => {
  const history = useHistory();

  const onBoard = (boardTitle: string) => history.push(`/board/${boardTitle}`);

  const onPost = (boardTitle: string, postId: number) =>
    history.push(`/post/${postId}?boardTitle=${boardTitle}&boardPage=1`);

  const boardItemsComponent = boardItems?.map((value, index) => (
    <BoardItem
      key={index}
      category={value.category}
      title={value.post_title}
      commentNum={value.comment_num}
      likeNum={value.like_num}
      onClick={() => onPost(boardTitle, value.post_id)}
    />
  ));

  const boardPhotoItemsComponent = (
    <BoardPhotoWrapper>
      {boardPhotoItems?.map((value, index) => (
        <BoardPhotoItem
          key={index}
          thumbNail={value.thumb_nail}
          title={value.title}
          link={value.link}
        />
      ))}
    </BoardPhotoWrapper>
  );

  return (
    <BoardComponent
      isFull={isFull}
      link={link}
      onClick={link ? () => {} : () => onBoard(boardTitle)}
      boardTitle={data.boardTitleToKR[boardTitle] ?? boardTitle}
    >
      {boardItemsComponent || boardPhotoItemsComponent}
    </BoardComponent>
  );
};

export default Board;
