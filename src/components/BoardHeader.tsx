import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  max-width: 1300px;
  margin: 20px auto;
  padding: 0 25px;
  align-items: center;
  justify-content: space-between;
`;

const Header__Left = styled.div``;

const HeaderLogo = styled.span`
  font-family: 'Montserrat Alternates', sans-serif;
  text-align: center;
  font-size: 45px;
  font-weight: 200;
  margin-bottom: 100px;
  color: ${(props) => props.theme.accentColor};
  letter-spacing: -2px;
  cursor: pointer;
`;

const Header__Right = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

function BoardHeader() {
  const history = useHistory();

  return (
    <Header>
      <Header__Left>
        <HeaderLogo onClick={() => history.push('/')}>SEGORANG。</HeaderLogo>
      </Header__Left>
      <Header__Right></Header__Right>
    </Header>
  );
}

export default BoardHeader;
