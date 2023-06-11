import styled from 'styled-components';

interface LoadingMessageProps {
  isLoading: boolean;
  message: string;
}

const LoadingMessage = ({ message, isLoading }: LoadingMessageProps) => {
  return (
    <Overlay isLoading={isLoading}>
      <Container>
        <Text>{message}</Text>
        <Spinner />
      </Container>
    </Overlay>
  );
};

export default LoadingMessage;

const Overlay = styled.div<{ isLoading: boolean }>`
  display: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
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
  line-height: 1.5;
`;

const Spinner = styled.span`
  display: block;
  position: relative;
  width: 12px;
  height: 12px;
  margin: 40px auto 0;
  border-radius: 50%;
  color: ${({ theme }) => theme.accentColor};
  box-sizing: border-box;
  animation: animloader 2s linear infinite;

  @keyframes animloader {
    0% {
      box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 -2px;
    }
    25% {
      box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 2px;
    }
    50% {
      box-shadow: 14px 0 0 -2px, 38px 0 0 -2px, -14px 0 0 2px, -38px 0 0 -2px;
    }
    75% {
      box-shadow: 14px 0 0 2px, 38px 0 0 -2px, -14px 0 0 -2px, -38px 0 0 -2px;
    }
    100% {
      box-shadow: 14px 0 0 -2px, 38px 0 0 2px, -14px 0 0 -2px, -38px 0 0 -2px;
    }
  }
`;
