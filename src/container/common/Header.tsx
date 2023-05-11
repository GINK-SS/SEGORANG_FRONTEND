import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userInfoState } from '../../atoms';
import Logo from '../../components/header/Logo';
import NavLink from '../../components/header/NavLink';
import Search from '../../components/header/Search';
import Wrapper from '../../components/header/Wrapper';

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const userInfo = useRecoilValue(userInfoState);
  const resetUserInfo = useResetRecoilState(userInfoState);

  const onLogo = () => history.push('/');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);
  const onDelete = () => setSearchValue('');
  const onSubmit = () => console.log(`${searchValue} 검색`);

  const onLogout = () => {
    localStorage.removeItem('sgrUserToken');
    resetUserInfo();
    history.replace('/login');
  };

  return (
    <Wrapper>
      <Logo onClick={onLogo} />
      {pathname === '/' ? (
        <Search
          placeholder="세고랑 통합검색"
          value={searchValue}
          onChange={(e) => onChange(e)}
          onDelete={onDelete}
          onSubmit={onSubmit}
        />
      ) : (
        <NavLink userNickname={userInfo.userNickname} onLogout={onLogout} />
      )}
    </Wrapper>
  );
};

export default Header;
