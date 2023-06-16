import BoardItem from '../../components/board/BoardItem';
import BoardItemList from '../../components/board/BoardItemList';
import NoItem from '../../components/board/NoItem';
import { BoardItemInfo } from '../../types/board';

interface BoardProps {
  boardItemList: BoardItemInfo[] | undefined;
  page: number;
}

const Board = ({ boardItemList, page }: BoardProps) => {
  const hasCategory = boardItemList?.length ? !!boardItemList[0]?.category : false;

  const boardItemListComponents = boardItemList?.map((boardItem, index) => (
    <BoardItem
      key={index}
      hasCategory={!!boardItem.category}
      post={boardItem}
      page={page}
      link={`/post/${boardItem.post_id}?boardPage=${page}`}
    />
  ));

  return (
    <BoardItemList hasCategory={hasCategory}>
      {boardItemList?.length ? boardItemListComponents : <NoItem />}
    </BoardItemList>
  );
};

export default Board;
