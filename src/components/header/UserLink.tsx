import styled from 'styled-components';

interface UserLinkProps {
  userNickname: string;
  onLogout: () => void;
}

const UserLink = ({ userNickname, onLogout }: UserLinkProps) => {
  return (
    <Container>
      <UserNickname>{`${userNickname} :-)`}</UserNickname>

      <LinkWrapper>
        <LinkItem>
          <LinkTitle>북마크</LinkTitle>
        </LinkItem>
        <LinkItem>
          <LinkTitle>마이페이지</LinkTitle>
        </LinkItem>
        <LinkItem onClick={onLogout}>
          <LinkTitle>로그아웃</LinkTitle>
        </LinkItem>
      </LinkWrapper>
    </Container>
  );
};

export default UserLink;

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

const LinkWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LinkItem = styled.nav`
  &:not(:first-child)::before {
    content: '|';
    margin: 0 30px;
    color: rgba(0, 0, 0, 0.3);
  }
`;

const LinkTitle = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.sejongCrimsonRed};
  }
`;
