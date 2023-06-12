import { ReactNode } from 'react';
import styled from 'styled-components';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <Container>
      <Background>{children}</Background>
    </Container>
  );
};

export default Wrapper;

const Container = styled.div`
  max-width: 1300px;
  margin: 30px auto;
`;

const Background = styled.div`
  margin: 0 20px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.03);
`;
