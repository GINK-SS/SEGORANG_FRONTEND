import styled from 'styled-components';

interface BannerProps {
  img: string;
}

const Banner = ({ img }: BannerProps) => {
  return (
    <Box>
      <Text>COMING SOON</Text>
      <Img src={img} alt="centerBanner" />
    </Box>
  );
};

export default Banner;

const Box = styled.div`
  position: relative;
  width: 95%;
  height: 120px;
  margin: 10px auto;
`;

const Text = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  font-size: 60px;
  font-family: 'Concert One', cursive;
  text-align: center;
  letter-spacing: 3px;
  color: ${(props) => props.theme.sejongCrimsonRed};
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
