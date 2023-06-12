import { useLocation, useParams } from 'react-router-dom';
import Wrapper from '../components/post/Wrapper';
import Post from '../container/post/Post';
import { PostURLParams } from '../types/post';

const PostPage = () => {
  const { postId }: PostURLParams = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const status = searchParams.get('status');

  return (
    <Wrapper>
      <Post postId={postId} />
    </Wrapper>
  );
};

export default PostPage;
