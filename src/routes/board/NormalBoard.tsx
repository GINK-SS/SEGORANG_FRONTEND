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
  const [lastPage, setLastPage] = useState(0);
  const { boardTitle }: BoardURLParams = useParams();
  const { search } = useLocation();
  const userInfo = useRecoilValue(userInfoState);
  const page = search ? search.slice(6) : '1';

  const getPostList = async () => {
    const {
      result: { data, lastPage },
    } = await fetchPostList({
      boardTitle,
      page: Number(page),
      accessToken: userInfo.accessToken,
    });

    setPostList(data);
    setLastPage(lastPage);
  };

  useEffect(() => {
    getPostList();
  }, [boardTitle, search]);

  return (
    <>
      <BoardHeader />
      <NavContainer />
      <PostList postList={postList} />
      <BoardListFooter page={Number(page)} lastPage={lastPage} />
    </>
  );
}

export default NormalBoard;
