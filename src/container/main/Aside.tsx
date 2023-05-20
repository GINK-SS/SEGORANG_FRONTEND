import { useHistory } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { userInfoState } from '../../atoms';
import User from '../../components/main/aside/User';

const Aside = () => {
  const history = useHistory();
  const { userNickname, userName, userMajor } = useRecoilValue(userInfoState);
  const resetUserInfo = useResetRecoilState(userInfoState);

  const onBookMark = () => console.log('북마크 클릭');
  const onMyPage = () => console.log('마이페이지 클릭');
  const onLogout = () => {
    localStorage.removeItem('sgrUserToken');
    resetUserInfo();
    history.replace('/login');
  };
  return (
    <User
      nickname={userNickname}
      name={userName}
      major={userMajor}
      onBookMark={onBookMark}
      onMyPage={onMyPage}
      onLogout={onLogout}
    />
  );
};

export default Aside;
