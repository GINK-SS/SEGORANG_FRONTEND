import { faMagnifyingGlass, faPen, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import BoardPageList from '../../items/BoardPageList';

interface BoardListFooterProps {
  boardTitle: string;
  page: number;
  lastPage: number;
}

function BoardListFooter({ boardTitle, page, lastPage }: BoardListFooterProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('titleContent');
  const selectOptions = [
    {
      id: 0,
      name: '제목+내용',
      value: 'titleContent',
    },
    { id: 1, name: '제목', value: 'title' },
    { id: 2, name: '작성자', value: 'writer' },
  ];

  return (
    <Container>
      <UpperBox>
        <SearchWrapper>
          <SearchSelect
            onChange={({ target: { value } }) => setSelected(value)}
            value={selected}
          >
            {selectOptions.map((option) => (
              <option key={option.id} value={option.value}>
                {option.name}
              </option>
            ))}
          </SearchSelect>
          <SearchInput
            isBlank={!search}
            value={search}
            placeholder="검색"
            onChange={({ target: { value } }) => setSearch(value)}
          />
          <SearchInput__Delete isEmpty={!search} onClick={() => setSearch('')}>
            <FontAwesomeIcon icon={faX} size="2xs" color="rgba(0,0,0,0.5)" />
          </SearchInput__Delete>
          <SearchInput__Button
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} color="rgba(0,0,0,0.5)" />
          </SearchInput__Button>
        </SearchWrapper>
        <WriteBtn>
          <FontAwesomeIcon icon={faPen} />
          <WriteText>쓰기</WriteText>
        </WriteBtn>
      </UpperBox>
      <BoardPageList boardTitle={boardTitle} page={page} lastPage={lastPage} />
    </Container>
  );
}

export default BoardListFooter;

const Container = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 25px;
`;

const UpperBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchWrapper = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  &:hover {
    border: 1px solid ${(props) => props.theme.sejongCrimsonRed02};
  }
  &:first-child:focus {
    outline: 0px;
    border: 1px solid ${(props) => props.theme.sejongCrimsonRed};
  }
`;

const SearchSelect = styled.select`
  width: 100px;
  height: 48px;
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  padding-left: 10px;
  font-size: 15px;

  &:focus {
    outline: 0px;
  }
`;

const SearchInput = styled.input<{ isBlank: boolean }>`
  width: ${(props) => (props.isBlank ? '150px' : '350px')};
  height: 40px;
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 0 10px 10px 0;
  padding: 3px 70px 3px 20px;
  font-size: 15px;
  transition: width 0.2s;

  &:focus {
    outline: 0px;
    width: 350px;
    border: 1px solid ${(props) => props.theme.sejongCrimsonRed};
  }
`;

const SearchInput__Delete = styled.div<{ isEmpty: boolean }>`
  position: absolute;
  visibility: ${(props) => (props.isEmpty ? 'hidden' : 'visible')};
  right: 55px;
  cursor: pointer;
`;

const SearchInput__Button = styled.button`
  position: absolute;
  right: 0px;
  border: 0;
  border-radius: 10px;
  padding: 15px 15px 15px 0px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);

  &::before {
    content: '|';
    margin-right: 10px;
    color: rgba(0, 0, 0, 0.1);
  }
`;

const WriteBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  padding: 10px 15px;
  box-shadow: 0px 5px 10px rgba(195, 0, 47, 0.25);
  font-size: 15px;
  font-weight: 500;
  background-color: ${(props) => props.theme.sejongCrimsonRed};
  color: #fff;
  cursor: pointer;
`;

const WriteText = styled.p`
  margin-left: 10px;
`;
