import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../atoms';

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
  return (
    <div>
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
