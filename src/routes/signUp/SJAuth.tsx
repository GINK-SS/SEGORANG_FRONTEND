import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { fetchSJAuth } from '../../api';

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const SignUpInput = styled.input``;

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
  } = useForm<ISJAuthFormData>();
  const history = useHistory();

  const submitSJAuthInput = async () => {
    const studentId = getValues('studentId');
    const studentPw = getValues('studentPw');
    const SJAuthResponse: ISJAuthResponse = await (
      await fetchSJAuth({ studentId, studentPw })
    ).json();

    if (SJAuthResponse.msg !== 'success') {
      setError('studentId', { message: '학번이나 비밀번호를 잘못 입력하였습니다.' });
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
