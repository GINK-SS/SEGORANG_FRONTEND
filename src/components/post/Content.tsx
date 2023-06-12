import styled from 'styled-components';

interface ContentProps {
  content: string;
}

const Content = ({ content }: ContentProps) => {
  return (
    <ContentWrapper>
      <ContentText dangerouslySetInnerHTML={{ __html: content }} />
    </ContentWrapper>
  );
};

export default Content;

const ContentWrapper = styled.div`
  padding: 40px;
`;

const ContentText = styled.p`
  line-height: 1.8;
`;
