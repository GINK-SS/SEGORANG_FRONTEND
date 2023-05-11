import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faX } from '@fortawesome/free-solid-svg-icons';

interface SearchProps {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onDelete: () => void;
  onSubmit: () => void;
}

const Search = ({ placeholder, value, onChange, onDelete, onSubmit }: SearchProps) => {
  return (
    <SearchBox>
      <Input placeholder={placeholder} value={value} onChange={(e) => onChange(e)} />
      <DeleteBtn isEmpty={!value} onClick={onDelete}>
        <FontAwesomeIcon icon={faX} size="2xs" color="rgba(0,0,0,0.5)" />
      </DeleteBtn>
      <SubmitBtn onClick={onSubmit}>
        <FontAwesomeIcon icon={faMagnifyingGlass} color="rgba(0,0,0,0.5)" />
      </SubmitBtn>
    </SearchBox>
  );
};

export default Search;

const SearchBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const Input = styled.input`
  width: 350px;
  height: 40px;
  padding: 3px 70px 3px 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.03);

  &:hover {
    border: 1px solid ${(props) => props.theme.sejongCrimsonRed02};
  }
  &:focus {
    border: 1px solid ${(props) => props.theme.sejongCrimsonRed};
    outline: 0px;
  }
`;

const DeleteBtn = styled.div<{ isEmpty: boolean }>`
  position: absolute;
  visibility: ${({ isEmpty }) => (isEmpty ? 'hidden' : 'visible')};
  right: 55px;
  cursor: pointer;
`;

const SubmitBtn = styled.div`
  position: absolute;
  right: 0px;
  padding: 15px 15px 15px 0px;
  cursor: pointer;

  &::before {
    content: '|';
    margin-right: 10px;
    color: rgba(0, 0, 0, 0.1);
  }
`;
