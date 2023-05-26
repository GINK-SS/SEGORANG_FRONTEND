import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { fetchBoardItemList } from '../../api/board';
import { userInfoState } from '../../atoms';
import Notice from '../../components/main/aside/Notice';
import User from '../../components/main/aside/User';

const Aside = () => {
  const [notice, setNotice] = useState({ title: '', postId: 0 });
  const history = useHistory();
  const { userNickname, userName, userMajor, accessToken } =
    useRecoilValue(userInfoState);
  const resetUserInfo = useResetRecoilState(userInfoState);

  const onBookMark = () => console.log('북마크 클릭');
  const onMyPage = () => console.log('마이페이지 클릭');
  const onLogout = () => {
    localStorage.removeItem('sgrUserToken');
    resetUserInfo();
    history.replace('/login');
  };

  const onNotice = (postId: number) => history.push(`/post/${postId}?boardTitle=notice`);

  useEffect(() => {
    const getNoticeData = async () => {
      const {
        result: { data },
      } = await fetchBoardItemList({
        boardTitle: 'notice',
        page: 1,
        limit: 1,
        accessToken,
      });

      setNotice({ title: data[0].post_title, postId: data[0].post_id });
    };

    getNoticeData();
  }, [accessToken]);

  return (
    <>
      <User
        nickname={userNickname}
        name={userName}
        major={userMajor}
        onBookMark={onBookMark}
        onMyPage={onMyPage}
        onLogout={onLogout}
      />

      <Notice content={notice.title} onClick={() => onNotice(notice.postId)} />
    </>
  );
};

export default Aside;
