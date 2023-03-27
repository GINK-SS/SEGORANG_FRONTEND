import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchUserInfo } from '../../api/common';
import { fetchLogin } from '../../api/login';
import { userInfoState } from '../../atoms';
import { LoginFormData } from '../../types/login';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    setError,
  } = useForm<LoginFormData>({ reValidateMode: 'onSubmit' });
  const [isSaveId, setIsSaveId] = useState(false);
  const [isSaveLogin, setIsSaveLogin] = useState(false);
  const setUserInfo = useSetRecoilState(userInfoState);
  const history = useHistory();

  useEffect(() => {
    const userId = localStorage.getItem('sgrUserId');
    if (userId) {
      setValue('userId', userId);
      setIsSaveId(true);
    }
  }, [setValue]);

  const submitLoginInput = async () => {
    try {
      const { msg, result } = await fetchLogin({
        userId: getValues('userId'),
        userPw: getValues('userPw'),
      });

      if (msg === 'success') {
        if (isSaveId) {
          localStorage.setItem('sgrUserId', getValues('userId'));
        } else {
          localStorage.removeItem('sgrUserId');
        }

        if (isSaveLogin) {
          localStorage.setItem('sgrUserToken', result?.access_token as string);
        }

        const {
          result: { id, name, nickname, major },
        } = await fetchUserInfo(result?.access_token as string);

        setUserInfo((prev) => {
          return {
            ...prev,
            accessToken: result?.access_token as string,
            userId: id,
            userName: name,
            userNickname: nickname,
            userMajor: major,
          };
        });

        history.replace('/');
      } else if (msg === 'fail') {
        setError('userId', { message: '아이디 혹은 비밀번호를 잘못 입력하였습니다.' });
      }
    } catch (err) {
      setError('userId', { message: '서버 오류입니다. 나중에 다시 시도해주세요.' });
    }
  };

  return (
    <Container>
      <LeftContainer></LeftContainer>
      <RightContainer>
        <RightTitle>SEGORANG</RightTitle>
        <LoginForm onSubmit={handleSubmit(submitLoginInput)}>
          <LoginInput
            {...register('userId', { required: '아이디를 입력하세요' })}
            type="text"
            placeholder="아이디"
          />
          <LoginInput
            {...register('userPw', { required: '비밀번호를 입력하세요' })}
            type="password"
            placeholder="비밀번호"
            isBlank={!getValues('userPw')}
          />
          <ErrorMsg>{errors.userId?.message || errors.userPw?.message}</ErrorMsg>
          <LoginButton
            isActive={!!watch('userId') && !!watch('userPw')}
            disabled={!watch('userId') || !watch('userPw')}
          >
            로그인
          </LoginButton>
        </LoginForm>
        <OptionWrapper>
          <SelectWrapper>
            <LoginSelect isActive={isSaveId} onClick={() => setIsSaveId((prev) => !prev)}>
              아이디 저장
            </LoginSelect>
            <LoginSelect
              isActive={isSaveLogin}
              onClick={() => setIsSaveLogin((prev) => !prev)}
            >
              자동 로그인
            </LoginSelect>
          </SelectWrapper>
          <FindIdPw>아이디/비밀번호 찾기</FindIdPw>
        </OptionWrapper>
        <SignUpWrapper>
          <span>세고랑이 처음이라면?</span>
          <span onClick={() => history.push('/signUp')}>회원가입</span>
        </SignUpWrapper>
      </RightContainer>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  flex-grow: 1;
  height: 100vh;
  background-color: gray;
  opacity: 20%;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 650px;
  height: 100vh;
  justify-content: center;
`;

const RightTitle = styled.span`
  font-family: 'Montserrat Alternates', sans-serif;
  text-align: center;
  font-size: 50px;
  margin-bottom: 100px;
  color: ${(props) => props.theme.accentColor};
  letter-spacing: 2px;
`;

const LoginForm = styled.form`
  display: flex;
  width: 60%;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
`;

const LoginInput = styled.input<{ isBlank?: boolean }>`
  width: calc(100% - 40px);
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 17px;
  padding: 3px 20px;
  background-color: rgba(0, 0, 0, 0.03);
  &:hover {
    border: 1px solid ${(props) => props.theme.sejongCrimsonRed02};
  }
  &:focus {
    outline: 0px;
    border: 1px solid ${(props) => props.theme.sejongCrimsonRed02};
  }
  &::placeholder {
    color: rgba(0, 0, 0, 0.25);
  }

  &:nth-child(2) {
    letter-spacing: ${(props) => (props.isBlank ? '0px' : '5px')};
  }
`;

const ErrorMsg = styled.span`
  height: 30px;
  margin-top: 5px;
  color: #e01919;
`;

const LoginButton = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 17px;
  padding: 3px 20px;
  color: ${(props) => (props.isActive ? '#FFF' : 'rgba(0,0,0,0.25)')};
  background-color: ${(props) =>
    props.isActive ? props.theme.sejongCrimsonRed : 'rgba(0,0,0,0.03)'};
  cursor: ${(props) => (props.isActive ? 'pointer' : 'default')};
  transition-property: color, background-color;
  transition-duration: 0.3s;
`;

const OptionWrapper = styled.div`
  display: flex;
  width: 60%;
  margin: 10px auto 100px;
  justify-content: space-between;
`;

const SelectWrapper = styled.div``;

const LoginSelect = styled.span<{ isActive: boolean }>`
  margin-right: 10px;
  opacity: ${(props) => (props.isActive ? '0.8' : '0.7')};
  color: ${(props) =>
    props.isActive ? props.theme.sejongCrimsonRed : props.theme.sejongGray};
  font-weight: ${(props) => (props.isActive ? '700' : '400')};
  cursor: pointer;
`;

const FindIdPw = styled.span`
  color: ${(props) => props.theme.sejongGray};
  opacity: 0.7;
  cursor: pointer;
`;

const SignUpWrapper = styled.div`
  text-align: center;
  span {
    &:first-child {
      color: ${(props) => props.theme.sejongGray};
      opacity: 70%;
      margin-right: 10px;
    }
    &:last-child {
      color: ${(props) => props.theme.sejongCrimsonRed};
      font-weight: 600;
      cursor: pointer;
    }
  }
`;
