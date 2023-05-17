import { ReactNode } from 'react';
import styled from 'styled-components';

interface BoardPhotoWrapperProps {
  children: ReactNode;
}

const BoardPhotoWrapper = ({ children }: BoardPhotoWrapperProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default BoardPhotoWrapper;

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.01);
`;
