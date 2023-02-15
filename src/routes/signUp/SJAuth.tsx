import ProgressBar from '@ramonak/react-progress-bar';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fetchSJAuth } from '../../api';

const animation = keyframes`
  0% {
    transform:rotate(0deg);
  }
  100%{
    transform:rotate(360deg);
  }
`;

const SignUpBackground = styled.div`
  display: flex;
  width: 100vw;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.03);
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const LoadingBG = styled.div<{ isLoading: boolean }>`
  position: absolute;
  display: ${(props) => (props.isLoading ? 'block' : 'none')};
  z-index: 4;
  min-width: 100%;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Spinner = styled.span<{ isLoading: boolean }>`
  position: absolute;
  display: ${(props) => (props.isLoading ? 'block' : 'none')};
  z-index: 5;
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

const SignUpContainer = styled.div`
  position: relative;
`;

const SignUpWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 3;
  width: 700px;
  margin: 30px;
  background-color: #fff;
  flex-direction: column;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.25);
  padding: 50px 60px;
  border-radius: 20px 100px / 120px;

  @media screen and (max-width: 768px) {
    width: 100vw;
    min-height: 100vh;
    border-radius: 0px;
    margin: 0;
    padding: 30px;
  }
`;

const SignUpTop = styled.div`
  text-align: center;
  margin: 0 -60px;
`;

const SignUpTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const SignUpDesc = styled.p`
  margin-bottom: 10px;
  text-align: left;
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.5);
  &:nth-child(2) {
    margin-top: 50px;
  }
  &:nth-child(3) {
    margin-bottom: 20px;
    font-size: 1.3rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
  }
  &:nth-child(4) {
    margin-bottom: 50px;
    font-size: 0.75rem;
  }
`;

const SignUpDescAccent = styled.span`
  color: ${(props) => props.theme.sejongCrimsonRed};
  font-weight: 500;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignUpInput = styled.input`
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 15px;
  padding: 3px 20px;
  background-color: rgba(0, 0, 0, 0.03);
  &:hover {
    border: 1px solid ${(props) => props.theme.sejongCrimsonRed};
  }
  &:focus {
    outline: 0px;
    border: 1px solid ${(props) => props.theme.sejongCrimsonRed};
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }
`;

const SignUpErrorMsg = styled.span<{ isError: boolean }>`
  visibility: ${(props) => (props.isError ? 'visible' : 'hidden')};
  margin-left: 5px;
  font-size: 15px;
  font-weight: 500;
  color: #e01919;
  height: 20px;

  @media screen and (max-width: 768px) {
    margin-bottom: 100px;
  }
`;

const SignUpBtn = styled.button<{ isActive: boolean }>`
  min-width: 450px;
  height: 40px;
  margin: 150px auto 0px;
  border-radius: 10px;
  font-size: 1rem;
  color: ${(props) => (props.isActive ? '#FFF' : 'rgba(0,0,0,0.25)')};
  background-color: ${(props) =>
    props.isActive ? props.theme.sejongCrimsonRed : 'rgba(0,0,0,0.03)'};
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: ${(props) => (props.isActive ? 'pointer' : 'default')};
  transition-property: color, background-color;
  transition-duration: 0.3s;

  @media screen and (max-width: 768px) {
    position: absolute;
    min-width: 0px;
    bottom: 50px;
    right: 50px;
    left: 50px;
  }
`;

const SignUpBackPoint = styled.span<{ egg?: boolean }>`
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

interface ISJAuthFormData {
  studentId: string;
  studentPw: string;
}

interface IInDB {
  in_db: boolean;
  msg: string;
  result: null;
  status_code: number;
  status_msg: string;
}

interface ISJAuthResponse {
  result?: {
    AuthResponse: [
      boolean,
      boolean,
      number,
      string,
      { major: string; name: string },
      string
    ];
  };
  msg: string;
  process_time: number;
  description?: string;
}

function SJAuth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    getValues,
  } = useForm<ISJAuthFormData>({ mode: 'onChange' });
  const history = useHistory();
  const [eggGINKSS, setEggGINKSS] = useState(0);
  const [eggSCOF, setEggSCOF] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const submitSJAuthInput = async () => {
    const studentId = getValues('studentId');
    const studentPw = getValues('studentPw');
    const SJAuthResponse: ISJAuthResponse = await (
      await fetchSJAuth({ studentId, studentPw })
    ).json();

    if (SJAuthResponse.msg !== 'success') {
      setError('studentId', { message: '학번이나 비밀번호를 잘못 입력하였습니다' });
      return;
    }
    history.push({
      pathname: '/signUpForm',
      state: {
        studentId,
        userName: SJAuthResponse.result?.AuthResponse[4].name,
        userMajor: SJAuthResponse.result?.AuthResponse[4].major,
      },
    });
  };

  return (
    <SignUpBackground>
      <LoadingBG isLoading={isLoading} />
      <Spinner isLoading={isLoading} />
      <SignUpContainer>
        <SignUpWrapper>
          <SignUpTop>
            <SignUpTitle>회원가입</SignUpTitle>
            <ProgressBar
              completed={50}
              customLabel=" "
              height="5px"
              bgColor="rgba(195, 0, 47)"
              borderRadius="10px"
            />
          </SignUpTop>
          <SignUpDesc>세종대 구성원 인증을 위해</SignUpDesc>
          <SignUpDesc>
            <SignUpDescAccent>세종대학교 포털 아이디와 비밀번호</SignUpDescAccent>를
            입력해주세요.
          </SignUpDesc>
          <SignUpDesc>
            인증을 위해서만 사용하고, 비밀번호는 절대 저장하지 않습니다.
          </SignUpDesc>
          <SignUpForm onSubmit={handleSubmit(submitSJAuthInput)}>
            <SignUpInput
              {...register('studentId', { required: '학번을 입력하세요' })}
              type="text"
              placeholder="학번"
            />
            <SignUpInput
              {...register('studentPw', { required: '비밀번호를 입력하세요' })}
              type="password"
              placeholder="비밀번호"
            />
            <SignUpErrorMsg isError={!(Object.keys(errors).length === 0)}>
              {errors?.studentId?.message || errors?.studentPw?.message}
            </SignUpErrorMsg>
            <SignUpBtn
              isActive={
                !!(Object.keys(errors).length === 0) &&
                !!watch('studentId') &&
                !!watch('studentPw')
              }
              disabled={!watch('studentId') || !watch('studentPw')}
            >
              인증하기
            </SignUpBtn>
          </SignUpForm>
        </SignUpWrapper>
        <SignUpBackPoint>
          <span onClick={() => setEggSCOF((prev) => prev + 1)}>S</span>
          <span onClick={() => setEggGINKSS((prev) => prev + 1)}>G</span>R
        </SignUpBackPoint>
        <SignUpBackPoint>☻</SignUpBackPoint>
        <SignUpBackPoint egg={eggGINKSS >= 2}>GINK-SS</SignUpBackPoint>
        <SignUpBackPoint egg={eggSCOF >= 2}>SCOF</SignUpBackPoint>
        <SignUpBackPoint>❁</SignUpBackPoint>
        <SignUpBackPoint>SEJONG COMMUNITY</SignUpBackPoint>
        <SignUpBackPoint>✧</SignUpBackPoint>
      </SignUpContainer>
    </SignUpBackground>
  );
}

export default SJAuth;
