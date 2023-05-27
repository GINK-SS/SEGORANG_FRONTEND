import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface ShortCutProps {
  linkList: {
    title: string;
    link: string;
  }[];
}

const ShortCut = ({ linkList }: ShortCutProps) => {
  return (
    <Wrapper>
      {linkList.map((value, index) => (
        <Link key={index} to={value.link} target="_blank">
          {value.title}
        </Link>
      ))}
    </Wrapper>
  );
};

export default ShortCut;

const Wrapper = styled.div`
  display: grid;
  padding: 20px;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 30px;

  a {
    color: ${(props) => props.theme.sejongGray};
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.sejongCrimsonRed};
    }
  }
`;
