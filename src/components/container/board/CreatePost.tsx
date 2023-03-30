import styled from 'styled-components';
import { BoardTitleList } from '../../../types/post';
import CreatePostHeader from '../../items/CreatePostHeader';

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

  return (
        <CreatePostHeader boardTitle={titleList[boardTitle]} />
  );
};

export default CreatePost;
