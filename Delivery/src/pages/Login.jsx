import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // CSS 파일 연결

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (id === 'test' && password === '1234') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/Menu');
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      setPassword('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* 타이틀 로고 영역 */}
        <h1 className="login-title">로그인하기</h1>

        <form onSubmit={handleSubmit} className="login-form">
          {/* 아이디 입력 영역 */}
          <div className="input-group">
            <label htmlFor="id-input">아이디</label>
            <input
              id="id-input"
              type="text"
              placeholder="아이디를 입력하세요"
              value={id}
              onChange={(e) => setId(e.target.value)}
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
            />
          </div>

          {/* 회원가입 링크 영역 */}
          <div className="signup-link-group">
            <span>계정이 없나요?</span>
            <a href="/signup" className="signup-link">
              회원가입 하기
            </a>
          </div>

          {/* 로그인 버튼 */}
          <button type="submit" className="login-btn">
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}
