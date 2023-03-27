import styled from 'styled-components';

const BoardItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const BoardItemCTCWrapper = styled.div``;

const BoardItemCategory = styled.span`
  color: ${(props) => props.theme.sejongGray};
  margin-right: 20px;
`;

const BoardItemTitle = styled.span`
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.sejongCrimsonRed};
  }
`;

const BoardItemCommentCount = styled.span`
  color: rgba(0, 0, 0, 0.5);
`;

const BoardItemLike = styled.span`
  color: ${(props) => props.theme.accentColor};
`;

interface MainBoardItemProps {
  category: string;
  title: string;
  commentNum: number;
  likeNum: number;
}

function MainBoardItem({ category, title, commentNum, likeNum }: MainBoardItemProps) {
  return (
    <BoardItem>
      <BoardItemCTCWrapper>
        <BoardItemCategory>{category}</BoardItemCategory>
        <BoardItemTitle>
          {title.length > 20 ? `${title.slice(0, 21)}…` : title}
        </BoardItemTitle>
        <BoardItemCommentCount>[{commentNum}]</BoardItemCommentCount>
      </BoardItemCTCWrapper>
      <BoardItemLike>{likeNum}</BoardItemLike>
    </BoardItem>
  );
}

export default MainBoardItem;
