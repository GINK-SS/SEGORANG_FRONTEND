import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const SignUpInput = styled.input``;

interface IInputData {
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

function SJAuth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<IInputData>();

  const submitSJAuthInput = () => {
    console.log('세고랑 DB 안에 있는지 확인 후 세종대학교 구성원인지 확인!');
    reset({ studentId: '', studentPw: '' });
  };

  return (
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
      <span>{errors?.studentId?.message || errors?.studentPw?.message}</span>
      <button disabled={!watch('studentId') || !watch('studentPw')}>인증하기</button>
    </SignUpForm>
  );
}

export default SJAuth;
