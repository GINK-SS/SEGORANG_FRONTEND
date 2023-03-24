import BoardHeader from '../../components/BoardHeader';
import BoardItemList from '../../components/BoardItemList';
import BoardListFooter from '../../components/BoardListFooter';
import NavContainer from '../../components/NavContainer';

function NormalBoard() {
  const hotData = [
    {
      category: '동아리',
      likeNum: 13,
      title: '동아리 홍보 한번 하겠습니다 !',
      commentNum: 3,
      writer: '동아리요정',
      viewNum: 196,
      date: '52분 전',
    },
    {
      category: '자유',
      likeNum: 241,
      title: '최치열 강의 들어보신 분 있나요? 1조원의 남자 최치열입니다.',
      commentNum: 213,
      writer: '자유게시판일타강사',
      viewNum: 1465,
      date: '14:23',
    },
    {
      category: '공지',
      likeNum: 29,
      title: '세고랑 관련하여 공지 남깁니다.',
      commentNum: 23,
      writer: '운영자',
      viewNum: 146,
      date: '23.03.23',
    },
    {
      category: '익명',
      likeNum: 1326,
      title: '안녕하세요, 아이유 입니다.',
      commentNum: 123,
      writer: '아이유',
      viewNum: 14642,
      date: '23.03.23',
    },
  ];
  const newData = [
    {
      likeNum: 2,
      title: '분류 없는 게시글들',
      commentNum: 3,
      writer: '운영자',
      viewNum: 146,
      date: '23.03.23',
    },
    {
      likeNum: 54,
      title: '예를 들어 공지 같은 것들',
      commentNum: 16,
      writer: '운영자',
      viewNum: 161,
      date: '23.03.23',
    },
    {
      likeNum: 24,
      title: '안녕하세요 공지 남깁니다.',
      commentNum: 23,
      writer: '운영자',
      viewNum: 146,
      date: '23.03.23',
    },
  ];
  return (
    <>
      <BoardHeader />
      <NavContainer />
      <BoardItemList boardItem={hotData} />
      <BoardListFooter />
    </>
  );
}

export default NormalBoard;
