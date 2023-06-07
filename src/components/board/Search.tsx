import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { data } from '../../lib/data';

interface SearchProps {
  selected: string;
  search: string;
  onSelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

const Search = ({
  selected,
  search,
  onSelected,
  onSearch,
  onDelete,
  onSubmit,
}: SearchProps) => {
  return (
    <Wrapper onSubmit={(e) => e.preventDefault()}>
      <Select onChange={onSelected} value={selected}>
        {data.boardSearchOptions.map((option) => (
          <option key={option.id} value={option.value}>
            {option.name}
          </option>
        ))}
      </Select>

      <Input isBlank={!search} value={search} placeholder="검색" onChange={onSearch} />

      <DeleteBtn isEmpty={!search} onClick={onDelete}>
        <FontAwesomeIcon icon={faX} size="2xs" color="rgba(0,0,0,0.5)" />
      </DeleteBtn>

      <Button onClick={onSubmit}>
        <FontAwesomeIcon icon={faMagnifyingGlass} color="rgba(0,0,0,0.5)" />
      </Button>
    </Wrapper>
  );
};

export default Search;

const Wrapper = styled.form`
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  &:hover {
    border: 1px solid ${({ theme }) => theme.sejongCrimsonRed02};
  }
  &:first-child:focus {
    border: 1px solid ${({ theme }) => theme.sejongCrimsonRed};
    outline: 0px;
  }
`;

const Select = styled.select`
  width: 100px;
  height: 48px;
  padding-left: 10px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.03);

  &:focus {
    outline: 0px;
  }
`;

const Input = styled.input<{ isBlank: boolean }>`
  width: ${({ isBlank }) => (isBlank ? '150px' : '350px')};
  height: 40px;
  padding: 3px 70px 3px 20px;
  border: 1px solid rgba(0, 0, 0, 0);
  border-radius: 0 10px 10px 0;
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.03);
  transition: width 0.2s;

  &:focus {
    width: 350px;
    border: 1px solid ${({ theme }) => theme.sejongCrimsonRed};
    outline: 0px;
  }
`;

const DeleteBtn = styled.div<{ isEmpty: boolean }>`
  visibility: ${({ isEmpty }) => (isEmpty ? 'hidden' : 'visible')};
  position: absolute;
  right: 55px;
  cursor: pointer;
`;

const Button = styled.button`
  position: absolute;
  right: 0px;
  padding: 15px 15px 15px 0px;
  border: 0;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  cursor: pointer;

  &::before {
    content: '|';
    margin-right: 10px;
    color: rgba(0, 0, 0, 0.1);
  }
`;
