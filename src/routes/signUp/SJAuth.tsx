import ProgressBar from '@ramonak/react-progress-bar';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { fetchSJAuth } from '../../api/signUp';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import BackgroundPointContainer from '../../components/signUp/BackgroundPointContainer';
import { SJAuthFormData } from '../../types/signUp';

function SJAuth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    watch,
    getValues,
  } = useForm<SJAuthFormData>({ mode: 'onChange' });
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const submitSJAuthInput = async () => {
    try {
      setIsLoading(true);
      const studentId = getValues('studentId');
      const studentPw = getValues('studentPw');
      const { result, msg } = await fetchSJAuth(studentId, studentPw);
      if (msg !== 'success') {
        setError('studentId', { message: '학번이나 비밀번호를 잘못 입력하였습니다' });
        setIsLoading(false);
        return;
      }

      if (result?.in_db) {
        setError('studentId', { message: '세고랑 회원입니다 로그인 해주세요' });
        setIsLoading(false);
        return;
      }

      history.push({
        pathname: '/signUpForm',
        state: {
          studentId,
          userName: result?.AuthResponse[4].name,
          userMajor: result?.AuthResponse[4].major,
        },
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('studentId', { message: '서버 오류입니다. 나중에 다시 시도해주세요.' });
    }
  };

  return (
    <SignUpBackground>
      <LoadingSpinner isLoading={isLoading} />
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
              onFocus={() => {
                if (!!getValues('studentId') && !!errors.studentId) {
                  clearErrors('studentId');
                }
              }}
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
              disabled={
                !watch('studentId') ||
                !watch('studentPw') ||
                !(Object.keys(errors).length === 0)
              }
            >
              인증하기
            </SignUpBtn>
          </SignUpForm>
        </SignUpWrapper>
        <BackgroundPointContainer />
      </SignUpContainer>
    </SignUpBackground>
  );
}

export default SJAuth;

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

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
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
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  &:focus {
    outline: 0px;
    border: 1px solid rgba(0, 0, 0, 0.1);
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
