import styled from 'styled-components';
import Button from './Button';

interface ModalMessageProps {
  message: string;
  onLeft: () => void;
  leftText: string;
  onRight?: () => void;
  rightText?: string;
}

const ModalMessage = ({
  message,
  onLeft,
  leftText,
  onRight,
  rightText,
}: ModalMessageProps) => {
  return (
    <Overlay>
      <Container>
        <Text>{message}</Text>

        <Wrapper>
          <Button onClick={onLeft} text={leftText} />
          {onRight && rightText ? (
            <Button onClick={onRight} text={rightText} isGray />
          ) : null}
        </Wrapper>
      </Container>
    </Overlay>
  );
};

export default ModalMessage;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 40px 80px;
  border: 1px solid ${({ theme }) => theme.sejongCrimsonRed};
  transform: translate(-50%, -50%);
  text-align: center;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  background-color: #fff;
`;

const Text = styled.p`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.5;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
`;
