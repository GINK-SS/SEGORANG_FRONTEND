import { Link } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { postInfoState } from '../atoms';

const BoardContainer = styled.div`
  max-width: 1300px;
  margin: 40px auto 20px;
  padding: 0 25px;
`;

const BoardItemWrapper = styled.ol``;

const BoardItem = styled.li`
  display: flex;
  align-items: center;

  &:first-child {
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);

    span {
      text-align: center;
      border-right: 0;
      font-weight: 600;
      color: ${(props) => props.theme.sejongGray};

      &:nth-child(3) {
        padding: 0;
      }

      &:nth-child(4) {
        text-align: end;
      }
    }
  }

  &:not(:first-child) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);

    &:hover {
      background-color: #f2f2f2;
    }

    span,
    a {
      padding-top: 15px;
      padding-bottom: 15px;
    }

    a {
      flex: 1;
      color: #000;
      cursor: pointer;
      &:hover {
        color: ${(props) => props.theme.sejongCrimsonRed};
      }
    }
  }
`;

const Category = styled.span<{ hasCategory: boolean }>`
  width: 90px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  display: ${(props) => (props.hasCategory ? 'block' : 'none')};
`;

const LikeNum = styled.span`
  width: 60px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Title = styled.span`
  flex: 1;
  padding-left: 10px;
`;

const CommentNum = styled.span`
  margin-left: 5px;
  color: ${(props) => props.theme.accentColor};
`;

const Writer = styled.span`
  text-align: end;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  padding-right: 10px;
  color: rgba(0, 0, 0, 0.8);
`;

const ViewNum = styled.span`
  width: 60px;
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Date = styled.span`
  width: 80px;
  text-align: center;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`;

const NoItem = styled.div`
  padding: 150px 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const NoItemText = styled.p``;

interface IBoardItemProps {
  boardCategory: string;
  category?: string;
  likeNum: number;
  title: string;
  commentNum: number;
  writer: string;
  viewNum: number;
  date: string;
  postNum: number;
}

interface IBoardItemListProps {
  boardItem: IBoardItemProps[];
}

function BoardItemList({ boardItem }: IBoardItemListProps) {
  const hasCategory =
    boardItem.length !== 0 ? (boardItem[0].category ? true : false) : false;
  const setPostInfo = useSetRecoilState(postInfoState);

  const getPostInfo = (boardCategory: string) => {
    // TO DO
    // 게시물을 누르면 게시물 정보 불러오는 API 연결하여 정보 얻기
    // 일단 하단 코드로 진행
    if (boardCategory === 'anonymous') {
      setPostInfo({
        boardTitle: '익명 게시판',
        postTitle: '안녕하세요, 아이유 입니다.',
        writer: '익명',
        date: '23.03.23. 01:21',
        viewNum: 14642,
        likeNum: 1326,
        postContent: [
          '안녕하세요? 아이유입니다.',
          '\n',
          '세고랑 화이팅입니다.',
          '\n',
          '세고랑 사랑해요 !',
        ],
      });
    } else if (boardCategory === 'bulletin') {
      setPostInfo({
        boardTitle: '자유 게시판',
        postTitle: '이상민입니다. 글이 잘 올라갔으면 좋겠습니다.',
        writer: '운영자',
        date: '23.03.25. 01:43',
        viewNum: 142,
        likeNum: 376,
        postContent: [
          '안녕하세요?',
          '\n',
          '제발 잘 됐으면 좋겠습니다.',
          '\n',
          '에러없이 잘 작동했으면 좋겠습니다.',
        ],
      });
    } else {
      setPostInfo({
        boardTitle: '임시 게시판',
        postTitle: '임시입니다.',
        writer: '임시닉네임',
        date: '23.03.25. 01:50',
        viewNum: 123,
        likeNum: 456,
        postContent: [
          '임시 입니다.',
          '\n',
          '임시입니다.',
          '\n',
          '에러없이 잘 작동했으면 좋겠습니다.',
        ],
      });
    }
  };

  return (
    <BoardContainer>
      <BoardItemWrapper>
        <BoardItem>
          <Category hasCategory={hasCategory}>분류</Category>
          <LikeNum>추천</LikeNum>
          <Title>제목</Title>
          <Writer>작성자</Writer>
          <ViewNum>조회</ViewNum>
          <Date>날짜</Date>
        </BoardItem>
        {boardItem.length !== 0 ? (
          boardItem.map((item, index) => (
            <BoardItem key={index}>
              <Category hasCategory={hasCategory}>{item.category}</Category>
              <LikeNum>{item.likeNum}</LikeNum>
              <Link
                to={`${item.boardCategory}/${item.postNum}`}
                onClick={() => getPostInfo(item.boardCategory)}
              >
                <Title>
                  {item.title}
                  <CommentNum>{`[${item.commentNum}]`}</CommentNum>
                </Title>
              </Link>
              <Writer>{item.writer}</Writer>
              <ViewNum>{item.viewNum}</ViewNum>
              <Date>{item.date}</Date>
            </BoardItem>
          ))
        ) : (
          <NoItem>
            <NoItemText>등록된 글이 없습니다</NoItemText>
          </NoItem>
        )}
      </BoardItemWrapper>
    </BoardContainer>
  );
}

export default BoardItemList;
