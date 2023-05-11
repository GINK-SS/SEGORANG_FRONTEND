import { ReactNode } from 'react';
import styled from 'styled-components';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return <Container>{children}</Container>;
};

export default Wrapper;

const Container = styled.div`
  display: flex;
  max-width: 1300px;
  margin: 20px auto;
  padding: 0 25px;
  justify-content: space-between;
  align-items: center;
`;
