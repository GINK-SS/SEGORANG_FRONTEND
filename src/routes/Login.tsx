import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { fetchLogin, getUserInfo } from '../api';
import { userInfoState } from '../atoms';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const LoginInput = styled.input``;

interface ILoginForm {
  userId: string;
  userPw: string;
}

interface ILoginResponse {
  msg: string;
  result: {
    access_token: string;
  };
}

interface IGetUserInfo {
  name: string;
  nickname: string;
  major: string;
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
  } = useForm<ILoginForm>();
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
      const {
        msg,
        result: { access_token },
      }: ILoginResponse = await fetchLogin({
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
          localStorage.setItem('sgrUserToken', access_token);
        }

        const { name, nickname, major }: IGetUserInfo = await getUserInfo(access_token);

        setUserInfo((prev) => {
          return {
            ...prev,
            accessToken: access_token,
            userName: name,
            userNickname: nickname,
            userMajor: major,
          };
        });

        history.replace('/');
        return;
      }
    } catch (err) {
      setError('userId', { message: '서버 오류입니다. 나중에 다시 시도해주세요.' });
    }
  };

  return (
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
      <div>
        <span onClick={() => setIsSaveId((prev) => !prev)}>아이디 저장</span>
        <span onClick={() => setIsSaveLogin((prev) => !prev)}>자동 로그인</span>
      </div>
      <span>{errors?.userId?.message || errors?.userPw?.message}</span>
      <button disabled={!watch('userId') || !watch('userPw')}>로그인</button>
    </LoginForm>
  );
}

export default Login;
