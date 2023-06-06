import { ReactNode } from 'react';
import styled from 'styled-components';

interface BoardItemListProps {
  hasCategory: boolean;
  children: ReactNode;
}

const BoardItemList = ({ hasCategory, children }: BoardItemListProps) => {
  return (
    <Container>
      <ol>
        <Menu>
          <Category hasCategory={hasCategory}>분류</Category>
          <LikeNum>추천</LikeNum>
          <Title>제목</Title>
          <Writer>작성자</Writer>
          <ViewNum>조회</ViewNum>
          <Date>날짜</Date>
        </Menu>

        {children}
      </ol>
    </Container>
  );
};

export default BoardItemList;

const Container = styled.div`
  max-width: 1300px;
  margin: 40px auto 20px;
  padding: 0 25px;
`;

const Menu = styled.li`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);

  span {
    text-align: center;
    border-right: 0;
    font-weight: 600;
    color: ${({ theme }) => theme.sejongGray};
  }
`;

const Category = styled.span<{ hasCategory: boolean }>`
  display: ${({ hasCategory }) => (hasCategory ? 'block' : 'none')};
  width: 90px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
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
  padding-right: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: end;
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
