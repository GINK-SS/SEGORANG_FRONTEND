import styled from 'styled-components';
import { data } from '../../lib/data';
import { PostInfo } from '../../types/post';

interface HeaderProps {
  postInfo: PostInfo;
}

const Header = ({ postInfo }: HeaderProps) => {
  return (
    <Container>
      <BoardTitle>{data.boardTitleToKR[postInfo.board_title]}</BoardTitle>
      <PostTitle>{postInfo.post_title}</PostTitle>

      <Wrapper>
        <Left>
          <Writer>{postInfo.writer}</Writer>
          <Date>{postInfo.created_at}</Date>
        </Left>

        <Right>
          <ViewNum>{`조회: ${postInfo.view_num}`}</ViewNum>
          <LikeNum>{`추천: ${postInfo.like_num}`}</LikeNum>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  padding: 20px 25px;
`;

const BoardTitle = styled.p`
  color: ${({ theme }) => theme.sejongGray};
`;

const PostTitle = styled.p`
  margin: 50px 0;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
  line-height: 1.3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Writer = styled.p`
  margin-right: 10px;
  font-weight: 600;
  color: #333;
`;

const Date = styled.p`
  color: ${({ theme }) => theme.sejongGray};
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const ViewNum = styled.p``;

const LikeNum = styled.p`
  margin-left: 10px;
`;
