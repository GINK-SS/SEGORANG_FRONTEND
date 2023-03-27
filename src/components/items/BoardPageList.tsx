import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

interface BoardPageListProps {
  page: number;
  lastPage: number;
}

const BoardPageList = ({ page, lastPage }: BoardPageListProps) => {
  const history = useHistory();
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  return (
    <Container>
      <IconBox>
        <FontAwesomeIcon icon={faCaretLeft} />
      </IconBox>
      {pageNumbers.map((number, index) => {
        if (index === 10) return;
        return (
          <Number
            key={number}
            isCurrent={page === number}
            onClick={() => {
              history.push(`?page=${number}`);
            }}
          >
            {number}
          </Number>
        );
      })}
      ..
      <Number
        key={pageNumbers[10]}
        isCurrent={page === pageNumbers[10]}
        onClick={() => console.log('마지막')}
      >
        {pageNumbers[10]}
      </Number>
      <IconBox>
        <FontAwesomeIcon icon={faCaretRight} />
      </IconBox>
    </Container>
  );
};

export default BoardPageList;

const Container = styled.div`
  display: flex;
  margin: 40px auto;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.div`
  margin: 0 15px;
  padding: 5px;
  transform: scale(2);
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.sejongCrimsonRed};
  }
`;

const Number = styled.span<{ isCurrent: boolean }>`
  margin: 0 15px;
  padding: 5px;
  font-size: 20px;
  color: ${(props) => (props.isCurrent ? props.theme.accentColor : '#000')};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.sejongCrimsonRed};
  }
`;
