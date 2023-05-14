import { ReactNode } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <Outer>
      <Wrapper>{children}</Wrapper>
    </Outer>
  );
};

export default Container;

const Outer = styled.div`
  width: 100%;
  border-top: 1.5px solid rgba(0, 0, 0, 0.1);
  border-bottom: 2.5px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 0, 0, 0.03);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-evenly;
  max-width: 1300px;
  margin: 0 auto;
  padding: 20px 25px;
`;
