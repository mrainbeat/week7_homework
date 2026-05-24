import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. useNavigate 추가
import './Signup.css';

export default function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); // 2. 네비게이트 함수 선언

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    console.log('회원가입 시도:', { id, password });

    // 3. 회원가입 성공 시 알림을 띄우고 로그인 페이지로 이동
    alert('회원가입이 완료되었습니다!');
    navigate('/Login');
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* 4. 왼쪽 위 뒤로가기 아이콘 버튼 추가 */}
        <button
          className="back-btn"
          onClick={() => navigate('/Login')}
          aria-label="뒤로가기"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="../assets/fa-solid_arrow-Left.svg"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="#333333"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 타이틀 로고 영역 */}
        <h1 className="signup-title">어쩌구저쩌구</h1>

        <form onSubmit={handleSubmit} className="signup-form">
          {/* 아이디 입력 영역 */}
          <div className="input-group">
            <label htmlFor="id-input">아이디</label>
            <input
              id="id-input"
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 입력 영역 */}
          <div className="input-group">
            <label htmlFor="password-input">비밀번호</label>
            <input
              id="password-input"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 확인 입력 영역 */}
          <div className="input-group">
            <label htmlFor="confirm-password-input">비밀번호 확인</label>
            <input
              id="confirm-password-input"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* 하단 회원가입하기 버튼 */}
          <button type="submit" className="signup-btn">
            회원가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
