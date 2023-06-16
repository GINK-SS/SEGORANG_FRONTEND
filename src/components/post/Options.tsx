import styled from 'styled-components';
import Button from '../common/Button';

interface OptionsProps {
  isMine: boolean;
  onModify: () => void;
  onDelete: () => void;
}

const Options = ({ isMine, onModify, onDelete }: OptionsProps) => {
  return (
    <Wrapper isMine={isMine}>
      <BtnBox>
        <Button onClick={onModify} icon={'faPaintBrush'} text={'수정'} />
        <Button onClick={onDelete} icon={'faTrash'} text={'삭제'} />
      </BtnBox>
    </Wrapper>
  );
};

export default Options;

const Wrapper = styled.div<{ isMine: boolean }>`
  display: ${({ isMine }) => (isMine ? 'block' : 'none')};
  max-width: 1300px;
  margin: 30px auto;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 0 20px;

  > button:first-child {
    margin-right: 30px;
  }
`;
