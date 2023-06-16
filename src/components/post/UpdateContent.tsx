import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

interface UpdateContentProps {
  titleRef: React.RefObject<HTMLTextAreaElement>;
  title: string;
  onTitle: () => void;
  handleResizeTitleHeight: () => void;
  content: EditorState;
  setContent: React.Dispatch<React.SetStateAction<EditorState>>;
}

const UpdateContent = ({
  titleRef,
  title,
  onTitle,
  handleResizeTitleHeight,
  content,
  setContent,
}: UpdateContentProps) => {
  return (
    <Container>
      <Title
        ref={titleRef}
        value={title}
        onChange={onTitle}
        onInput={handleResizeTitleHeight}
        placeholder="제목"
        spellCheck={false}
        maxLength={100}
        rows={1}
        onKeyDown={(e) => {
          if (e.key === 'Enter') e.preventDefault();
        }}
      />
      <Separator />

      <Content>
        <Editor
          wrapperClassName="wrapper-class"
          editorClassName="editor-class"
          toolbarClassName="toolbar-class"
          toolbar={{
            options: ['inline', 'fontSize', 'emoji'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough'],
            },
          }}
          placeholder="내용을 입력해보세요"
          localization={{ locate: 'ko' }}
          editorState={content}
          onEditorStateChange={setContent}
        />
      </Content>
    </Container>
  );
};

export default UpdateContent;

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 386px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 0;
  background-color: #fff;
`;

const Title = styled.textarea`
  width: calc(100% - 120px);
  margin: 60px;
  border: 0px;
  resize: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 40px;
  font-weight: 500;
  box-sizing: border-box;

  &:focus {
    outline: 0;
  }
`;

const Separator = styled.div`
  margin: 0 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
  .wrapper-class {
    margin-top: 60px;
  }
  .editor-class {
    min-height: max(300px, calc(100vh - 700px));
    padding: 20px 60px;
    cursor: text;
  }
  .toolbar-class {
    position: sticky;
    top: 67px;
    z-index: 2;
    justify-content: center;
    background-color: #fcfcfc;

    .rdw-inline-wrapper,
    .rdw-fontsize-wrapper {
      margin-right: 30px;
    }
  }
`;
