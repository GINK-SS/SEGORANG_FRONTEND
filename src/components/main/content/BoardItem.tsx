import styled from 'styled-components';

interface BoardItemProps {
  category?: string;
  title: string;
  commentNum: number;
  likeNum: number;
  onClick: () => void;
}

const BoardItem = ({ category, title, commentNum, likeNum, onClick }: BoardItemProps) => {
  return (
    <Wrapper>
      <div>
        {category && <Category>{category}</Category>}
        <Title onClick={onClick}>
          {title.length > 20 ? `${title.slice(0, 21)}…` : title}
        </Title>
        <CommentNum>[{commentNum}]</CommentNum>
      </div>

      <LikeNum>{likeNum}</LikeNum>
    </Wrapper>
  );
};

export default BoardItem;

const Wrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background-color: rgba(0, 0, 0, 0.01);

  &:hover {
    background-color: #f2f2f2;
  }
`;

const Category = styled.span`
  margin-right: 20px;
  color: ${(props) => props.theme.sejongGray};
`;

const Title = styled.span`
  margin-right: 5px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.sejongCrimsonRed};
  }
`;

const CommentNum = styled.span`
  color: rgba(0, 0, 0, 0.5);
`;

const LikeNum = styled.span`
  color: ${(props) => props.theme.accentColor};
`;
