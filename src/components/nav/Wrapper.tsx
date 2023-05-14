import { ReactNode } from 'react';
import styled from 'styled-components';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return <NavWrapper>{children}</NavWrapper>;
};

export default Wrapper;

const NavWrapper = styled.ul`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  border-left: 2px solid rgba(0, 0, 0, 0.05);
  align-items: center;

  &:last-child {
    border-right: 2px solid rgba(0, 0, 0, 0.05);
  }
`;
