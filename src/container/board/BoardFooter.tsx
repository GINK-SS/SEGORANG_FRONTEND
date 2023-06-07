import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import FooterFlexBox from '../../components/board/FooterFlexBox';
import PageList from '../../components/board/PageList';
import Search from '../../components/board/Search';
import WriteBtn from '../../components/board/WriteBtn';

interface BoardFooterProps {
  boardTitle: string;
  page: number;
  lastPage: number;
}

const BoardFooter = ({ boardTitle, page, lastPage }: BoardFooterProps) => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('titleContent');
  const [pageList, setPageList] = useState<number[]>([]);

  // 검색
  const onSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onDelete = () => {
    setSearch('');
  };
  const onSubmit = () => {
    console.log(`${selected} 으로 ${search} 검색`);
  };

  // 쓰기 버튼
  const onWrite = () => history.push('?status=create');

  // 페이지 리스트
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
      <FooterFlexBox>
        <Search
          selected={selected}
          search={search}
          onSelected={(e) => onSelected(e)}
          onSearch={(e) => onSearch(e)}
          onDelete={onDelete}
          onSubmit={onSubmit}
        />

        <WriteBtn onClick={onWrite} />
      </FooterFlexBox>

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
