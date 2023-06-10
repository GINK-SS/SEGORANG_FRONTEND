import { ReactNode } from 'react';
import styled from 'styled-components';

interface UpdateWrapperProps {
  children: ReactNode;
}

const UpdateWrapper = ({ children }: UpdateWrapperProps) => {
  return (
    <ContainerBackground>
      <Container>{children}</Container>
    </ContainerBackground>
  );
};

export default UpdateWrapper;

const ContainerBackground = styled.div`
  margin-top: 10px;
  background-color: #fcfcfc;
`;

const Container = styled.div`
  position: relative;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 25px;
`;
