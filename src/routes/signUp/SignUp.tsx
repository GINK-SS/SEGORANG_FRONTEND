import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const SignUpInput = styled.input``;

interface IInputData {
  studentId: string;
  userName: string;
  userMajor: string;
  userId: string;
  userPw: string;
  userPw2: string;
  userNickname: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<IInputData>();

  const onValid = (inputData: IInputData) => {
  };

  return (
    <SignUpForm onSubmit={handleSubmit(onValid)}>
      <SignUpInput {...register('studentId')} type="text" value={'학번'} disabled />
      <SignUpInput {...register('userName')} type="text" value={'이름'} disabled />
      <SignUpInput {...register('userMajor')} type="text" value={'전공'} disabled />
      <SignUpInput
        {...register('userId', {
          required: '아이디를 입력하세요',
        })}
        type="text"
        placeholder="아이디"
      />
      <SignUpInput
        {...register('userPw', {
          required: '비밀번호를 입력하세요',
        })}
        type="password"
        placeholder="비밀번호"
      />
      <SignUpInput
        {...register('userPw2', { required: '비밀번호 확인을 입력하세요' })}
        type="password"
        placeholder="비밀번호 확인"
      />
      <SignUpInput
        {...register('userNickname', {
          required: '닉네임을 입력하세요',
        })}
        type="text"
        placeholder="닉네임"
      />
      <button
        disabled={
          !watch('userId') ||
          !watch('userPw') ||
          !watch('userPw2') ||
          !watch('userNickname')
        }
      >
        완료
      </button>
      <span>{errors?.userId?.message}</span>
      <span>{errors?.userPw?.message}</span>
      <span>{errors?.userPw2?.message}</span>
      <span>{errors?.userNickname?.message}</span>
    </SignUpForm>
  );
}

export default SignUp;
