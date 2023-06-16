import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';

interface ContentProps {
  content: EditorState;
}

const Content = ({ content }: ContentProps) => {
  return (
    <ContentWrapper>
      <Editor
        readOnly
        toolbarHidden
        localization={{ locate: 'ko' }}
        editorState={content}
        editorStyle={{ lineHeight: 1.4 }}
      />
    </ContentWrapper>
  );
};

export default Content;

const ContentWrapper = styled.div`
  padding: 40px;
`;
