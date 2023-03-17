import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchLogin, getUserInfo } from '../api';
import { userInfoState } from '../atoms';

const RightContainer = styled.div``;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const LoginInput = styled.input``;

const LoginSelectWrapper = styled.div``;

const LoginSelect = styled.span<{ isActive: boolean }>`
  margin-right: 10px;
  font-weight: ${(props) => (props.isActive ? '700' : '400')};
  cursor: pointer;
`;

const ErrorMsg = styled.span`
  height: 30px;
  color: #e01919;
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

interface ILoginForm {
  userId: string;
  userPw: string;
}

interface ILoginResponse {
  msg: string;
  description?: string;
  result?: {
    access_token: string;
  };
}

interface IGetUserInfo {
  msg: string;
  result: {
    id: string;
    name: string;
    nickname: string;
    major: string;
  };
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    setError,
  } = useForm<ILoginForm>({ reValidateMode: 'onSubmit' });
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
  }, []);

  const submitLoginInput = async () => {
    try {
      const { msg, result }: ILoginResponse = await fetchLogin({
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
        }: IGetUserInfo = await getUserInfo(result?.access_token as string);

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
    <RightContainer>
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
        />
        <LoginSelectWrapper>
          <LoginSelect isActive={isSaveId} onClick={() => setIsSaveId((prev) => !prev)}>
            아이디 저장
          </LoginSelect>
          <LoginSelect
            isActive={isSaveLogin}
            onClick={() => setIsSaveLogin((prev) => !prev)}
          >
            자동 로그인
          </LoginSelect>
        </LoginSelectWrapper>
        <ErrorMsg>{errors.userId?.message || errors.userPw?.message}</ErrorMsg>
        <button disabled={!watch('userId') || !watch('userPw')}>로그인</button>
      </LoginForm>
      <SignUpWrapper>
        <span>세고랑이 처음이라면?</span>
        <span onClick={() => history.push('/signUp')}>회원가입</span>
      </SignUpWrapper>
    </RightContainer>
  );
}

export default Login;
