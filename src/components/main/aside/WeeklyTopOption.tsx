import styled from 'styled-components';

interface WeeklyTopOptionProps {
  isView: boolean;
  onView: () => void;
  onRecommend: () => void;
}

const WeeklyTopOption = ({ isView, onView, onRecommend }: WeeklyTopOptionProps) => {
  return (
    <OptionWrapper>
      <Option isActive={isView} onClick={onView}>
        조회순
      </Option>
      <Option isActive={!isView} onClick={onRecommend}>
        추천순
      </Option>
    </OptionWrapper>
  );
};

export default WeeklyTopOption;

const OptionWrapper = styled.div`
  display: flex;
  border-bottom: 1.5px solid rgba(0, 0, 0, 0.3);
`;

const Option = styled.div<{ isActive: boolean }>`
  flex: 1;
  padding: 15px 0;
  text-align: center;
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  color: ${({ isActive, theme }) =>
    isActive ? theme.sejongCrimsonRed : 'rgba(0, 0, 0, 0.5)'};
  background-color: ${({ isActive }) => (isActive ? 'rgba(0,0,0,0.03)' : '#FFF')};
  cursor: pointer;

  &:first-child {
    border-right: 1.5px solid rgba(0, 0, 0, 0.05);
  }

  &:last-child {
    border-left: 1.5px solid rgba(0, 0, 0, 0.05);
  }

  &:hover {
    color: ${({ theme }) => theme.sejongCrimsonRed};
    opacity: ${({ isActive }) => (isActive ? '1' : '0.7')};
  }
`;
