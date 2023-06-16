import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ItemProps {
  isCurrent: boolean;
  title: string;
  link: string;
}

const Item = ({ isCurrent, title, link }: ItemProps) => {
  return (
    <NavItem isCurrent={isCurrent}>
      <Link to={link}>{title}</Link>
    </NavItem>
  );
};

export default Item;

const NavItem = styled.li<{ isCurrent: boolean }>`
  margin-bottom: 20px;
  font-weight: 500;
  cursor: pointer;

  a {
    color: ${({ isCurrent, theme }) =>
      isCurrent ? theme.accentColor : 'rgba(0, 0, 0, 0.8)'};

    &:hover {
      color: ${({ theme }) => theme.accentColor};
    }
  }

  &:last-child {
    margin-bottom: 0px;
  }
`;
