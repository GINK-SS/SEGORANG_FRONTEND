import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { MainBoardItemInfo } from '../../../types/board';
import BoardItem from './BoardItem';

interface BoardProps {
  isFull?: boolean;
  boardTitle: string;
  boardItems: MainBoardItemInfo[];
}

const Board = ({ isFull = false, boardTitle, boardItems }: BoardProps) => {
  return (
    <Container isFull={isFull}>
      <Header>
        <BoardTitle>{boardTitle}</BoardTitle>
        <FontAwesomeIcon icon={faChevronRight} color="rgba(0,0,0,0.5)" />
      </Header>

      {boardItems.map((value, index) => (
        <BoardItem
          key={index}
          category={value.category}
          title={value.post_title}
          commentNum={value.comment_num}
          likeNum={value.like_num}
        />
      ))}
    </Container>
  );
};

export default Board;

const Container = styled.div<{ isFull: boolean }>`
  width: ${({ isFull }) => (isFull ? '100%' : '49%')};
  margin-top: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px 30px 0 0;
  background-color: rgba(0, 0, 0, 0.05);
  cursor: pointer;
`;

const BoardTitle = styled.p`
  margin-top: 5px;
  font-size: 18px;
  font-weight: 600;
`;
