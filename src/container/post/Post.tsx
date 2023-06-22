import { EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { fetchDeletePost } from '../../api/post';
import { notificationState, userInfoState } from '../../atoms';
import LoadingMessage from '../../components/common/LoadingMessage';
import ModalMessage from '../../components/common/ModalMessage';
import Content from '../../components/post/Content';
import Header from '../../components/post/Header';
import Options from '../../components/post/Options';
import Wrapper from '../../components/post/Wrapper';
import { PostInfo } from '../../types/post';

interface PostProps {
  postId: string;
  postInfo: PostInfo;
  content: EditorState;
}

const Post = ({ postId, postInfo, content }: PostProps) => {
  const { userNickname, accessToken } = useRecoilValue(userInfoState);
  const [clickDelete, setClickDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setNotification = useSetRecoilState(notificationState);
  const history = useHistory();

  useEffect(() => {
    if (clickDelete || isLoading) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [clickDelete, isLoading]);

  const onModify = () => history.push(`/post/${postId}?status=modify`);

  const onDelete = () => setClickDelete(true);

  const onDeleteYes = async () => {
    setClickDelete(false);
    setIsLoading(true);

    const response = await fetchDeletePost({ postId, accessToken });

    if (response) {
      setIsLoading(false);
      history.replace(`/board/${postInfo.board_title}`);
      setNotification({ message: '글이 삭제되었습니다.', visible: true });
    }
  };

  const onCancel = () => setClickDelete(false);

  return (
    <>
      {clickDelete ? (
        <ModalMessage
          message="글을 삭제하시겠습니까?"
          onLeft={onDeleteYes}
          leftText="확인"
          onRight={onCancel}
          rightText="취소"
        />
      ) : null}

      {isLoading ? (
        <LoadingMessage message="글을 삭제 중입니다." isLoading={isLoading} />
      ) : null}

      <Wrapper>
        <Header postInfo={postInfo} />
        <Content content={content} />
      </Wrapper>

      <Options
        isMine={userNickname === postInfo.writer}
        onModify={onModify}
        onDelete={onDelete}
      />
    </>
  );
};

export default Post;
