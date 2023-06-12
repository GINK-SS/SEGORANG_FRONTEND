import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { fetchPostInfo } from '../../api/post';
import { userInfoState } from '../../atoms';
import Content from '../../components/post/Content';
import Header from '../../components/post/Header';
import { PostInfo } from '../../types/post';

interface PostProps {
  postId: string;
}

const Post = ({ postId }: PostProps) => {
  const [postInfo, setPostInfo] = useState<PostInfo>({
    board_title: '',
    post_title: '',
    writer: '',
    content: '',
    view_num: 0,
    like_num: 0,
    created_at: '',
    updated_at: '',
  });
  const { accessToken } = useRecoilValue(userInfoState);

  useEffect(() => {
    const getPostInfo = async () => {
      const { msg, result } = await fetchPostInfo({
        postId,
        accessToken,
      });

      if (msg === 'success') setPostInfo(result);
    };

    getPostInfo();
  }, [accessToken, postId]);

  return (
    <>
      <Header postInfo={postInfo} />
      <Content content={postInfo.content} />
    </>
  );
};

export default Post;
