import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { fetchPostInfo } from '../api/post';
import { userInfoState } from '../atoms';
import Post from '../container/post/Post';
import Update from '../container/post/Update';
import { PostInfo, PostURLParams } from '../types/post';

const PostPage = () => {
  const { postId }: PostURLParams = useParams();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const status = searchParams.get('status');
  const { accessToken } = useRecoilValue(userInfoState);
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

  return status === 'modify' ? (
    <Update
      status="modify"
      boardTitle={postInfo.board_title}
      postTitle={postInfo.post_title}
      modContent={content}
    />
  ) : (
    <Post postId={postId} postInfo={postInfo} content={content} />
  );
};

export default PostPage;
