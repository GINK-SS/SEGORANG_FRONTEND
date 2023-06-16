import { useLocation } from 'react-router-dom';
import Container from '../../components/nav/Container';
import Item from '../../components/nav/Item';
import Wrapper from '../../components/nav/Wrapper';
import { data } from '../../lib/data';

const BoardNav = () => {
  const { pathname } = useLocation();

  const navList = data.navList.map((wrapper, index) => (
    <Wrapper key={index}>
      {wrapper.map((nav, index) => (
        <Item
          key={index}
          title={nav.title}
          link={`/board/${nav.link}`}
          isCurrent={pathname.includes(`/board/${nav.link}`)}
        />
      ))}
    </Wrapper>
  ));

  return <Container>{navList}</Container>;
};

export default BoardNav;
