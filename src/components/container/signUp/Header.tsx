import ProgressBar from '@ramonak/react-progress-bar';
import styled from 'styled-components';

interface HeaderProps {
  progressAmount: number;
}

const Header = ({ progressAmount }: HeaderProps) => {
  return (
    <Wrapper>
      <Title>회원가입</Title>
      <ProgressBar
        completed={progressAmount}
        customLabel=" "
        height="5px"
        bgColor="rgba(195, 0, 47)"
        borderRadius="10px"
      />
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  text-align: center;
  margin: 0 -60px;
`;

const Title = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;
