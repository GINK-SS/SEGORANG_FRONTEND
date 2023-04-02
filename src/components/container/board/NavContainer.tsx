import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BoardURLParams } from '../../../types/board';

function NavContainer() {
  const { boardTitle }: BoardURLParams = useParams();

  return (
    <ContainerOuter>
      <Container>
        <Wrapper>
          <Item isCurrentBoard={boardTitle === 'hot'}>
            <Link to="/board/hot">HOT 게시판</Link>
          </Item>
          <Item isCurrentBoard={boardTitle === 'bulletin'}>
            <Link to="/board/bulletin">자유 게시판</Link>
          </Item>
          <Item isCurrentBoard={boardTitle === 'anonymous'}>
            <Link to={'/board/anonymous'}>익명 게시판</Link>
          </Item>
          <Item isCurrentBoard={boardTitle === 'student'}>
            <Link to={'/board/student'}>재학생 게시판</Link>
          </Item>
          <Item isCurrentBoard={boardTitle === 'graduate'}>
            <Link to={'/board/graduate'}>졸업생 게시판</Link>
          </Item>
        </Wrapper>
        <Wrapper>
          <Item isCurrentBoard={boardTitle === 'lecture-evaluation'}>
            <Link to={'/board/lecture_evaluation'}>강의 평가</Link>
          </Item>
          <Item isCurrentBoard={boardTitle === 'sejong-news'}>
            <Link to={'/board/sejong_news'}>세종 뉴스</Link>
          </Item>
          <Item isCurrentBoard={boardTitle === 'sejong-council'}>
            <Link to={'/board/sejong_council'}>세종 학생회</Link>
          </Item>
        </Wrapper>
        <Wrapper>
          <Item isCurrentBoard={boardTitle === 'club'}>
            <Link to={'/board/club'}>동아리</Link>
          </Item>
          <Item isCurrentBoard={boardTitle === 'study'}>
            <Link to={'/board/study'}>스터디</Link>
          </Item>
          <Item isCurrentBoard={boardTitle === 'market'}>
            <Link to={'/board/market'}>장터</Link>
          </Item>
          <Item isCurrentBoard={boardTitle === 'job'}>
            <Link to={'/board/job'}>알바 · 과외</Link>
          </Item>
          <Item isCurrentBoard={boardTitle === 'travel'}>
            <Link to={'/board/travel'}>여행</Link>
          </Item>
        </Wrapper>
        <Wrapper>
          <Item isCurrentBoard={boardTitle === 'notice'}>
            <Link to={'/board/notice'}>공지사항</Link>
          </Item>
          <Item isCurrentBoard={boardTitle === 'inquiry'}>
            <Link to={'/board/inquiry'}>운영자 문의</Link>
          </Item>
        </Wrapper>
      </Container>
    </ContainerOuter>
  );
}

export default NavContainer;

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

const Item = styled.li<{ isCurrentBoard: boolean }>`
  margin-bottom: 20px;
  font-weight: 500;
  cursor: pointer;

  a {
    color: ${({ isCurrentBoard, theme }) =>
      isCurrentBoard ? theme.accentColor : 'rgba(0, 0, 0, 0.8)'};

    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }

  &:last-child {
    margin-bottom: 0px;
  }
`;
