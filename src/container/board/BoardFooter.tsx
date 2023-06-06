import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PageList from '../../components/board/PageList';

interface BoardFooterProps {
  boardTitle: string;
  page: number;
  lastPage: number;
}

const BoardFooter = ({ boardTitle, page, lastPage }: BoardFooterProps) => {
  const history = useHistory();
  const [pageList, setPageList] = useState<number[]>([]);

  const onFirstPage = () => {
    history.push(`?page=${1}`);
    window.scrollTo(0, 0);
  };
  const onLastPage = () => {
    history.push(`?page=${lastPage}`);
    window.scrollTo(0, 0);
  };
  const onCaretLeft = () => {
    if (pageList[0] - 10 > 0) {
      history.push(`?page=${pageList[0] - 1}`);
      window.scrollTo(0, 0);
    }
  };
  const onCaretRight = () => {
    if (pageList[0] + 10 <= lastPage) {
      history.push(`?page=${pageList[0] + 10}`);
      window.scrollTo(0, 0);
    }
  };
  const onNumber = (number: Number) => {
    history.push(`?page=${number}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setPageList(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        .map((value) => value + Math.floor((page - 1) / 10) * 10)
        .filter((value) => value <= lastPage)
    );
  }, [boardTitle, page, lastPage]);

  return (
    <>
      <PageList
        pageList={pageList}
        page={page}
        lastPage={lastPage}
        onFirstPage={onFirstPage}
        onLastPage={onLastPage}
        onCaretLeft={onCaretLeft}
        onCaretRight={onCaretRight}
        onNumber={onNumber}
      />
    </>
  );
};

export default BoardFooter;
