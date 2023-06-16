import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

interface PageListProps {
  pageList: number[];
  page: number;
  lastPage: number;
  onFirstPage: () => void;
  onLastPage: () => void;
  onCaretLeft: () => void;
  onCaretRight: () => void;
  onNumber: (number: Number) => void;
}

const PageList = ({
  pageList,
  page,
  lastPage,
  onFirstPage,
  onLastPage,
  onCaretLeft,
  onCaretRight,
  onNumber,
}: PageListProps) => {
  return (
    <Container isActive={lastPage > 0}>
      <IconBox isActive={pageList[0] - 10 > 0} onClick={onCaretLeft}>
        <FontAwesomeIcon icon={faCaretLeft} />
      </IconBox>

      <Number isActive={pageList[0] !== 1} onClick={onFirstPage}>
        {1}
      </Number>

      <Separator isActive={pageList[0] !== 1}>...</Separator>

      {pageList.map((number, index) => (
        <Number
          key={index}
          isActive
          isCurrent={page === number}
          onClick={() => onNumber(number)}
        >
          {number}
        </Number>
      ))}

      <Separator isActive={pageList[pageList.length - 1] !== lastPage}>...</Separator>

      <Number isActive={pageList[pageList.length - 1] !== lastPage} onClick={onLastPage}>
        {lastPage}
      </Number>

      <IconBox isActive={pageList[0] + 10 <= lastPage} onClick={onCaretRight}>
        <FontAwesomeIcon icon={faCaretRight} />
      </IconBox>
    </Container>
  );
};

export default PageList;

const Container = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  margin: 40px auto;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.div<{ isActive: boolean }>`
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
    color: ${({ theme }) => theme.sejongCrimsonRed};
  }
`;

const Separator = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
`;
