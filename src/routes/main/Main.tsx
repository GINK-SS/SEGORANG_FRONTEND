import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../atoms';
import { useHistory } from 'react-router-dom';

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

const UserContainer = styled.div``;

const UserInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 15px 10px;
  background-color: rgba(0, 0, 0, 0.03);

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

function Main() {
  const userInfo = useRecoilValue(userInfoState);
  const history = useHistory();
  const [search, setSearch] = useState('');

  return (
    <div>
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
      <UserContainer>
        <UserInfoWrapper>
          <span>{userInfo.userNickname}</span>
          <span>
            {userInfo.userName} / {userInfo.userMajor}
          </span>
        </UserInfoWrapper>
      </UserContainer>
    </div>
  );
}

export default Main;
