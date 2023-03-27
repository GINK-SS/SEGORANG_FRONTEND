import styled from 'styled-components';

interface MainBestItemProps {
  title: string;
  index: number;
}

function MainBestItem({ title, index }: MainBestItemProps) {
  return (
    <BestItem>
      <span>{index + 1}</span>
      <span>{title.length > 16 ? `${title.slice(0, 17)}	…` : title}</span>
    </BestItem>
  );
}

export default MainBestItem;

const BestItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 0 8px 15px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  span {
    &:first-child {
      width: 20px;
      margin-right: 15px;
      font-size: 25px;
      font-weight: 600;
      font-style: italic;
      color: ${(props) => props.theme.accentColor};
    }

    &:last-child {
      cursor: pointer;

      &:hover {
        color: ${(props) => props.theme.sejongCrimsonRed};
      }
    }
  }
`;
