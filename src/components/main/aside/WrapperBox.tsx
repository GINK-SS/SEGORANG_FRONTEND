import { ReactNode } from 'react';
import styled from 'styled-components';

interface WrapperBoxProps {
  title: string;
  children: ReactNode;
}

const WrapperBox = ({ title, children }: WrapperBoxProps) => {
  return (
    <Container>
      <Title>{title}</Title>

      <Content>{children}</Content>
    </Container>
  );
};

export default WrapperBox;

const Container = styled.div`
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const Title = styled.p`
  padding: 20px 20px 15px;
  font-size: 17px;
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.03);
`;

const Content = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.3);
`;
