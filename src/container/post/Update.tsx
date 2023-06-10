import { convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { fetchCreatePost } from '../../api/post';
import { userInfoState } from '../../atoms';
import UpdateContent from '../../components/post/UpdateContent';
import UpdateHeader from '../../components/post/UpdateHeader';
import UpdateWrapper from '../../components/post/UpdateWrapper';
import { data } from '../../lib/data';

interface UpdateProps {
  boardTitle: string;
  status: string;
}

const Update = ({ boardTitle, status }: UpdateProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(EditorState.createEmpty());
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const contentToHtml = draftToHtml(convertToRaw(content.getCurrentContent()));
  const { accessToken } = useRecoilValue(userInfoState);
  const history = useHistory();

  const handleResizeTitleHeight = () => {
    if (titleRef.current) {
      titleRef.current.style.height = 'auto';
      titleRef.current.style.height = titleRef.current.scrollHeight + 'px';
    }
  };

  const onRegister = async () => {
    setIsLoading(true);

    const { msg, result } = await fetchCreatePost({
      postTitle: title,
      boardTitle,
      content: contentToHtml,
      accessToken,
    });

    if (msg === 'success') {
      history.replace(`/post/${result}?boardTitle=${boardTitle}`);
    }

    setIsLoading(false);
  };

  const onTitle = () => {
    if (titleRef.current) setTitle(titleRef.current.value);
  };

  return (
    <UpdateWrapper>
      <UpdateHeader
        status={status}
        isLoading={isLoading}
        isEmpty={!title || contentToHtml === '<p></p>\n'}
        boardTitle={data.boardTitleToKR[boardTitle]}
        onRegister={onRegister}
      />

      <UpdateContent
        titleRef={titleRef}
        title={title}
        onTitle={onTitle}
        handleResizeTitleHeight={handleResizeTitleHeight}
        content={content}
        setContent={setContent}
      />
    </UpdateWrapper>
  );
};

export default Update;
