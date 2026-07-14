import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 추가
import api from '../api/axios'; //axios 추가

export default function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //조건 체크 후 오류 점검
  const [idError, setIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  //페이지 이동
  const navigate = useNavigate();

  //아이디 입력창에 타이핑 시 실행되는 함수
  const handleIdChange = (e) => {
    const currentId = e.target.value;
    setId(currentId);

    if (!currentId) {
      setIdError('아이디를 입력해주세요');
    } else setIdError('');
  };

  //비밀번호 입력창에 타이핑 시 실행되는 함수
  const handlePasswordChange = (e) => {
    const currentPassword = e.target.value;
    //타이핑 한 비밀번호가 바뀔때마다 상태 업데이트
    setPassword(currentPassword);

    //정규식(최소 8자리에서 최대 16자리까지의 숫자, 영문, 특수문자, 각 1개 이상 포함되는조건
    //?=. : 조건확인(?= : 전방탐색)
    //특수문자는 이모지 등은 허용하지 않도록 따로따로 적는게 좋음
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;

    if (!passwordRegex.test(currentPassword) && currentPassword.length > 0) {
      setPasswordError('영문, 숫자, 특수문자 포함 8~16자리로 입력해주세요.');
    } else {
      setPasswordError('');
    }

    if (confirmPassword.length > 0 && currentPassword !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  //확인 비밀번호 입력창에 타이핑 시 실행되는 함수
  const handleConfirmPasswordChange = (e) => {
    const currentConfirmPassword = e.target.value;
    setConfirmPassword(currentConfirmPassword);

    if (
      currentConfirmPassword.length > 0 &&
      currentConfirmPassword !== password
    ) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError('');
    }
  };

  //회원가입하기 버튼을 눌렀을 때 실행되는 함수
  const handleSubmit = async (e) => {
    //폼 내부의 버튼을 눌렀을 때 브라우저 새로고침 현상 방지(기본으로 넣어야됨!!)
    e.preventDefault();

    if (!id) {
      alert('아이디를 입력해주세요');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요');
      return;
    }
    //에러메시지 무시하고 제출버튼 눌렀을 때 강제 차단
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
    if (!passwordRegex.test(password)) {
      alert('비밀번호 조건을 충족해주세요.');
      return; //함수 강제 종료하여 서버로 요청이 가는것을 막아줌
    }

    //확인용 비밀번호와 비교하여 다른경우 강제 차단
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const resposne = await api.post('api/auth/signup', {
        //변수명 달라질 수 있음
        email: id,
        password: password,
        name: '윤서영',
      });

      console.log('회원가입 성공 :', resposne.data);
      // 3. 회원가입 성공 시 알림을 띄우고 로그인 페이지로 이동
      alert('회원가입이 완료되었습니다!');
      navigate('/Login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      // 백엔드에서 보내준 에러 메시지가 있다면 띄워주고, 없으면 기본 메시지
      alert(
        error.response?.data?.message ||
          '회원가입에 실패했습니다. 다시 시도해주세요.'
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f9f9f9] px-4">
      {/* 회원가입 메인 박스 */}
      <div className="relative w-full max-w-[625px] h-auto min-h-[845px] bg-white border-2 border-white rounded-[16px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] px-[20px] py-[40px] flex flex-col items-center">
        {/* 왼쪽 위 뒤로가기 아이콘 버튼 (group 클래스로 hover 통제) */}
        <button
          className="absolute top-[40px] left-[40px] max-sm:top-[24px] max-sm:left-[20px] bg-transparent border-none cursor-pointer p-[8px] flex items-center justify-center transition-transform duration-200 ease-in-out hover:-translate-x-[3px] group"
          onClick={() => navigate('/Login')}
          aria-label="뒤로가기"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="#333333"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-colors duration-200 ease-in-out group-hover:stroke-[#0099ff]"
            />
          </svg>
        </button>

        {/* 타이틀 로고 영역 */}
        <h1 className="text-red-primary text-[36px] font-bold mt-[40px] mb-[64px] text-center">
          회원가입
        </h1>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="w-full flex flex-col items-center gap-[24px]"
        >
          {/* 아이디 입력 영역 */}
          <div className="flex flex-col w-full max-w-[553px]">
            <label
              htmlFor="id-input"
              className="text-[20px] font-bold text-[#333333] mb-[8px] text-left"
            >
              아이디
            </label>
            <input
              id="id-input"
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
              required
              onChange={handleIdChange}
              className="w-full h-[63px] px-[16px] border border-[#e0e0e0] rounded-[4px] text-[20px] outline-none box-border focus:border-gray-4 transition-colors"
            />
            {idError && (
              <span className="text-red-primary text-[12px] mt-[4px] block">
                {idError}
              </span>
            )}
          </div>

          {/* 비밀번호 입력 영역 */}
          <div className="flex flex-col w-full max-w-[553px]">
            <label
              htmlFor="password-input"
              className="text-[20px] font-bold text-[#333333] mb-[8px] text-left"
            >
              비밀번호
            </label>
            <input
              id="password-input"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={handlePasswordChange}
              required
              className="w-full h-[63px] px-[16px] border border-[#e0e0e0] rounded-[4px] text-[20px] outline-none box-border focus:border-gray-4 transition-colors"
            />
            {passwordError && (
              <span className="text-gray-2 text-[12px] mt-[4px] block">
                {passwordError}
              </span>
            )}
          </div>

          {/* 확인 비밀번호 입력 영역 */}
          <div className="flex flex-col w-full max-w-[553px]">
            <label
              htmlFor="confirm-password-input"
              className="text-[20px] font-bold text-[#333333] mb-[8px] text-left"
            >
              비밀번호 확인
            </label>
            <input
              id="confirm-password-input"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className="w-full h-[63px] px-[16px] border border-[#e0e0e0] rounded-[4px] text-[20px] outline-none box-border focus:border-gray-4 transition-colors"
            />
            {confirmPasswordError && (
              <span className="text-gray-2 text-[12px] mt-[4px] block">
                {confirmPasswordError}
              </span>
            )}
          </div>

          {/* 하단 회원가입하기 버튼 */}
          <button
            type="submit"
            className="w-[244px] h-[54px] bg-[#f0f0f0] text-[#555555] border-none rounded-[20px] text-[20px] font-bold cursor-pointer mx-auto mt-[40px] transition-all duration-200 ease-in-out hover:bg-red-primary hover:text-white"
          >
            회원가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
