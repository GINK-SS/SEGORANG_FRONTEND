import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { fetchPostList } from '../../api';
import { userInfoState } from '../../atoms';
import BoardHeader from '../../components/BoardHeader';
import PostList from '../../components/PostList';
import BoardListFooter from '../../components/BoardListFooter';
import NavContainer from '../../components/NavContainer';
import { BoardURLParams, Post } from '../../types/board';

function NormalBoard() {
  const [postList, setPostList] = useState<Post[]>([]);
  const { boardTitle }: BoardURLParams = useParams();
  const userInfo = useRecoilValue(userInfoState);

  const getPostList = async () => {
    const {
      result: { data },
    } = await fetchPostList(boardTitle, userInfo.accessToken);
    setPostList(data);
  };

  useEffect(() => {
    getPostList();
  }, [boardTitle]);

  return (
    <>
      <BoardHeader />
      <NavContainer />
      <PostList postList={postList} />
      <BoardListFooter />
    </>
  );
}

export default NormalBoard;
