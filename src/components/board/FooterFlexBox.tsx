import { ReactNode } from 'react';
import styled from 'styled-components';

interface FooterFlexBoxProps {
  children: ReactNode;
}

const FooterFlexBox = ({ children }: FooterFlexBoxProps) => {
  return <Container>{children}</Container>;
};

export default FooterFlexBox;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 25px;
`;
