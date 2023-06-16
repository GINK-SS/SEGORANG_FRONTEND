import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

interface UserProps {
  nickname: string;
  name: string;
  major: string;
  onBookMark: () => void;
  onMyPage: () => void;
  onLogout: () => void;
}

const User = ({ nickname, name, major, onBookMark, onMyPage, onLogout }: UserProps) => {
  return (
    <Container>
      <Wrapper>
        <span>{nickname}</span>
        <span>{`${name} / ${major}`}</span>
      </Wrapper>
      <Options>
        <Option onClick={onBookMark}>
          북마크
          <Icon>
            <FontAwesomeIcon icon={faBookmark} />
          </Icon>
        </Option>
        <Option onClick={onMyPage}>마이페이지</Option>
        <Option onClick={onLogout}>로그아웃</Option>
      </Options>
    </Container>
  );
};

export default User;

const Container = styled.div`
  width: 350px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.03);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const Options = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0px;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
`;

const Option = styled.span`
  flex: 1;
  border-right: 2px solid rgba(0, 0, 0, 0.05);
  padding: 8px 0px;
  text-align: center;
  font-weight: 500;
  color: ${(props) => props.theme.accentColor};
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

const Icon = styled.div`
  margin-left: 5px;
`;
