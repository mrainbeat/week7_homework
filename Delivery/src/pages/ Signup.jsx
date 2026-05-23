import React, { useState } from 'react';
import './Signup.css'; // CSS 파일 연결

export default function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // 비밀번호 불일치 체크 로직
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    console.log('회원가입 시도:', { id, password });
    // 추후 회원가입 API 연동부
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
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
