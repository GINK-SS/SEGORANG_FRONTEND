import styled from 'styled-components';

interface LoadingSpinnerProps {
  isLoading: boolean;
}

/**
 * @param isLoading - 로딩 여부 확인
 */

const LoadingSpinner = ({ isLoading }: LoadingSpinnerProps) => {
  return (
    <>
      <LoadingBackground isLoading={isLoading} />
      <Spinner isLoading={isLoading} />
    </>
  );
};

export default LoadingSpinner;

const LoadingBackground = styled.div<{ isLoading: boolean }>`
  position: absolute;
  display: ${(props) => (props.isLoading ? 'block' : 'none')};
  z-index: 10;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Spinner = styled.span<{ isLoading: boolean }>`
  position: absolute;
  display: ${(props) => (props.isLoading ? 'block' : 'none')};
  z-index: 11;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;

  &::after,
  &::before {
    content: '';
    width: 24px;
    height: 24px;
    position: absolute;
    border-radius: 50%;
    background: ${(props) => props.theme.sejongCrimsonRed};
    animation: spin 1s linear infinite;
    transform-origin: 0px 100%;
  }

  &::before {
    transform-origin: 0 50%;
    background: ${(props) => props.theme.sejongGray};
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
