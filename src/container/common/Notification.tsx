import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { notificationState } from '../../atoms';

const Notification = () => {
  const { message } = useRecoilValue(notificationState);

  return (
    <Container>
      <Text>{message}</Text>
    </Container>
  );
};

export default Notification;

const Container = styled.div`
  position: fixed;
  top: 15px;
  left: 50%;
  transform: translateX(-50%) translateY(-150%);
  padding: 15px 50px;
  border: 2px solid ${({ theme }) => theme.sejongCrimsonRed};
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.08);
  cursor: default;
  animation: show 3s;

  @keyframes show {
    0% {
      transform: translateX(-50%) translateY(-150%);
    }
    25% {
      transform: translateX(-50%) translateY(0%);
    }
    75% {
      transform: translateX(-50%) translateY(0%);
      opacity: 1;
    }
    100% {
      transform: translateX(-50%) translateY(50%);
      opacity: 0;
    }
  }
`;

const Text = styled.p`
  font-size: 18px;
`;
