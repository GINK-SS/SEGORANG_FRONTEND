import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface BoardProps {
  onClick: () => void;
  isFull?: boolean;
  boardTitle: string;
  children: ReactNode;
}

const Board = ({ onClick, isFull = false, boardTitle, children }: BoardProps) => {
  return (
    <Container isFull={isFull}>
      <Header onClick={onClick}>
        <BoardTitle>{boardTitle}</BoardTitle>
        <FontAwesomeIcon icon={faChevronRight} color="rgba(0,0,0,0.5)" />
      </Header>

      {children}
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
