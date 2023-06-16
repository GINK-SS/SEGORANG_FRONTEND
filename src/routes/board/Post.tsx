import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { fetchPostInfo } from '../../api/post';
import { userInfoState } from '../../atoms';
import PostInfoBoardTitle from '../../components/items/PostInfoBoardTitle';
import { PostInfo, PostURLParams } from '../../types/post';

function Post() {
  const userInfo = useRecoilValue(userInfoState);
  const [postInfo, setPostInfo] = useState<PostInfo>({
    board_title: '',
    post_title: '',
    writer: '',
    content: '',
    view_num: 0,
    like_num: 0,
    created_at: '',
    updated_at: '',
  });
  const { postId }: PostURLParams = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  let boardTitle = searchParams.get('boardTitle');
  let boardPage = searchParams.get('boardPage') ?? '1';

  const getPostInfo = async () => {
    const { msg, result } = await fetchPostInfo({
      postId,
      accessToken: userInfo.accessToken,
    });

    if (msg === 'success') setPostInfo(result);
    else if (msg === 'fail') {
      setPostInfo({
        board_title: '',
        post_title: '',
        writer: '',
        content: '',
        view_num: 0,
        like_num: 0,
        created_at: '',
        updated_at: '',
      });
    }
  };

  useEffect(() => {
    getPostInfo();

    if (!boardTitle) boardTitle = postInfo.board_title;
  }, [postId]);

  return (
    <>
      <Container>
        <TopWrapper>
          <PostInfoBoardTitle boardTitle={postInfo.board_title} />
          <PostTitle>{postInfo.post_title}</PostTitle>
          <PostTopWrapper>
            <PostTopLeft>
              <Writer>{postInfo.writer}</Writer>
              <Date>{postInfo.created_at}</Date>
            </PostTopLeft>
            <PostTopRight>
              <ViewNum>{`조회: ${postInfo.view_num}`}</ViewNum>
              <LikeNum>{`추천: ${postInfo.like_num}`}</LikeNum>
            </PostTopRight>
          </PostTopWrapper>
        </TopWrapper>
        <ContentWrapper>
          <ContentText dangerouslySetInnerHTML={{ __html: postInfo.content }} />
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
