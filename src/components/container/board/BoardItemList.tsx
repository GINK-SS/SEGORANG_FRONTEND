import styled from 'styled-components';
import { BoardItemInfo } from '../../../types/board';
import BoardItem from '../../items/BoardItem';

interface BoardItemListProps {
  boardItemList: BoardItemInfo[];
  boardTitle: string;
  page: number;
}

function BoardItemList({ boardItemList, boardTitle, page }: BoardItemListProps) {
  const hasType =
    boardItemList.length !== 0 ? (boardItemList[0].category ? true : false) : false;

  return (
    <BoardContainer>
      <BoardItemWrapper>
        <Item>
          <Type hasType={hasType}>분류</Type>
          <LikeNum>추천</LikeNum>
          <Title>제목</Title>
          <Writer>작성자</Writer>
          <ViewNum>조회</ViewNum>
          <Date>날짜</Date>
        </Item>
        {boardItemList.length !== 0 ? (
          boardItemList.map((post, index) => (
            <BoardItem
              key={index}
              hasType={hasType}
              boardTitle={boardTitle}
              post={post}
              page={page}
            />
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

const BoardContainer = styled.div`
  max-width: 1300px;
  margin: 40px auto 20px;
  padding: 0 25px;
`;

const BoardItemWrapper = styled.ol``;

const Item = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);

  span {
    text-align: center;
    border-right: 0;
    font-weight: 600;
    color: ${(props) => props.theme.sejongGray};
  }
`;

const Type = styled.span<{ hasType: boolean }>`
  width: 90px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  display: ${(props) => (props.hasType ? 'block' : 'none')};
`;

const LikeNum = styled.span`
  width: 60px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Title = styled.span`
  flex: 1;
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
