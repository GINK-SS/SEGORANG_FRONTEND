import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

interface BoardPageListProps {
  boardTitle: string;
  page: number;
  lastPage: number;
}

const BoardPageList = ({ boardTitle, page, lastPage }: BoardPageListProps) => {
  const history = useHistory();
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  useEffect(() => {
    if (page === 1)
      setPageNumbers(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((value) => value <= lastPage)
      );
  }, [page, lastPage, boardTitle]);

  return (
    <Container>
      <IconBox
        hasData={lastPage > 0}
        isActive={pageNumbers[0] - 10 > 0}
        onClick={() => {
          if (pageNumbers[0] - 10 > 0) {
            setPageNumbers((prev) => {
              let firstPage = prev[0] - 10;
              let newPageNumbers = [firstPage];

              for (let i = 1; i < 10; i += 1) {
                newPageNumbers.push(firstPage + i);
              }

              return newPageNumbers;
            });
            history.push(`?page=${pageNumbers[0] - 1}`);
          }
        }}
      >
        <FontAwesomeIcon icon={faCaretLeft} />
      </IconBox>
      <Number
        isActive={pageNumbers[0] !== 1 && lastPage > 0}
        onClick={() => {
          setPageNumbers(() => {
            let newPageNumbers = [];
            for (let i = 1; i <= 10; i += 1) {
              if (i > lastPage) break;
              newPageNumbers.push(i);
            }

            return newPageNumbers;
          });
          history.push(`?page=${1}`);
        }}
      >
        1
      </Number>
      <Separator isActive={pageNumbers[0] !== 1 && lastPage > 0}>...</Separator>
      {pageNumbers.map((number, index) => (
        <Number
          key={index}
          isActive={true}
          isCurrent={page === number}
          onClick={() => {
            history.push(`?page=${number}`);
          }}
        >
          {number}
        </Number>
      ))}
      <Separator
        isActive={pageNumbers[pageNumbers.length - 1] !== lastPage && lastPage > 0}
      >
        ...
      </Separator>
      <Number
        isActive={pageNumbers[pageNumbers.length - 1] !== lastPage && lastPage > 0}
        onClick={() => {
          setPageNumbers(() => {
            let firstPage = Math.floor(lastPage / 10) * 10 + 1;
            let newPageNumbers = [firstPage];

            for (let i = 1; i < 10; i += 1) {
              if (firstPage + i > lastPage) break;
              newPageNumbers.push(firstPage + i);
            }

            return newPageNumbers;
          });
          history.push(`?page=${lastPage}`);
        }}
      >
        {lastPage}
      </Number>
      <IconBox
        hasData={lastPage > 0}
        isActive={pageNumbers[0] + 10 <= lastPage}
        onClick={() => {
          if (pageNumbers[0] + 10 <= lastPage) {
            setPageNumbers((prev) =>
              prev
                .filter((value) => {
                  if (value + 10 <= lastPage) return true;
                  return false;
                })
                .map((value) => value + 10)
            );
            history.push(`?page=${pageNumbers[0] + 10}`);
          }
        }}
      >
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

const IconBox = styled.div<{ isActive: boolean; hasData: boolean }>`
  display: ${({ hasData }) => (hasData ? 'block' : 'none')};
  margin: 0 15px;
  padding: 5px;
  transform: scale(2);
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'default')};

  &:hover {
    color: ${({ theme, isActive }) => (isActive ? theme.sejongCrimsonRed : '#000')};
  }
`;

const Number = styled.span<{ isCurrent?: boolean; isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  margin: 0 15px;
  padding: 5px;
  font-size: 20px;
  color: ${(props) => (props.isCurrent ? props.theme.accentColor : '#000')};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.sejongCrimsonRed};
  }
`;

const Separator = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`;
