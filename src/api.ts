interface ISJAuthFormData {
  studentId: string;
  studentPw: string;
}

interface ISignUpFormData {
  studentId: string;
  userId: string;
  userPw: string;
  userName: string;
  userMajor: string;
  userNickname: string;
  isSejongAuth: boolean;
}

interface ILoginFormData {
  userId: string;
  userPw: string;
}

const BASE_URL = `http://scof.link`;

export const fetchSJAuth = ({ studentId, studentPw }: ISJAuthFormData) => {
  return fetch(`${BASE_URL}/api/auth/sejong`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sj_id: studentId,
      sj_pw: studentPw,
    }),
  });
};

export const fetchSignUp = ({
  studentId,
  userId,
  userPw,
  userName,
  userMajor,
  userNickname,
  isSejongAuth,
}: ISignUpFormData) => {
  return fetch(`${BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sj_id: studentId,
      id: userId,
      pw: userPw,
      name: userName,
      major: userMajor,
      nickname: userNickname,
      sejong_auth: isSejongAuth,
    }),
  }).then((res) => res.json());
};

export const fetchDuplicateId = (userId: string) => {
  return fetch(`${BASE_URL}/api/auth/id`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: userId,
    }),
  }).then((res) => res.json());
};

export const fetchDuplicateNickname = (userNickname: string) => {
  return fetch(`${BASE_URL}/api/auth/nickname`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nickname: userNickname,
    }),
  }).then((res) => res.json());
};

export const fetchLogin = async ({ userId, userPw }: ILoginFormData) => {
  const response = await fetch(`${BASE_URL}/api/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: userId,
      pw: userPw,
    }),
  });

  return await response.json();
};

export const getUserInfo = async (accessToken: string) => {
  const response = await fetch(`${BASE_URL}/api/v1/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return await response.json();
};
