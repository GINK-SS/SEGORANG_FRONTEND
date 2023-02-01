import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const LoginInput = styled.input``;

interface ILoginForm {
  userId: string;
  userPw: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<ILoginForm>();

  const submitLoginInput = () => {
    console.log('서버 전송 후 일치 여부 확인! 없으면 에러 메세지 표시!');
    reset({ userId: '', userPw: '' });
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
