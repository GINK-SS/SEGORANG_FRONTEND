import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPen, faPaintBrush, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

interface ButtonProps {
  onClick: () => void;
  icon?: string;
  text: string;
  isGray?: boolean;
}

const Button = ({ onClick, icon, text, isGray = false }: ButtonProps) => {
  const iconList: { [key: string]: IconProp } = {
    faPen,
    faPaintBrush,
    faTrash,
  };

  return (
    <Btn isGray={isGray} onClick={onClick}>
      {icon ? <FontAwesomeIcon icon={iconList[icon]} /> : null}
      <Text hasIcon={!!icon}>{text}</Text>
    </Btn>
  );
};

export default Button;

const Btn = styled.button<{ isGray: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  background-color: ${({ theme, isGray }) =>
    isGray ? theme.sejongGray : theme.sejongCrimsonRed};
  opacity: 0.8;
  word-break: keep-all;
  box-shadow: 0px 2px 5px
    ${({ isGray }) => (isGray ? 'rgba(0, 0, 0, 0.25)' : 'rgba(195, 0, 47, 0.25)')};
  transition: 0.2s opacity;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const Text = styled.p<{ hasIcon: boolean }>`
  margin-left: ${({ hasIcon }) => (hasIcon ? '10px' : '0px')};
`;
