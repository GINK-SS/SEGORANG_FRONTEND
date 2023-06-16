import styled from 'styled-components';

interface BoardPhotoItemProps {
  thumbNail: string;
  title: string;
  link: string;
}

function BoardPhotoItem({ thumbNail, title, link }: BoardPhotoItemProps) {
  return (
    <Item href={link} target="_blank">
      <ThumbNail alt={title} src={thumbNail} />
      <Description>{title.length > 30 ? `${title.slice(0, 31)} …` : title}</Description>
    </Item>
  );
}

export default BoardPhotoItem;

const Item = styled.a`
  flex: 1;
  margin-right: 10px;
  border-radius: 10px 10px 0 0;
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

const ThumbNail = styled.img`
  max-width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: 0.2s;
`;

const Description = styled.p`
  margin: 10px 5px;
  line-height: 20px;
  color: #333;
`;
