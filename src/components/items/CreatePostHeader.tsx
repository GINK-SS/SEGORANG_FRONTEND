import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

interface CreatePostHeaderProps {
  boardTitle: string;
  onRegister: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const CreatePostHeader = ({ boardTitle, onRegister }: CreatePostHeaderProps) => {
  const history = useHistory();

  return (
    <Container>
      <div>
        <Title>{`글쓰기 - ${boardTitle}`}</Title>
      </div>
      <RegisterBtn onClick={onRegister}>등록</RegisterBtn>
    </Container>
  );
};

export default CreatePostHeader;

const Container = styled.div`
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  max-width: 1300px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  padding: 15px 0px 10px;
  background-color: #fcfcfc;
`;

const Title = styled.p`
  font-size: 23px;
  font-weight: 500;
`;

const RegisterBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 10px 15px;
  box-shadow: 0px 5px 10px rgba(195, 0, 47, 0.25);
  font-size: 15px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.sejongCrimsonRed};
  color: #fff;
  cursor: pointer;
`;
