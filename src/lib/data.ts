import { BoardTitleToKR } from '../types/common';

const navList = [
  [
    { title: 'HOT 게시판', link: 'hot' },
    { title: '자유 게시판', link: 'free' },
    { title: '익명 게시판', link: 'anonymous' },
    { title: '재학생 게시판', link: 'student' },
    { title: '졸업생 게시판', link: 'graduate' },
  ],
  [
    { title: '강의 평가', link: 'lecture' },
    { title: '세종 뉴스', link: 'news' },
    { title: '세종 학생회', link: 'council' },
  ],
  [
    { title: '동아리', link: 'club' },
    { title: '스터디', link: 'study' },
    { title: '장터', link: 'market' },
    { title: '알바 · 과외', link: 'job' },
    { title: '여행', link: 'travel' },
  ],
  [
    { title: '공지사항', link: 'notice' },
    { title: '운영자 문의', link: 'inquiry' },
  ],
];

const boardTitle = [
  'hot',
  'free',
  'anonymous',
  'student',
  'graduate',
  'lecture',
  'news',
  'council',
  'club',
  'study',
  'market',
  'job',
  'travel',
  'notice',
  'inquiry',
];

const mainBoardList = [
  'hot',
  'free',
  'anonymous',
  'student',
  'graduate',
  'lecture',
  'news',
  'council',
  'club',
  'study',
  'market',
  'job',
  'travel',
];

const boardTitleToKR: BoardTitleToKR = {
  hot: 'HOT 게시판',
  free: '자유 게시판',
  anonymous: '익명 게시판',
  student: '재학생 게시판',
  graduate: '졸업생 게시판',
  lecture: '강의 평가',
  news: '세종 뉴스',
  council: '세종 학생회',
  club: '동아리',
  study: '스터디',
  market: '장터',
  job: '알바 · 과외',
  travel: '여행',
  notice: '공지사항',
  inquiry: '운영자 문의',
};

const shortcut = [
  { title: '세종대학교', link: 'http://sejong.ac.kr' },
  { title: '세종대 포털', link: 'https://portal.sejong.ac.kr' },
  { title: '대양휴머니티칼리지', link: 'http://classic.sejong.ac.kr' },
  { title: '학사정보시스템', link: 'https://sjpt.sejong.ac.kr' },
];

export const data = {
  navList,
  boardTitle,
  mainBoardList,
  boardTitleToKR,
  shortcut,
};
