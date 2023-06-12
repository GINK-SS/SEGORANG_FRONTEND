import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
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
  const [content, setContent] = useState(EditorState.createEmpty());
  const { accessToken } = useRecoilValue(userInfoState);

  useEffect(() => {
    const getPostInfo = async () => {
      const { msg, result } = await fetchPostInfo({
        postId,
        accessToken,
      });

      if (msg === 'success') setPostInfo(result);
    };

    const { contentBlocks, entityMap } = htmlToDraft(postInfo.content);
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState = EditorState.createWithContent(contentState);

    getPostInfo();
    setContent(editorState);
  }, [accessToken, postId, postInfo.content]);

  return (
    <>
      <Header postInfo={postInfo} />
      <Content content={content} />
    </>
  );
};

export default Post;
