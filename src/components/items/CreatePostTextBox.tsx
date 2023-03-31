import { EditorState, convertToRaw } from 'draft-js';
import { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import styled from 'styled-components';

const CreatePostTextBox = () => {
  const [title, setTitle] = useState(EditorState.createEmpty());
  const [content, setContent] = useState(EditorState.createEmpty());

  return (
    <Container>
      <Title>
        <Editor
          toolbarHidden
          toolbar={{
            options: [],
            inline: { options: [] },
            fontSize: { options: [40] },
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
            options: ['inline', 'fontSize', 'textAlign', 'colorPicker', 'emoji'],
            inline: {
              options: ['bold', 'italic', 'underline', 'strikethrough'],
            },
            fontSize: {
              inDropdown: false,
            },
          }}
          placeholder="내용 (이미지는 추후 구현)"
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
  min-height: calc(100vh - 395px);
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
    justify-content: center;

    .rdw-inline-wrapper,
    .rdw-fontsize-wrapper,
    .rdw-text-align-wrapper,
    .rdw-colorpicker-wrapper {
      margin-right: 30px;
    }
  }
`;

const Separator = styled.div`
  margin: 0 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`;
