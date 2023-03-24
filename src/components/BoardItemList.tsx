import styled from 'styled-components';

const BoardContainer = styled.div`
  max-width: 1300px;
  margin: 20px auto;
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
    span {
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }
`;

const Category = styled.span`
  width: 70px;
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

function BoardItemList() {
  return (
    <BoardContainer>
      <BoardItemWrapper>
      </BoardItemWrapper>
    </BoardContainer>
  );
}

export default BoardItemList;
