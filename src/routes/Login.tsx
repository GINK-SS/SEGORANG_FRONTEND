import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { fetchLogin } from '../api';

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
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
    setError,
  } = useForm<ILoginForm>();

  const history = useHistory();
  const submitLoginInput = async () => {
    try {
      const { msg }: ILoginResponse = await fetchLogin({
        userId: getValues('userId'),
        userPw: getValues('userPw'),
      });

      if (msg === 'success') {
        history.push('/');

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
      <span>{errors?.userId?.message || errors?.userPw?.message}</span>
      <button disabled={!watch('userId') || !watch('userPw')}>로그인</button>
    </LoginForm>
  );
}

export default Login;
