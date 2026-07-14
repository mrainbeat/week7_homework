import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; //axios 추가

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 빈칸 방지
    if (!id || !password) {
      alert('아이디(이메일)와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      // 🌟 3. 진짜 백엔드 서버로 로그인 요청 쏘기
      const response = await api.post('/api/auth/login', {
        email: id, // 회원가입 때처럼 email로 맞춰서 전송
        password: password,
      });

      console.log('로그인 성공:', response.data);

      // 🌟 4. 백엔드가 준 진짜 출입증(토큰) 저장하기!
      // (백엔드 명세에 따라 토큰이 response.data.data.accessToken 등에 있을 수 있습니다.
      // 보통 아래와 같은 경로로 들어오므로 가장 흔한 패턴으로 작성해 두었습니다.)
      const token =
        response.data.accessToken || response.data.data?.accessToken;

      if (token) {
        // api.js가 알아서 꺼내 쓸 수 있도록 로컬 스토리지에 'accessToken'이라는 이름으로 저장
        localStorage.setItem('accessToken', token);
      }

      alert('로그인 성공');
      navigate('/Menu');
    } catch (error) {
      console.error('로그인 실패:', error);
      // 백엔드가 틀렸다고 알려주면 에러 메시지 띄우기
      alert(
        error.response?.data?.message ||
          '아이디 또는 비밀번호가 올바르지 않습니다.'
      );
      setPassword(''); // 틀렸을 때 비밀번호 칸만 깔끔하게 비워주기
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f9f9f9] px-4">
      {/* 회원가입 페이지와 동일한 규격의 메인 박스 */}
      <div className="relative w-full max-w-[625px] h-auto min-h-[845px] bg-white border-2 border-white rounded-[16px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] px-[20px] py-[40px] flex flex-col items-center">
        {/* 타이틀 로고 영역 */}
        <h1 className="text-[#f0485f] text-[36px] font-bold mt-[40px] mb-[64px] text-center">
          로그인하기
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
              onChange={(e) => setId(e.target.value)}
              required
              className="w-full h-[63px] px-[16px] border border-[#e0e0e0] rounded-[4px] text-[20px] outline-none box-border focus:border-[#0099ff] transition-colors"
            />
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
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full h-[63px] px-[16px] border border-[#e0e0e0] rounded-[4px] text-[20px] outline-none box-border focus:border-[#0099ff] transition-colors"
            />
          </div>

          {/* 회원가입 링크 영역 */}
          <div className="flex items-center gap-[12px] mt-[16px] text-[16px] text-[#555555]">
            <span>계정이 없나요?</span>
            <span
              onClick={() => navigate('/signup')}
              className="text-red-primary font-bold cursor-pointer hover:underline transition-all"
            >
              회원가입 하기
            </span>
          </div>

          {/* 로그인 버튼 */}
          <button
            type="submit"
            className="w-[244px] h-[54px] bg-[#f0f0f0] text-[#555555] border-none rounded-[20px] text-[20px] font-bold cursor-pointer mx-auto mt-[64px] transition-all duration-200 ease-in-out hover:bg-red-primary hover:text-white"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
