import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import styled from 'styled-components';

interface CreatePostTextBoxProps {
  title: EditorState;
  setTitle: React.Dispatch<React.SetStateAction<EditorState>>;
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
      <Title>
        <Editor
          toolbarHidden
          toolbar={{
            options: [],
            inline: { options: [] },
            fontSize: { options: [] },
            textAlign: { options: [] },
          }}
          placeholder="제목"
          localization={{ locate: 'ko' }}
          editorState={title}
          onEditorStateChange={setTitle}
        />
      </Title>
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

const Title = styled.div`
  margin: 60px 60px 0;
  font-size: 40px;
  cursor: text;
`;

const Content = styled.div`
  .wrapper-class {
    margin-top: 30px;
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

const Separator = styled.div`
  margin: 0 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;
