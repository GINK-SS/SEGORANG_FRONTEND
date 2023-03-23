import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ContainerOuter = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1.5px solid rgba(0, 0, 0, 0.1);
  border-bottom: 2.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
`;

const Container = styled.nav`
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px 25px;
  justify-content: space-evenly;
`;

const Wrapper = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-left: 2px solid rgba(0, 0, 0, 0.05);
  align-items: center;

  &:last-child {
    border-right: 2px solid rgba(0, 0, 0, 0.05);
  }
`;

const Item = styled.li`
  margin-bottom: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.accentColor};
  }

  &:last-child {
    margin-bottom: 0px;
  }
`;

function NavContainer() {
  return (
    <ContainerOuter>
      <Container>
        <Wrapper>
          <Item>HOT 게시판</Item>
          <Item>자유 게시판</Item>
          <Item>익명 게시판</Item>
          <Item>재학생 게시판</Item>
          <Item>졸업생 게시판</Item>
        </Wrapper>
        <Wrapper>
          <Item>강의 평가</Item>
          <Item>세종 뉴스</Item>
        </Wrapper>
        <Wrapper>
          <Item>동아리</Item>
          <Item>스터디</Item>
          <Item>장터</Item>
        </Wrapper>
        <Wrapper>
          <Item>공지사항</Item>
          <Item>운영자 문의</Item>
        </Wrapper>
      </Container>
    </ContainerOuter>
  );
}

export default NavContainer;
