import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { fetchPostInfo } from '../../api/post';
import { userInfoState } from '../../atoms';
import BoardHeader from '../../components/container/board/BoardHeader';
import NavContainer from '../../components/container/board/NavContainer';
import { PostInfoResponse, PostURLParams } from '../../types/post';

function Post() {
  const userInfo = useRecoilValue(userInfoState);
  const [postInfo, setPostInfo] = useState<PostInfoResponse>({
    boardTitle: '',
    postTitle: '',
    writer: '',
    date: '',
    viewNum: 0,
    likeNum: 0,
    content: [],
  });
  const { boardTitle, postId }: PostURLParams = useParams();

  const getPostInfo = async () => {
    const response = await fetchPostInfo({
      boardTitle,
      postId,
      accessToken: userInfo.accessToken,
    });

    setPostInfo(response);
  };

  useEffect(() => {
    getPostInfo();
  }, [boardTitle, postId]);

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
          {postInfo.content.map((sentence, index) => (
            <ContentText key={index}>{sentence}</ContentText>
          ))}
        </ContentWrapper>
      </Container>
    </>
  );
}

export default Post;

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
  margin-bottom: 50px;
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
