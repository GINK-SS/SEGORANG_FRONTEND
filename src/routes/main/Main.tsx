import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBullhorn,
  faChevronRight,
  faMagnifyingGlass,
  faX,
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../atoms';
import { useHistory } from 'react-router-dom';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import MainBoardItem from '../../components/MainBoardItem';
import MainBestItem from '../../components/MainBestItem';

const Header = styled.div`
  display: flex;
  max-width: 1300px;
  margin: 20px auto;
  padding: 0 25px;
  align-items: center;
  justify-content: space-between;
`;

const Header__Left = styled.div``;

const HeaderLogo = styled.span`
  font-family: 'Montserrat Alternates', sans-serif;
  text-align: center;
  font-size: 45px;
  font-weight: 200;
  margin-bottom: 100px;
  color: ${(props) => props.theme.accentColor};
  letter-spacing: -2px;
  cursor: pointer;
`;

const Header__Right = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const HeaderSearch = styled.input`
  width: 350px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 3px 70px 3px 20px;
  font-size: 15px;

  &:hover {
    border: 1px solid ${(props) => props.theme.sejongCrimsonRed02};
  }
  &:focus {
    outline: 0px;
    border: 1px solid ${(props) => props.theme.sejongCrimsonRed};
  }
`;

const HeaderSearch__Delete = styled.div<{ isEmpty: boolean }>`
  position: absolute;
  visibility: ${(props) => (props.isEmpty ? 'hidden' : 'visible')};
  right: 55px;
  cursor: pointer;
`;

const HeaderSearch__Button = styled.div`
  position: absolute;
  right: 0px;
  padding: 15px 15px 15px 0px;
  cursor: pointer;

  &::before {
    content: '|';
    margin-right: 10px;
    color: rgba(0, 0, 0, 0.1);
  }
`;

const NavContainerOuter = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.03);
  border-top: 1.5px solid rgba(0, 0, 0, 0.1);
  border-bottom: 2.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.nav`
  display: flex;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px 25px;
  justify-content: space-evenly;
`;

const NavWrapper = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-left: 2px solid rgba(0, 0, 0, 0.05);
  align-items: center;

  &:last-child {
    border-right: 2px solid rgba(0, 0, 0, 0.05);
  }
`;

const NavItem = styled.li`
  margin-bottom: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.accentColor};
  }

  &:last-child {
    margin-bottom: 0px;
  }
`;

const MainContainer = styled.div`
  display: flex;
  max-width: 1300px;
  margin: 20px auto;
  padding: 0 25px;
`;

const Main__Left = styled.div`
  flex-grow: 1;
`;

const BannerWrapper = styled.div`
  position: relative;
  width: 90%;
  height: 120px;
  margin: 10px auto;
`;

const BannerText = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  font-size: 50px;
  letter-spacing: 3px;
  font-family: 'Concert One', cursive;
  text-align: center;
  color: ${(props) => props.theme.sejongCrimsonRed};
`;

const CenterBanner = styled.img`
  width: 100%;
  height: 100%;
`;

const Left__BoardWrapper = styled.div`
  display: flex;
  margin-top: 40px;
`;

const Left__MainBoard = styled.div`
  width: 50%;

  &:first-child {
    margin-right: 10px;
  }

  &:last-child {
    margin-left: 10px;
  }
`;

const Left__BoardTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px 30px 0 0;
  padding: 15px 30px;
  background-color: rgba(0, 0, 0, 0.05);
`;

const Left__BoardTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
`;

const Left__BoardItemWrapper = styled.ul`
  padding: 10px 0;
  background-color: rgba(0, 0, 0, 0.01);
`;
const Main__Right = styled.div`
  margin-left: 30px;
`;

const UserContainer = styled.div`
  width: 350px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.03);
`;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 5px;

  span {
    &:first-child {
      color: ${(props) => props.theme.sejongCrimsonRed};
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 15px;
    }

    &:last-child {
      color: ${(props) => props.theme.sejongGray};
      font-size: 14px;
    }
  }
`;

const UserOptionWrapper = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  padding: 8px 0px;
`;

const UserOptionItem = styled.span`
  flex-grow: 1;
  text-align: center;
  font-weight: 500;
  color: ${(props) => props.theme.accentColor};
  border-right: 2px solid rgba(0, 0, 0, 0.05);
  padding: 8px 0px;
  cursor: pointer;

  &:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:last-child {
    border-right: 0px;
  }
`;

const UserOptionItemIcon = styled.div`
  margin-left: 5px;
`;

const Right__NoticeContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.03);
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 13px 10px;
  cursor: pointer;
`;

const Right__NoticeContent = styled.p`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.sejongGray};

  span {
    margin: 0 5px 0 10px;
    color: ${(props) => props.theme.accentColor};
  }
`;

const Right__NoticeWrapper = styled.div``;

const Right__ShortCutContainer = styled.div`
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const Right__ShortCutTitle = styled.span`
  background-color: rgba(0, 0, 0, 0.03);
  display: block;
  padding: 20px 20px 15px;
  font-size: 17px;
  font-weight: 600;
`;

const Right__ShortCutWrapper = styled.div`
  display: grid;
  padding: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 30px;
`;

const Right__ShortCutItem = styled.div``;

const Right__ShortCutItemTitle = styled.a`
  color: ${(props) => props.theme.sejongGray};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.sejongCrimsonRed};
  }
`;

const Right__BestContainer = styled.div`
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const Right__BestTitle = styled.span`
  background-color: rgba(0, 0, 0, 0.03);
  display: block;
  padding: 20px 20px 15px;
  font-size: 17px;
  font-weight: 600;
`;

const Right__BestOptionWrapper = styled.div`
  display: flex;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.3);
`;

const Right__BestOption = styled.div<{ isActive: boolean }>`
  flex: 1;
  text-align: center;
  margin: 5px 0;
  padding: 10px 0;
  background-color: ${(props) => (props.isActive ? 'rgba(0,0,0,0.03)' : '#FFF')};
  cursor: pointer;

  &:first-child {
    border-right: 1.5px solid rgba(0, 0, 0, 0.05);
  }

  &:last-child {
    border-left: 1.5px solid rgba(0, 0, 0, 0.05);
  }

  &:hover {
    span {
      color: ${(props) => props.theme.sejongCrimsonRed};
      opacity: ${(props) => (props.isActive ? '1' : '0.7')};
    }
  }
  span {
    color: ${(props) =>
      props.isActive ? props.theme.sejongCrimsonRed : 'rgba(0, 0, 0, 0.5)'};
    font-weight: ${(props) => (props.isActive ? '600' : '400')};
  }
`;

const Right__BestItemWrapper = styled.ul``;

function Main() {
  const userInfo = useRecoilValue(userInfoState);
  const resetUserInfo = useResetRecoilState(userInfoState);
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [isChoiceHits, setIsChoiceHits] = useState(true);

  const logOut = () => {
    localStorage.removeItem('sgrUserToken');
    resetUserInfo();
    history.replace('/login');
  };

  const hotData = [
    {
      category: '익명',
      title: '안녕하세요 아이유입니다',
      commentNum: 928,
      likeNum: 3139,
    },
    {
      category: '동아리',
      title: 'SKBS 모집합니다 !!',
      commentNum: 42,
      likeNum: 31,
    },
    {
      category: '자유',
      title: '누가 엄준식 깼냐 ?',
      commentNum: 31,
      likeNum: 19,
    },
    {
      category: '자유',
      title: '식',
      commentNum: 52,
      likeNum: 133,
    },
    {
      category: '익명',
      title: '올해도 행복하자 우리',
      commentNum: 21,
      likeNum: 11,
    },
    {
      category: '자유',
      title: '준',
      commentNum: 23,
      likeNum: 134,
    },
    {
      category: '자유',
      title: '엄',
      commentNum: 55,
      likeNum: 321,
    },
    {
      category: '자유',
      title: '제목 어디까지 길어질 수 있을까요? 알려주세요 제발요',
      commentNum: 5,
      likeNum: 20,
    },
    {
      category: '자유',
      title: '세고랑 잘 되길',
      commentNum: 1,
      likeNum: 59,
    },
    {
      category: '자유',
      title: '첫 게시물 등록합니다',
      commentNum: 14,
      likeNum: 9,
    },
  ];

  const freeData = [
    {
      category: '자유',
      title: '3월 말까지 제발',
      commentNum: 14,
      likeNum: 9,
    },
    {
      category: '자유',
      title: '할 게 산더미 ?!',
      commentNum: 5,
      likeNum: 1,
    },
    {
      category: '자유',
      title: '식',
      commentNum: 52,
      likeNum: 133,
    },
    {
      category: '자유',
      title: '준',
      commentNum: 23,
      likeNum: 134,
    },
    {
      category: '자유',
      title: '엄',
      commentNum: 55,
      likeNum: 321,
    },
    {
      category: '자유',
      title: '어떻게 하면 더 예쁘게 하지? 누구라도 답을 알려줘',
      commentNum: 4,
      likeNum: 3,
    },
    {
      category: '자유',
      title: '제목 어디까지 길어질 수 있을까요? 알려주세요 제발요',
      commentNum: 5,
      likeNum: 20,
    },
    {
      category: '자유',
      title: '세고랑 잘 되길',
      commentNum: 1,
      likeNum: 59,
    },
    {
      category: '자유',
      title: '디자인은 알다가도 모르겠다',
      commentNum: 5,
      likeNum: 2,
    },
    {
      category: '자유',
      title: '첫 게시물 등록합니다',
      commentNum: 14,
      likeNum: 9,
    },
  ];

  const topHitsData = [
    '조회수 1등 게시물 입니다',
    '안녕하십니까어디까지늘어나는지궁금합니다알려주시면감사하겠습니다',
    '삼등입니다 반갑습니다',
    '4등입니다 감사합니다람쥐',
    '조회수 5등 !!!',
  ];

  const topLikesData = [
    '추천수 1등 게시물 일듯',
    '이렇게 초조한데',
    '삼초는 어떻게 기다려 이야이야이야이야',
    '사랑해 널 사랑해',
    '오늘은 말할거야',
  ];

  return (
    <>
      <Header>
        <Header__Left>
          <HeaderLogo onClick={() => history.push('/')}>SEGORANG。</HeaderLogo>
        </Header__Left>
        <Header__Right>
          <HeaderSearch
            value={search}
            placeholder="세고랑 통합검색"
            onChange={({ target: { value } }) => setSearch(value)}
          />
          <HeaderSearch__Delete isEmpty={!search} onClick={() => setSearch('')}>
            <FontAwesomeIcon icon={faX} size="2xs" color="rgba(0,0,0,0.5)" />
          </HeaderSearch__Delete>
          <HeaderSearch__Button>
            <FontAwesomeIcon icon={faMagnifyingGlass} color="rgba(0,0,0,0.5)" />
          </HeaderSearch__Button>
        </Header__Right>
      </Header>
      <NavContainerOuter>
        <NavContainer>
          <NavWrapper>
            <NavItem>HOT 게시판</NavItem>
            <NavItem>자유 게시판</NavItem>
            <NavItem>익명 게시판</NavItem>
            <NavItem>재학생 게시판</NavItem>
            <NavItem>졸업생 게시판</NavItem>
          </NavWrapper>
          <NavWrapper>
            <NavItem>강의 평가</NavItem>
            <NavItem>세종 뉴스</NavItem>
          </NavWrapper>
          <NavWrapper>
            <NavItem>동아리</NavItem>
            <NavItem>스터디</NavItem>
            <NavItem>장터</NavItem>
          </NavWrapper>
          <NavWrapper>
            <NavItem>공지사항</NavItem>
            <NavItem>운영자 문의</NavItem>
          </NavWrapper>
        </NavContainer>
      </NavContainerOuter>
      <MainContainer>
        <Main__Left>
          <BannerWrapper>
            <BannerText>COMING SOON</BannerText>
            <CenterBanner src="images/banner.png" alt="centerBanner" />
          </BannerWrapper>
          <Left__BoardWrapper>
            <Left__MainBoard>
              <Left__BoardTitleContainer>
                <Left__BoardTitle>HOT 게시판</Left__BoardTitle>
                <FontAwesomeIcon icon={faChevronRight} color="rgba(0,0,0,0.5)" />
              </Left__BoardTitleContainer>
              <Left__BoardItemWrapper>
                {hotData.map((data) => (
                  <MainBoardItem
                    category={data.category}
                    title={data.title}
                    commentNum={data.commentNum}
                    likeNum={data.likeNum}
                  />
                ))}
              </Left__BoardItemWrapper>
            </Left__MainBoard>
            <Left__MainBoard>
              <Left__BoardTitleContainer>
                <Left__BoardTitle>자유게시판</Left__BoardTitle>
                <FontAwesomeIcon icon={faChevronRight} color="rgba(0,0,0,0.5)" />
              </Left__BoardTitleContainer>
              <Left__BoardItemWrapper>
                {freeData.map((data) => (
                  <MainBoardItem
                    category={data.category}
                    title={data.title}
                    commentNum={data.commentNum}
                    likeNum={data.likeNum}
                  />
                ))}
              </Left__BoardItemWrapper>
            </Left__MainBoard>
          </Left__BoardWrapper>
        </Main__Left>
        <Main__Right>
          <UserContainer>
            <UserInfoWrapper>
              <span>{userInfo.userNickname}</span>
              <span>
                {userInfo.userName} / {userInfo.userMajor}
              </span>
            </UserInfoWrapper>
            <UserOptionWrapper>
              <UserOptionItem>
                북마크
                <UserOptionItemIcon>
                  <FontAwesomeIcon icon={faBookmark} />
                </UserOptionItemIcon>
              </UserOptionItem>
              <UserOptionItem>마이페이지</UserOptionItem>
              <UserOptionItem onClick={logOut}>로그아웃</UserOptionItem>
            </UserOptionWrapper>
          </UserContainer>
          <Right__NoticeContainer>
            <Right__NoticeContent>
              <Right__NoticeWrapper>
                <FontAwesomeIcon icon={faBullhorn} color="#990011" />
                <span>[공지]</span>
                세종인을 위한 커뮤니티가 곧 완성됩...
              </Right__NoticeWrapper>
              <FontAwesomeIcon icon={faChevronRight} color="rgba(0,0,0,0.5)" />
            </Right__NoticeContent>
          </Right__NoticeContainer>
          <Right__ShortCutContainer>
            <Right__ShortCutTitle>링크 바로가기</Right__ShortCutTitle>
            <Right__ShortCutWrapper>
              <Right__ShortCutItem>
                <Right__ShortCutItemTitle href="http://sejong.ac.kr/" target="_blank">
                  세종대학교
                </Right__ShortCutItemTitle>
              </Right__ShortCutItem>
              <Right__ShortCutItem>
                <Right__ShortCutItemTitle
                  href="https://portal.sejong.ac.kr/"
                  target="_blank"
                >
                  세종대 포털
                </Right__ShortCutItemTitle>
              </Right__ShortCutItem>
              <Right__ShortCutItem>
                <Right__ShortCutItemTitle
                  href="http://classic.sejong.ac.kr/"
                  target="_blank"
                >
                  대양휴머니티칼리지
                </Right__ShortCutItemTitle>
              </Right__ShortCutItem>
              <Right__ShortCutItem>
                <Right__ShortCutItemTitle
                  href="https://sjpt.sejong.ac.kr/"
                  target="_blank"
                >
                  학사정보시스템
                </Right__ShortCutItemTitle>
              </Right__ShortCutItem>
            </Right__ShortCutWrapper>
          </Right__ShortCutContainer>
          <Right__BestContainer>
            <Right__BestTitle>주간 랭킹 TOP 5</Right__BestTitle>
            <Right__BestOptionWrapper>
              <Right__BestOption
                isActive={isChoiceHits}
                onClick={() => setIsChoiceHits(true)}
              >
                <span>조회순</span>
              </Right__BestOption>
              <Right__BestOption
                isActive={!isChoiceHits}
                onClick={() => setIsChoiceHits(false)}
              >
                <span>추천순</span>
              </Right__BestOption>
            </Right__BestOptionWrapper>
            <Right__BestItemWrapper>
              {isChoiceHits
                ? topHitsData.map((data, index) => (
                    <MainBestItem title={data} index={index} />
                  ))
                : topLikesData.map((data, index) => (
                    <MainBestItem title={data} index={index} />
                  ))}
            </Right__BestItemWrapper>
          </Right__BestContainer>
        </Main__Right>
      </MainContainer>
    </>
  );
}

export default Main;
