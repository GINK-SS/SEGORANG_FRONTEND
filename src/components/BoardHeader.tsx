import { useHistory } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../atoms';

function BoardHeader() {
  const userInfo = useRecoilValue(userInfoState);
  const resetUserInfo = useResetRecoilState(userInfoState);
  const history = useHistory();

  const logOut = () => {
    localStorage.removeItem('sgrUserToken');
    resetUserInfo();
    history.replace('/login');
  };

  return (
    <Header>
      <LeftContainer>
        <HeaderLogo onClick={() => history.push('/')}>SEGORANG。</HeaderLogo>
      </LeftContainer>
      <RightContainer>
        <UserNickname>{`${userInfo.userNickname} :-)`}</UserNickname>
        <NavOptionWrapper>
          <NavOption>
            <NavOptionTitle>북마크</NavOptionTitle>
          </NavOption>
          <NavOption>
            <NavOptionTitle>마이페이지</NavOptionTitle>
          </NavOption>
          <NavOption>
            <NavOptionTitle onClick={logOut}>로그아웃</NavOptionTitle>
          </NavOption>
        </NavOptionWrapper>
      </RightContainer>
    </Header>
  );
}

export default BoardHeader;

const Header = styled.div`
  display: flex;
  max-width: 1300px;
  margin: 20px auto;
  padding: 0 25px;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div``;

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

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 70px;
  justify-content: space-around;
`;

const UserNickname = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.sejongCrimsonRed};
`;

const NavOptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NavOption = styled.nav`
  margin-left: 30px;
  border-left: 2px solid rgba(0, 0, 0, 0.1);
  padding-left: 30px;

  &:first-child {
    margin-left: 0;
    border: 0;
    padding-left: 0;
  }
`;

const NavOptionTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.sejongCrimsonRed};
  }
`;
