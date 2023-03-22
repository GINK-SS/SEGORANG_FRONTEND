import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MainBoardItem from './MainBoardItem';

const BoardsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
`;

const BoardWrapper = styled.div`
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
  cursor: pointer;
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
    leftId: string;
    leftData: IBoardData[];
  };
  rightBoard: {
    rightTitle: string;
    rightId: string;
    rightData: IBoardData[];
  };
}

function MainBoard({
  leftBoard: { leftTitle, leftId, leftData },
  rightBoard: { rightTitle, rightId, rightData },
}: IMainBoardProps) {
  const history = useHistory();

  return (
    <BoardsContainer>
      <BoardWrapper>
        <BoardTitleContainer onClick={() => history.push(`/board/${leftId}`)}>
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
      </BoardWrapper>
      <BoardWrapper>
        <BoardTitleContainer onClick={() => history.push(`/board/${rightId}`)}>
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
      </BoardWrapper>
    </BoardsContainer>
  );
}

export default MainBoard;