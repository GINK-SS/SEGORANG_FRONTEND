import { faBullhorn, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

interface NoticeProps {
  content: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const Notice = ({ content, onClick }: NoticeProps) => {
  return (
    <Container onClick={onClick}>
      <Wrapper>
        <div>
          <FontAwesomeIcon icon={faBullhorn} color="#990011" />
          <Title>[공지]</Title>
          {content.length > 17 ? `${content.slice(0, 17)}…` : content}
        </div>

        <FontAwesomeIcon icon={faChevronRight} color="rgba(0,0,0,0.5)" />
      </Wrapper>
    </Container>
  );
};

export default Notice;

const Container = styled.div`
  margin-top: 20px;
  padding: 13px 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.03);
  cursor: pointer;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${(props) => props.theme.sejongGray};
`;

const Title = styled.span`
  margin: 0 5px 0 10px;
  color: ${(props) => props.theme.accentColor};
`;
