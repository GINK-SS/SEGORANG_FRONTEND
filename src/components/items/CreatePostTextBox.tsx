import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

interface CreatePostTextBoxProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: EditorState;
  setContent: React.Dispatch<React.SetStateAction<EditorState>>;
}

const CreatePostTextBox = ({
  title,
  setTitle,
  content,
  setContent,
}: CreatePostTextBoxProps) => {
  return (
    <Container>
      <Title
        ref={titleRef}
        value={title}
        onChange={({ target: { value } }) => setTitle(value)}
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

export default CreatePostTextBox;

const Container = styled.div`
  position: relative;
  min-height: calc(100vh - 405px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 0;
  background-color: #fff;
`;

const Title = styled.textarea`
  width: calc(100% - 120px);
  height: 100%;
  margin: 60px;
  resize: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 40px;
  font-weight: 500;
  border: 0px;

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
    padding: 20px 60px;
    min-height: 300px;
    cursor: text;
  }
  .toolbar-class {
    z-index: 2;
    position: sticky;
    top: 67px;
    justify-content: center;
    background-color: #fcfcfc;

    .rdw-inline-wrapper,
    .rdw-fontsize-wrapper {
      margin-right: 30px;
    }
  }
`;
