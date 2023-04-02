import styled from 'styled-components';
import { BoardTitleList } from '../../../types/post';
import CreatePostHeader from '../../items/CreatePostHeader';
import CreatePostTextBox from '../../items/CreatePostTextBox';
import { EditorState, convertToRaw } from 'draft-js';
import { useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import { fetchCreatePost } from '../../../api/post';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../../atoms';
import { useHistory } from 'react-router-dom';

interface CreatePostProps {
  boardTitle: string;
}

const CreatePost = ({ boardTitle }: CreatePostProps) => {
  const titleList: BoardTitleList = {
    hot: 'HOT 게시판',
    bulletin: '자유 게시판',
    anonymous: '익명 게시판',
    student: '재학생 게시판',
    graduate: '졸업생 게시판',
    lecture_evaluation: '강의 평가',
    sejong_news: '세종 뉴스',
    sejong_council: '세종 학생회',
    club: '동아리',
    study: '스터디',
    market: '장터',
    job: '알바 · 과외',
    travel: '여행',
    notice: '공지사항',
    inquiry: '운영자 문의',
  };
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(EditorState.createEmpty());
  const contentToHtml = draftToHtml(convertToRaw(content.getCurrentContent()));
  const { accessToken } = useRecoilValue(userInfoState);
  const history = useHistory();

  const onRegister = async () => {
    const { msg, post_id } = await fetchCreatePost({
      postTitle: title,
      boardTitle,
      content: contentToHtml,
      accessToken,
    });

    if (msg === 'created') {
      history.push(`/post/${post_id}?boardTitle=${boardTitle}`);
    }
  };

  return (
    <ContainerBackground>
      <Container>
        <CreatePostHeader boardTitle={titleList[boardTitle]} onRegister={onRegister} />
        <CreatePostTextBox
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
        />
      </Container>
    </ContainerBackground>
  );
};

export default CreatePost;

const ContainerBackground = styled.div`
  margin-top: 10px;
  width: 100%;
  min-height: calc(100vh - 405px);
  background-color: #fcfcfc;
`;

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 405px);
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 25px;
`;
