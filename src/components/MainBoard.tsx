import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import MainBoardItem from './MainBoardItem';

const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const MainBoardWrapper = styled.div`
  width: 49%;
`;

const BoardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px 30px 0 0;
  padding: 15px 30px;
  background-color: rgba(0, 0, 0, 0.05);
`;

const BoardTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-top: 5px;
`;

const BoardItemWrapper = styled.ul`
  padding: 10px 0;
  background-color: rgba(0, 0, 0, 0.01);
`;

interface IBoardData {
  category: string;
  title: string;
  commentNum: number;
  likeNum: number;
}

interface IMainBoardProps {
  leftBoard: {
    leftTitle: string;
    leftData: IBoardData[];
  };
  rightBoard: {
    rightTitle: string;
    rightData: IBoardData[];
  };
}

function MainBoard({
  leftBoard: { leftTitle, leftData },
  rightBoard: { rightTitle, rightData },
}: IMainBoardProps) {
  return (
    <BoardContainer>
      <MainBoardWrapper>
        <BoardTitleContainer>
          <BoardTitle>{leftTitle}</BoardTitle>
          <FontAwesomeIcon icon={faChevronRight} color="rgba(0,0,0,0.5)" />
        </BoardTitleContainer>
        <BoardItemWrapper>
          {leftData.map((data, index) => (
            <MainBoardItem
              key={index}
              category={data.category}
              title={data.title}
              commentNum={data.commentNum}
              likeNum={data.likeNum}
            />
          ))}
        </BoardItemWrapper>
      </MainBoardWrapper>
      <MainBoardWrapper>
        <BoardTitleContainer>
          <BoardTitle>{rightTitle}</BoardTitle>
          <FontAwesomeIcon icon={faChevronRight} color="rgba(0,0,0,0.5)" />
        </BoardTitleContainer>
        <BoardItemWrapper>
          {rightData.map((data, index) => (
            <MainBoardItem
              key={index}
              category={data.category}
              title={data.title}
              commentNum={data.commentNum}
              likeNum={data.likeNum}
            />
          ))}
        </BoardItemWrapper>
      </MainBoardWrapper>
    </BoardContainer>
  );
}

export default MainBoard;
