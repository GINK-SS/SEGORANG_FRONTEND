import { ReactNode } from 'react';
import styled from 'styled-components';

interface BoardWrapperProps {
  children: ReactNode;
}

const BoardWrapper = ({ children }: BoardWrapperProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default BoardWrapper;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
