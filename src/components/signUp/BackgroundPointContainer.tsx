import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const BackgroundPointContainer = () => {
  const [ginkss, setGinkss] = useState(0);
  const [scof, setScof] = useState(0);

  return (
    <>
      <BackPoint>
        <span onClick={() => setScof((prev) => prev + 1)}>S</span>
        <span onClick={() => setGinkss((prev) => prev + 1)}>G</span>R
      </BackPoint>
      <BackPoint>☻</BackPoint>
      <BackPoint egg={ginkss >= 2}>GINK-SS</BackPoint>
      <BackPoint egg={scof >= 2}>SCOF</BackPoint>
      <BackPoint>❁</BackPoint>
      <BackPoint>SEJONG COMMUNITY</BackPoint>
      <BackPoint>✧</BackPoint>
    </>
  );
};

export default BackgroundPointContainer;

const animation = keyframes`
  0% {
    transform:rotate(0deg);
  }
  100%{
    transform:rotate(360deg);
  }
`;

const BackPoint = styled.span<{ egg?: boolean }>`
  position: absolute;
  z-index: 1;
  font-weight: 700;
  font-size: 250px;
  color: ${(props) => props.theme.sejongCrimsonRed};
  opacity: 3%;
  cursor: default;

  &:nth-child(2) {
    font-size: 350px;
    letter-spacing: 5px;
    bottom: -204px;
    right: -200px;
  }

  &:nth-child(3) {
    top: -104px;
    left: -57px;
    transform: rotate(-40deg);
  }

  &:nth-child(4) {
    display: ${(props) => (props.egg ? 'block' : 'none')};
    font-size: 60px;
    top: 200px;
    right: -110px;
    opacity: 50%;
    transform: rotate(90deg);
  }

  &:nth-child(5) {
    display: ${(props) => (props.egg ? 'block' : 'none')};
    font-size: 60px;
    left: -70px;
    bottom: 250px;
    transform: rotate(270deg);
    opacity: 50%;
  }

  &:nth-child(6) {
    font-size: 400px;
    left: -150px;
    bottom: -150px;
    animation: ${animation} 500s linear infinite;
  }

  &:nth-child(7) {
    font-size: 60px;
    right: 30px;
    top: -20px;
  }

  &:nth-child(8) {
    font-size: 400px;
    top: -50px;
    right: -250px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
