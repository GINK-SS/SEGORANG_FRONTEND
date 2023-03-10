import ProgressBar from '@ramonak/react-progress-bar';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fetchDuplicateId, fetchDuplicateNickname, fetchSignUp } from '../../api';

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

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignUpInputWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  margin: 20px 0 0;

  &:nth-child(-n + 3) {
    input {
      background-color: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(0, 0, 0, 0.05);
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.05);
      }
      &:focus {
        border: 1px solid rgba(0, 0, 0, 0.05);
      }
    }
  }

  &:nth-child(1) {
    margin-top: 30px;
  }
  &:nth-child(3) {
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
    margin-top: 5px;
  }
`;

const SignUpInputName = styled.span`
  width: 90px;
  margin-right: 20px;

  @media screen and (max-width: 768px) {
    width: 60px;
    font-size: 11px;
    margin-right: 10px;
  }
`;

const SignUpInput = styled.input<{
  isValid?: boolean;
  isDuplicate?: boolean;
  isEmpty?: boolean;
}>`
  flex-grow: 1;
  height: 40px;
  border: 1px solid
    ${(props) =>
      props.isValid
        ? props.isEmpty
          ? 'rgba(0, 0, 0, 0.05)'
          : props.isDuplicate
          ? 'rgba(0, 0, 0, 0.05)'
          : '#17bc14'
        : '#e01919'};
  border-radius: 10px;
  font-size: 15px;
  padding: 3px 20px;
  background-color: rgba(0, 0, 0, 0.03);
  &:hover {
    border: 1px solid
      ${(props) =>
        props.isValid
          ? props.isEmpty
            ? 'rgba(0, 0, 0, 0.1)'
            : props.isDuplicate
            ? 'rgba(0, 0, 0, 0.1)'
            : '#17bc14'
          : '#e01919'};
  }
  &:focus {
    outline: 0px;
    border: 1px solid
      ${(props) =>
        props.isValid
          ? props.isEmpty
            ? 'rgba(0, 0, 0, 0.1)'
            : props.isDuplicate
            ? 'rgba(0, 0, 0, 0.1)'
            : '#17bc14'
          : '#e01919'};
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }

  @media screen and (max-width: 768px) {
    min-width: 50px;
    height: 30px;
    font-size: 14px;
    padding: 2px 15px;
    &::placeholder {
      font-size: 10px;
    }
  }
`;

const DuplicateBtn = styled.button<{ isActive: boolean }>`
  max-width: 130px;
  height: 40px;
  padding: 0 10px;
  margin-left: 10px;
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px solid
    ${(props) => (props.isActive ? 'rgba(0,0,0,0.2)' : 'rgba(0, 0, 0, 0.05)')};
  border-radius: 10px;
  cursor: ${(props) => (props.isActive ? 'pointer' : 'default')};
  transition-property: border;
  transition-duration: 0.3s;

  @media screen and (max-width: 768px) {
    font-size: 10px;
    min-width: 40px;
    height: 30px;
    padding: 0 5px;
    word-break: keep-all;
  }
`;

const SignUpErrorMsg = styled.span<{ isDuplicate?: boolean }>`
  margin-top: 10px;
  margin-left: 120px;
  font-size: 15px;
  font-weight: 500;
  color: ${(props) =>
    props.isDuplicate === undefined || props.isDuplicate ? '#e01919' : '#17bc14'};
  height: 20px;

  @media screen and (max-width: 768px) {
    margin-left: 80px;
    margin-bottom: 10px;
    font-size: 10px;
    :nth-last-child(2) {
      margin-bottom: 100px;
    }
  }
`;

const SignUpBtn = styled.button<{ isActive?: boolean }>`
  min-width: 450px;
  height: 40px;
  margin: 50px auto 0px;
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
    right: 100px;
    left: 100px;
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

const SignUpComplete = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
`;

const SignUpCompleteDesc = styled.span`
  font-size: 1.3rem;
  margin-bottom: 30px;

  &:nth-child(2) {
    font-size: 1rem;
    margin-bottom: 100px;
  }
`;

const SignUpCompleteBtn = styled.button`
  min-width: 400px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  outline: 0px;
  padding: 10px;
  font-size: 1.5rem;
  letter-spacing: 5px;
  color: #fff;
  background-color: ${(props) => props.theme.sejongCrimsonRed};
  opacity: 85%;
  transition-property: opacity;
  transition-duration: 0.3s;
  cursor: pointer;

  &:hover {
    opacity: 100%;
  }

  @media screen and (max-width: 768px) {
    position: absolute;
    min-width: 0px;
    bottom: 50px;
    right: 100px;
    left: 100px;
    word-break: keep-all;
  }
`;

interface IInputData {
  userId: string;
  userPw: string;
  userPw2: string;
  userNickname: string;
}

interface ISJAuthState {
  studentId: string;
  userName: string;
  userMajor: string;
}

interface ICheckDuplicate {
  process_time: number;
  msg: string;
  result: { in_db: boolean };
}

interface ISignUpResponse {
  msg: string;
  description?: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setError,
    clearErrors,
  } = useForm<IInputData>({ mode: 'onChange' });
  const CHECK_REG = {
    ID_REG: /^[a-zA-Z0-9_]*$/,
    PW_REG1: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~!@#$%^&()\-_+=]).*$/,
    PW_REG2: /^[a-zA-Z0-9`~!@#$%^&()\-_+=\s]*$/,
    NICK_REG1: /^(?=.*[???-???a-zA-Z0-9]).*$/,
    NICK_REG2: /^[???-???a-zA-Z0-9_]*$/,
    NICK_REG3: /^[_]*$/,
  };
  const { ID_REG, PW_REG1, PW_REG2, NICK_REG1, NICK_REG2, NICK_REG3 } = CHECK_REG;
  const history = useHistory();
  const location = useLocation<ISJAuthState>();
  const [sjAuthState] = useState<ISJAuthState>(
    location.state ?? {
      studentId: '',
      userName: '',
      userMajor: '',
    }
  );
  const { studentId, userName, userMajor } = sjAuthState;
  const [isDuplicateId, setIsDuplicateId] = useState(true);
  const [isDuplicateNickname, setIsDuplicateNickname] = useState(true);
  const [eggGINKSS, setEggGINKSS] = useState(0);
  const [eggSCOF, setEggSCOF] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    location.state ? history.replace({ state: undefined }) : history.replace('/signUp');
  }, []);

  useEffect(() => {
    if (!isDuplicateId) setIsDuplicateId(true);
  }, [watch('userId')]);

  useEffect(() => {
    if (!isDuplicateNickname) setIsDuplicateNickname(true);
  }, [watch('userNickname')]);

  const checkDuplicateId = async () => {
    try {
      const {
        result: { in_db },
      }: ICheckDuplicate = await fetchDuplicateId(getValues('userId'));

      if (in_db) {
        setIsDuplicateId(true);
        setError('userId', { message: '?????? ???????????? ??????????????????' });
        return;
      }

      setIsDuplicateId(false);
    } catch (err) {
      setError('userId', { message: '?????? ??????????????? ????????? ?????? ??????????????????' });
    }
  };

  const checkDuplicateNickname = async () => {
    try {
      const {
        result: { in_db },
      }: ICheckDuplicate = await fetchDuplicateNickname(getValues('userNickname'));

      if (in_db) {
        setIsDuplicateNickname(true);
        setError('userNickname', { message: '?????? ???????????? ??????????????????' });
        return;
      }

      setIsDuplicateNickname(false);
    } catch (err) {
      setError('userNickname', { message: '?????? ??????????????? ????????? ?????? ??????????????????' });
    }
  };

  const onValid = async () => {
    try {
      setIsLoading(true);
      const userId = getValues('userId');
      const userPw = getValues('userPw');
      const userNickname = getValues('userNickname');
      const isSejongAuth = !!studentId && !!userName && !!userMajor;

      if (!isSejongAuth) {
        setIsDuplicateId(true);
        setError('userId', {
          message: '?????? ????????????????????? ?????? ????????? ????????? ????????? ????????????',
        });
        setIsLoading(false);
        return;
      }

      const { msg, description }: ISignUpResponse = await fetchSignUp({
        studentId,
        userId,
        userPw,
        userName,
        userMajor,
        userNickname,
        isSejongAuth,
      });

      if (description?.includes('Duplicate')) {
        setIsDuplicateId(true);
        setError('userId', { message: '???????????? ???????????? ?????????????????????.' });
        setIsLoading(false);
        return;
      }

      if (msg === 'success') {
        setIsLoading(false);
        setIsSignUp(true);
      }
    } catch (err) {
      setIsDuplicateId(true);
      setError('userId', { message: '?????? ???????????????. ????????? ?????? ??????????????????.' });
      setIsLoading(false);
    }
  };

  return (
    <SignUpBackground>
      <LoadingBG isLoading={isLoading} />
      <Spinner isLoading={isLoading} />
      <SignUpContainer>
        {isSignUp ? (
          <SignUpWrapper>
            <SignUpComplete>
              <SignUpCompleteDesc>
                ????????? ????????? ?????? ?????? ???????????? ??????????????????.
              </SignUpCompleteDesc>
              <SignUpCompleteDesc>
                ?????? ???????????? ?????? ????????? ????????? ????????????!
              </SignUpCompleteDesc>
              <SignUpCompleteBtn
                onClick={() => {
                  history.push('/login');
                }}
              >
                ????????? ????????????
              </SignUpCompleteBtn>
            </SignUpComplete>
          </SignUpWrapper>
        ) : (
          <>
            <SignUpWrapper>
              <SignUpTop>
                <SignUpTitle>????????????</SignUpTitle>
                <ProgressBar
                  completed={100}
                  customLabel=" "
                  height="5px"
                  bgColor="rgba(195, 0, 47)"
                  borderRadius="10px"
                />
              </SignUpTop>
              <SignUpForm onSubmit={handleSubmit(onValid)}>
                <SignUpInputWrapper>
                  <SignUpInputName>??????</SignUpInputName>
                  <SignUpInput type="text" value={studentId} disabled />
                </SignUpInputWrapper>
                <SignUpInputWrapper>
                  <SignUpInputName>??????</SignUpInputName>
                  <SignUpInput type="text" value={userName} disabled />
                </SignUpInputWrapper>
                <SignUpInputWrapper>
                  <SignUpInputName>??????</SignUpInputName>
                  <SignUpInput type="text" value={userMajor} disabled />
                </SignUpInputWrapper>
                <SignUpInputWrapper>
                  <SignUpInputName>?????????</SignUpInputName>
                  <SignUpInput
                    {...register('userId', {
                      required: '???????????? ???????????????',
                      pattern: { value: ID_REG, message: '????????? ????????? ?????? ????????????' },
                      minLength: {
                        value: 5,
                        message: '????????? ????????? 5??? ??????????????? ?????????',
                      },
                      maxLength: {
                        value: 20,
                        message: '????????? ????????? 20??? ???????????? ?????????',
                      },
                    })}
                    type="text"
                    placeholder="5~20??? ??????, ??????, _??? ?????? ??????"
                    isValid={!errors.userId}
                    isDuplicate={isDuplicateId}
                    isEmpty={!getValues('userId')}
                  />
                  <DuplicateBtn
                    type="button"
                    onClick={checkDuplicateId}
                    disabled={
                      !!errors.userId ||
                      !isDuplicateId ||
                      (!errors.userId && !getValues('userId'))
                    }
                    isActive={!errors.userId && !!getValues('userId')}
                  >
                    ????????? ????????????
                  </DuplicateBtn>
                </SignUpInputWrapper>
                <SignUpErrorMsg isDuplicate={isDuplicateId}>
                  {errors?.userId?.message ||
                    (isDuplicateId ? null : '?????? ????????? ??????????????????')}
                </SignUpErrorMsg>
                <SignUpInputWrapper>
                  <SignUpInputName>????????????</SignUpInputName>
                  <SignUpInput
                    {...register('userPw', {
                      required: '??????????????? ???????????????',
                      validate: {
                        pattern: (value) =>
                          PW_REG1.test(value) ||
                          '??????, ??????, ??????????????? ????????? ??????????????? ?????????',
                        pattern2: (value) =>
                          PW_REG2.test(value) ||
                          '????????? ??? ?????? ??????????????? ???????????? ????????????',
                      },
                      minLength: {
                        value: 8,
                        message: '???????????? ????????? 8??? ??????????????? ?????????',
                      },
                      maxLength: {
                        value: 16,
                        message: '???????????? ????????? 16??? ???????????? ?????????',
                      },
                    })}
                    type="password"
                    placeholder="8~16??? ??????,??????,???????????? ????????? ??????"
                    onInput={({ currentTarget: { value } }) => {
                      if (
                        !value ||
                        !getValues('userPw2') ||
                        value === getValues('userPw2')
                      ) {
                        clearErrors('userPw2');
                        return;
                      }
                      setError('userPw2', { message: '??????????????? ???????????? ????????????' });
                    }}
                    isValid={!errors.userPw}
                    isDuplicate={false}
                    isEmpty={!getValues('userPw')}
                  />
                </SignUpInputWrapper>
                <SignUpErrorMsg>{errors?.userPw?.message}</SignUpErrorMsg>
                <SignUpInputWrapper>
                  <SignUpInputName>???????????? ??????</SignUpInputName>
                  <SignUpInput
                    {...register('userPw2', {
                      required: '??????????????? ?????? ???????????????',
                      validate: (userPw2) => {
                        if (!getValues('userPw')) return;
                        return (
                          getValues('userPw') === userPw2 ||
                          '??????????????? ???????????? ????????????'
                        );
                      },
                    })}
                    type="password"
                    placeholder="???????????? ?????? ??????????????????"
                    isValid={!errors.userPw2}
                    isDuplicate={!getValues('userPw')}
                    isEmpty={!getValues('userPw2')}
                  />
                </SignUpInputWrapper>
                <SignUpErrorMsg>{errors?.userPw2?.message}</SignUpErrorMsg>
                <SignUpInputWrapper>
                  <SignUpInputName>?????????</SignUpInputName>
                  <SignUpInput
                    {...register('userNickname', {
                      required: '???????????? ???????????????',
                      validate: {
                        pattern1: (value) =>
                          !NICK_REG3.test(value) ||
                          '_??? ???????????? ???????????? ?????? ??? ????????????',
                        pattern2: (value) =>
                          (NICK_REG1.test(value) && NICK_REG2.test(value)) ||
                          '????????? ????????? ?????? ????????????',
                      },
                      minLength: {
                        value: 3,
                        message: '????????? ????????? 3??? ??????????????? ?????????',
                      },
                      maxLength: {
                        value: 16,
                        message: '????????? ????????? 16??? ???????????? ?????????',
                      },
                    })}
                    type="text"
                    placeholder="3~16??? ??????, ??????, ??????, _??? ?????? ??????"
                    isValid={!errors.userNickname}
                    isDuplicate={isDuplicateNickname}
                    isEmpty={!getValues('userNickname')}
                  />
                  <DuplicateBtn
                    type="button"
                    onClick={checkDuplicateNickname}
                    disabled={
                      !!errors.userNickname ||
                      !isDuplicateNickname ||
                      (!errors.userNickname && !getValues('userNickname'))
                    }
                    isActive={!errors.userNickname && !!getValues('userNickname')}
                  >
                    ????????? ????????????
                  </DuplicateBtn>
                </SignUpInputWrapper>
                <SignUpErrorMsg isDuplicate={isDuplicateNickname}>
                  {errors?.userNickname?.message ||
                    (isDuplicateNickname ? null : '?????? ????????? ??????????????????')}
                </SignUpErrorMsg>
                <SignUpBtn
                  isActive={
                    !isDuplicateId &&
                    !!watch('userPw') &&
                    !!watch('userPw2') &&
                    !isDuplicateNickname &&
                    Object.keys(errors).length === 0
                  }
                  disabled={
                    isDuplicateId ||
                    !watch('userPw') ||
                    !watch('userPw2') ||
                    isDuplicateNickname ||
                    !(Object.keys(errors).length === 0)
                  }
                >
                  ??????
                </SignUpBtn>
              </SignUpForm>
            </SignUpWrapper>
            <SignUpBackPoint>
              <span onClick={() => setEggSCOF((prev) => prev + 1)}>S</span>
              <span onClick={() => setEggGINKSS((prev) => prev + 1)}>G</span>R
            </SignUpBackPoint>
            <SignUpBackPoint>???</SignUpBackPoint>
            <SignUpBackPoint egg={eggGINKSS >= 2}>GINK-SS</SignUpBackPoint>
            <SignUpBackPoint egg={eggSCOF >= 2}>SCOF</SignUpBackPoint>
            <SignUpBackPoint>???</SignUpBackPoint>
            <SignUpBackPoint>SEJONG COMMUNITY</SignUpBackPoint>
            <SignUpBackPoint>???</SignUpBackPoint>
          </>
        )}
      </SignUpContainer>
    </SignUpBackground>
  );
}

export default SignUp;
