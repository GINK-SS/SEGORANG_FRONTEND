import styled from 'styled-components';

interface LogoProps {
  onClick: React.MouseEventHandler<HTMLSpanElement>;
}

const Logo = ({ onClick }: LogoProps) => {
  return <Span onClick={onClick}>SEGORANG。</Span>;
};

export default Logo;

const Span = styled.span`
  /* margin-bottom: 100px; */
  color: ${(props) => props.theme.accentColor};
  font-size: 45px;
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 200;
  letter-spacing: -2px;
  cursor: pointer;
`;
