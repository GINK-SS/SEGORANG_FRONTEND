import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../../atoms';
import BoardHeader from '../../components/container/board/BoardHeader';
import PostList from '../../components/container/board/PostList';
import BoardListFooter from '../../components/container/board/BoardListFooter';
import NavContainer from '../../components/container/board/NavContainer';
import { BoardURLParams, Post } from '../../types/board';
import { fetchPostList } from '../../api/board';

function NormalBoard() {
  const [postList, setPostList] = useState<Post[]>([]);
  const { boardTitle }: BoardURLParams = useParams();
  const { search } = useLocation();
  const userInfo = useRecoilValue(userInfoState);

  const getPostList = async () => {
    const page = search ? search.slice(6) : '1';
    const {
      result: { data },
    } = await fetchPostList({
      boardTitle,
      page: Number(page),
      accessToken: userInfo.accessToken,
    });

    setPostList(data);
  };

  useEffect(() => {
    getPostList();
  }, [boardTitle, search]);

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
