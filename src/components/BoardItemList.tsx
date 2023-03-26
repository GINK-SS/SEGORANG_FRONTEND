import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BoardContainer = styled.div`
  max-width: 1300px;
  margin: 40px auto 20px;
  padding: 0 25px;
`;

const BoardItemWrapper = styled.ol``;

const BoardItem = styled.li`
  display: flex;
  align-items: center;

  &:first-child {
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);

    span {
      text-align: center;
      border-right: 0;
      font-weight: 600;
      color: ${(props) => props.theme.sejongGray};

      &:nth-child(3) {
        padding: 0;
      }

      &:nth-child(4) {
        text-align: end;
      }
    }
  }

  &:not(:first-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);

    &:hover {
      background-color: #f2f2f2;
    }

    span,
    a {
      padding-top: 15px;
      padding-bottom: 15px;
    }

    a {
      flex: 1;
      color: #000;
      cursor: pointer;
      &:hover {
        color: ${(props) => props.theme.sejongCrimsonRed};
      }
    }
  }
`;

const Category = styled.span<{ hasCategory: boolean }>`
  width: 90px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  display: ${(props) => (props.hasCategory ? 'block' : 'none')};
`;

const LikeNum = styled.span`
  width: 60px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Title = styled.span`
  flex: 1;
  padding-left: 10px;
`;

const CommentNum = styled.span`
  margin-left: 5px;
  color: ${(props) => props.theme.accentColor};
`;

const Writer = styled.span`
  text-align: end;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  padding-right: 10px;
  color: rgba(0, 0, 0, 0.8);
`;

const ViewNum = styled.span`
  width: 60px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Date = styled.span`
  width: 80px;
  text-align: center;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`;

const NoItem = styled.div`
  padding: 150px 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const NoItemText = styled.p``;

interface IBoardItemProps {
  boardTitle: string;
  postCategory?: string;
  likeNum: number;
  postTitle: string;
  commentNum: number;
  writer: string;
  viewNum: number;
  date: string;
  postId: string;
}

interface IBoardItemListProps {
  boardItem: IBoardItemProps[];
}

function BoardItemList({ boardItem }: IBoardItemListProps) {
  const hasCategory =
    boardItem.length !== 0 ? (boardItem[0]?.postCategory ? true : false) : false;

  return (
    <BoardContainer>
      <BoardItemWrapper>
        <BoardItem>
          <Category hasCategory={hasCategory}>분류</Category>
          <LikeNum>추천</LikeNum>
          <Title>제목</Title>
          <Writer>작성자</Writer>
          <ViewNum>조회</ViewNum>
          <Date>날짜</Date>
        </BoardItem>
        {boardItem.length !== 0 ? (
          boardItem.map((item, index) => (
            <BoardItem key={index}>
              <Category hasCategory={hasCategory}>{item.postCategory}</Category>
              <LikeNum>{item.likeNum}</LikeNum>
              <Link to={`${item.boardTitle}/${item.postId}`}>
                <Title>
                  {item.postTitle}
                  <CommentNum>{`[${item.commentNum}]`}</CommentNum>
                </Title>
              </Link>
              <Writer>{item.writer}</Writer>
              <ViewNum>{item.viewNum}</ViewNum>
              <Date>{item.date}</Date>
            </BoardItem>
          ))
        ) : (
          <NoItem>
            <NoItemText>등록된 글이 없습니다</NoItemText>
          </NoItem>
        )}
      </BoardItemWrapper>
    </BoardContainer>
  );
}

export default BoardItemList;
