import styled from 'styled-components';

interface WeeklyTopItemProps {
  title: string;
  index: number;
  onPost: React.MouseEventHandler<HTMLSpanElement>;
}

function WeeklyTopItem({ title, index, onPost }: WeeklyTopItemProps) {
  return (
    <BestItem>
      <span>{index + 1}</span>
      <span onClick={onPost}>{title.length > 16 ? `${title.slice(0, 17)}…` : title}</span>
    </BestItem>
  );
}

export default WeeklyTopItem;

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
      color: ${({ theme }) => theme.accentColor};
    }

    &:last-child {
      cursor: pointer;

      &:hover {
        color: ${({ theme }) => theme.sejongCrimsonRed};
      }
    }
  }
`;
