import styled from 'styled-components';
import LoadingSpinner from '../common/LoadingSpinner';

interface UpdateHeaderProps {
  status: string;
  isLoading: boolean;
  isEmpty: boolean;
  boardTitle: string;
  onRegister: React.MouseEventHandler<HTMLButtonElement>;
}

const UpdateHeader = ({
  status,
  isLoading,
  isEmpty,
  boardTitle,
  onRegister,
}: UpdateHeaderProps) => {
  return (
    <Container>
      <div>
        <Title>{`${status === 'create' ? '글 작성' : '글 수정'} - ${boardTitle}`}</Title>
      </div>

      <SubmitBtn isActive={!isEmpty} onClick={onRegister} disabled={isLoading || isEmpty}>
        등록
      </SubmitBtn>
    </Container>
  );
};

export default UpdateHeader;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 2;
  max-width: 1300px;
  margin: 0 auto 15px;
  padding: 15px 0px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  background-color: #fcfcfc;
`;

const Title = styled.p`
  font-size: 23px;
  font-weight: 500;
`;

const SubmitBtn = styled.button<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.sejongCrimsonRed : theme.sejongGray};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
  box-shadow: ${({ isActive }) =>
    isActive ? '0px 5px 10px rgba(195, 0, 47, 0.25)' : 'none'};
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'default')};
`;
