import styled from 'styled-components';

const MediaSejongItem = styled.a`
  flex: 1;
  margin-right: 10px;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  cursor: pointer;

  &:last-child {
    margin-right: 0px;
  }

  &:hover {
    background-color: #f2f2f2;

    img {
      transform: scale(1.02);
    }

    p {
      color: ${(props) => props.theme.sejongCrimsonRed};
    }
  }
`;

const MediaSejongThumbNail = styled.img`
  max-width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: 0.2s;
`;

const MediaSejongDescription = styled.p`
  margin: 10px 5px;
  line-height: 20px;
  color: #333;
`;

interface MainYoutubeItemProps {
  thumbNail: string;
  title: string;
  link: string;
}

function MainYoutubeItem({ thumbNail, title, link }: MainYoutubeItemProps) {
  return (
    <MediaSejongItem href={link} target="_blank">
      <MediaSejongThumbNail alt={title} src={thumbNail} />

      <MediaSejongDescription>{title}</MediaSejongDescription>
    </MediaSejongItem>
  );
}

export default MainYoutubeItem;
