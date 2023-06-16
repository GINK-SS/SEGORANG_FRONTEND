import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faPen, faPaintBrush, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

interface WriteBtnProps {
  onClick: () => void;
  icon: string;
  text: string;
}

const WriteBtn = ({ onClick, icon, text }: WriteBtnProps) => {
  const iconList: { [key: string]: IconProp } = {
    faPen,
    faPaintBrush,
    faTrash,
  };

  return (
    <Button onClick={onClick}>
      <FontAwesomeIcon icon={iconList[icon]} />
      <Text>{text}</Text>
    </Button>
  );
};

export default WriteBtn;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  background-color: ${(props) => props.theme.sejongCrimsonRed};
  box-shadow: 0px 5px 10px rgba(195, 0, 47, 0.25);
  cursor: pointer;
`;

const Text = styled.p`
  margin-left: 10px;
`;
