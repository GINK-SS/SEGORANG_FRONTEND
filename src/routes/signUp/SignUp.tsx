import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
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

interface ISJAuthState {
  studentId: string;
  userName: string;
  userMajor: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<IInputData>({ mode: 'onChange' });
  const CHECK_REG = {
    ID_REG: /^[a-zA-Z0-9_]*$/,
    PW_REG1: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~!@#$%^&()\-_+=]).*$/,
    PW_REG2: /^[a-zA-Z0-9`~!@#$%^&()\-_+=\s]*$/,
    NICK_REG1: /^(?=.*[가-힣a-zA-Z0-9]).*$/,
    NICK_REG2: /^[가-힣a-zA-Z0-9_]*$/,
    NICK_REG3: /^[_]*$/,
  };
  const { ID_REG, PW_REG1, PW_REG2, NICK_REG1, NICK_REG2, NICK_REG3 } = CHECK_REG;
  const location = useLocation<ISJAuthState>();
  const [sjAuthState] = useState<ISJAuthState>(
    location.state ?? {
      studentId: '',
      userName: '',
      userMajor: '',
    }
  );
  const { studentId, userName, userMajor } = sjAuthState;

  const onValid = (inputData: IInputData) => {};

  return (
    <SignUpForm onSubmit={handleSubmit(onValid)}>
      <SignUpInput {...register('studentId')} type="text" value={studentId} disabled />
      <SignUpInput {...register('userName')} type="text" value={userName} disabled />
      <SignUpInput {...register('userMajor')} type="text" value={userMajor} disabled />
      <SignUpInput
        {...register('userId', {
          required: '아이디를 입력하세요',
          pattern: { value: ID_REG, message: '아이디 형식에 맞지 않습니다' },
          minLength: {
            value: 5,
            message: '아이디 길이는 5자 이상이여야 합니다',
          },
          maxLength: {
            value: 20,
            message: '아이디 길이는 20자 이하여야 합니다',
          },
        })}
        type="text"
        placeholder="아이디 5~20 영문 숫자 _만 사용 가능"
      />
      <SignUpInput
        {...register('userPw', {
          required: '비밀번호를 입력하세요',
          validate: {
            pattern: (value) =>
              PW_REG1.test(value) || '영문, 숫자, 특수문자가 반드시 포함되어야 합니다',
            pattern2: (value) =>
              PW_REG2.test(value) || '사용할 수 없는 특수문자가 포함되어 있습니다',
          },
          minLength: {
            value: 8,
            message: '비밀번호 길이는 8자 이상이여야 합니다',
          },
          maxLength: {
            value: 16,
            message: '비밀번호 길이가 16자 이하여야 합니다',
          },
        })}
        type="password"
        placeholder="비밀번호 8~16 영문+숫자+특수기호 반드시 포함"
      />
      <SignUpInput
        {...register('userPw2', {
          required: '비밀번호를 다시 입력하세요',
          validate: (userPw2) => {
            if (!getValues('userPw')) return;
            return getValues('userPw') === userPw2 || '비밀번호가 일치하지 않습니다';
          },
        })}
        type="password"
        placeholder="비밀번호 확인"
      />
      <SignUpInput
        {...register('userNickname', {
          required: '닉네임을 입력하세요',
          validate: {
            pattern1: (value) =>
              !NICK_REG3.test(value) || '_만 이용해서 닉네임을 만들 수 없습니다',
            pattern2: (value) =>
              (NICK_REG1.test(value) && NICK_REG2.test(value)) ||
              '닉네임 형식에 맞지 않습니다',
          },
          minLength: {
            value: 3,
            message: '닉네임 길이는 3자 이상이여야 합니다',
          },
          maxLength: {
            value: 16,
            message: '닉네임 길이는 16자 이하여야 합니다',
          },
        })}
        type="text"
        placeholder="닉네임 3~16 영문, 숫자, _ 사용 가능"
      />
      <button
        disabled={
          !watch('userId') ||
          !watch('userPw') ||
          !watch('userPw2') ||
          !watch('userNickname') ||
          !(Object.keys(errors).length === 0) ||
          watch('userPw') !== watch('userPw2')
        }
      >
        완료
      </button>
      <span>{errors?.userId?.message}</span>
      <span>{errors?.userPw?.message}</span>
      <span>
        {errors?.userPw2?.message ||
          (!watch('userPw') || !watch('userPw2')
            ? null
            : watch('userPw') === watch('userPw2') || '비밀번호가 일치하지 않습니다')}
      </span>
      <span>{errors?.userNickname?.message}</span>
    </SignUpForm>
  );
}

export default SignUp;
