import styled from 'styled-components';

const NoItem = () => {
  return (
    <Container>
      <p>등록된 글이 없습니다.</p>
    </Container>
  );
};

export default NoItem;

const Container = styled.div`
  padding: 150px 0;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  text-align: center;
`;
