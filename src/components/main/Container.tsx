import { ReactNode } from 'react';
import styled from 'styled-components';

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <ContainerBox>{children}</ContainerBox>;
};

export default Container;

const ContainerBox = styled.div`
  display: flex;
  max-width: 1300px;
  margin: 20px auto;
  padding: 0 25px;

  > div:first-child {
    flex-grow: 1;
  }

  > div:last-child {
    width: 350px;
    margin-left: 30px;
  }
`;
