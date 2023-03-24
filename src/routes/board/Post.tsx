import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { postInfoState } from '../../atoms';
import BoardHeader from '../../components/BoardHeader';
import NavContainer from '../../components/NavContainer';

const Container = styled.div`
  max-width: 1300px;
  margin: 40px auto 20px;
  border-radius: 10px;
  padding: 20px 0px;
  background-color: rgba(0, 0, 0, 0.025);
`;

const TopWrapper = styled.div`
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding: 0 25px 15px;
`;

const BoardTitle = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.sejongGray};
  margin-bottom: 50px;
`;

const PostTitle = styled.p`
  text-align: center;
  font-size: 28px;
  font-weight: 500;
  margin-bottom: 30px;
`;

const PostTopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
`;

const PostTopLeft = styled.div`
  display: flex;
  align-items: center;
`;

const Writer = styled.p`
  margin-right: 10px;
  color: #333;
  font-weight: 500;
`;

const Date = styled.p`
  color: ${(props) => props.theme.sejongGray};
`;

const PostTopRight = styled.div`
  display: flex;
  align-items: center;
`;

const ViewNum = styled.p``;

const LikeNum = styled.p`
  margin-left: 10px;
`;

const ContentWrapper = styled.div`
  padding: 50px;
`;

const ContentText = styled.p``;

function Post() {
  const postInfo = useRecoilValue(postInfoState);
  return (
    <>
      <BoardHeader />
      <NavContainer />
      <Container>
        <TopWrapper>
          <BoardTitle>{postInfo.boardTitle}</BoardTitle>
          <PostTitle>{postInfo.postTitle}</PostTitle>
          <PostTopWrapper>
            <PostTopLeft>
              <Writer>{postInfo.writer}</Writer>
              <Date>{postInfo.date}</Date>
            </PostTopLeft>
            <PostTopRight>
              <ViewNum>{`조회: ${postInfo.viewNum}`}</ViewNum>
              <LikeNum>{`추천: ${postInfo.likeNum}`}</LikeNum>
            </PostTopRight>
          </PostTopWrapper>
        </TopWrapper>
        <ContentWrapper>
          {postInfo.postContent.map((sentence, index) => (
            <ContentText key={index}>{sentence}</ContentText>
          ))}
        </ContentWrapper>
      </Container>
    </>
  );
}

export default Post;
