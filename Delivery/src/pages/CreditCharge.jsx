import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; // 💡 공통 axios 인스턴스 경로

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
      // 💡 1. 로그인 시도 전에 브라우저에 남아있던 이전 계정의 찌꺼기 싹 청소하기 (철벽 방어)
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('memberId');

      // 🌟 2. 백엔드 서버로 로그인 요청 쏘기
      const response = await api.post('/api/auth/login', {
        email: id, // 회원가입 명세에 맞춰 email로 전송
        password: password,
      });

      console.log('로그인 성공 응답 데이터 전체:', response.data);

      // 🌟 3. 백엔드가 준 진짜 출입증(토큰) 꺼내기
      const token =
        response.data.accessToken || response.data.data?.accessToken;

      // 🌟 4. 백엔드가 준 회원 고유 ID(memberId) 유연하게 매핑해서 꺼내기
      const dataContainer = response.data?.data || response.data;
      const serverMemberId =
        dataContainer?.memberId ?? dataContainer?.id ?? dataContainer?.userId;

      if (token) {
        // api.js가 꺼내 쓸 수 있도록 토큰 저장
        localStorage.setItem('accessToken', token);
        localStorage.setItem('isLoggedIn', 'true');

        // 🌟 5. 추출한 회원 ID를 로컬스토리지에 확실히 저장 (크레딧 화면에서 이 ID별로 서랍을 쪼갬)
        if (serverMemberId) {
          localStorage.setItem('memberId', String(serverMemberId));
          console.log(
            '✅ 로컬스토리지에 memberId 격리 저장 완료:',
            serverMemberId
          );
        } else {
          console.warn(
            '⚠️ 로그인 성공 응답에 회원 고유 ID(memberId/id) 필드가 보이지 않습니다.'
          );
          // 예비책으로 우선 '1' 대신 유니크하게 인식될 수 있는 임시 구분값 부여 가능
          localStorage.setItem('memberId', '1');
        }

        alert('로그인 성공');
        window.location.href = '/Menu';
      } else {
        alert('로그인에 실패했습니다. 토큰을 전달받지 못했습니다.');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert(
        error.response?.data?.message ||
          '아이디 또는 비밀번호가 올바르지 않습니다.'
      );
      setPassword(''); // 틀렸을 때 비밀번호 칸만 깔끔하게 비워주기
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f9f9f9] px-4">
      {/* 메인 박스 */}
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
