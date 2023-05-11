import styled from 'styled-components';

interface NavLinkProps {
  userNickname: string;
  onLogout: () => void;
}

const NavLink = ({ userNickname, onLogout }: NavLinkProps) => {
  return (
    <Container>
      <UserNickname>{`${userNickname} :-)`}</UserNickname>
      <OptionWrapper>
        <Option>
          <OptionTitle>북마크</OptionTitle>
        </Option>
        <Option>
          <OptionTitle>마이페이지</OptionTitle>
        </Option>
        <Option onClick={onLogout}>
          <OptionTitle>로그아웃</OptionTitle>
        </Option>
      </OptionWrapper>
    </Container>
  );
};

export default NavLink;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const UserNickname = styled.span`
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.sejongCrimsonRed};
`;

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Option = styled.nav`
  &:not(:first-child)::before {
    content: '|';
    margin: 0 30px;
    color: rgba(0, 0, 0, 0.3);
  }
`;

const OptionTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.sejongCrimsonRed};
  }
`;
