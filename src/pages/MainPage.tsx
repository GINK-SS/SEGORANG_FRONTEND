import Container from '../components/main/Container';
import Aside from '../container/main/Aside';
import Content from '../container/main/Content';

const MainPage = () => {
  return (
    <Container>
      <div>
        <Content />
      </div>

      <div>
        <Aside />
      </div>
    </Container>
  );
};

export default MainPage;
